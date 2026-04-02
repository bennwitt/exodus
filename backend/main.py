import asyncio
import io
import json
import uuid
import zipfile

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, StreamingResponse

from etl.extractor import extract_memories_and_skills
from etl.generator import generate_memory_entries, generate_report, generate_skill_docs
from etl.parser import parse_conversations

app = FastAPI(title="ChatGPT → Claude Migration API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory job store
jobs: dict = {}


@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    content = await file.read()
    data = json.loads(content)
    conversations = parse_conversations(data)
    job_id = str(uuid.uuid4())
    jobs[job_id] = {
        "status": "pending",
        "conversations": conversations,
        "results": None,
    }
    return {"job_id": job_id, "conversation_count": len(conversations)}


@app.get("/api/stream/{job_id}")
async def stream(job_id: str):
    async def event_generator():
        if job_id not in jobs:
            yield f"data: {json.dumps({'type': 'error', 'message': 'Job not found'})}\n\n"
            return

        job = jobs[job_id]
        conversations = job["conversations"]

        async for event in extract_memories_and_skills(conversations):
            if event["type"] == "complete":
                job["results"] = event["results"]
                job["status"] = "complete"
            yield f"data: {json.dumps(event)}\n\n"
            await asyncio.sleep(0)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.get("/api/download/{job_id}")
async def download(job_id: str):
    if job_id not in jobs or jobs[job_id]["status"] != "complete":
        return Response(status_code=404)

    results = jobs[job_id]["results"]
    conv_count = len(jobs[job_id]["conversations"])

    memories = generate_memory_entries(results)
    skills = generate_skill_docs(results.get("skills", []))
    report = generate_report(results, conv_count)

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("claude-migration/memory_entries.json", json.dumps(memories, indent=2))
        for name, content in skills.items():
            zf.writestr(f"claude-migration/skills/{name}.md", content)
        zf.writestr("claude-migration/migration_report.md", report)
        zf.writestr("claude-migration/raw_results.json", json.dumps(results, indent=2))

    zip_buffer.seek(0)
    return Response(
        content=zip_buffer.read(),
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=claude-migration.zip"},
    )


@app.get("/api/results/{job_id}")
async def get_results(job_id: str):
    if job_id not in jobs:
        return {"error": "Not found"}
    job = jobs[job_id]
    return {
        "status": job["status"],
        "results": job.get("results"),
        "conversation_count": len(job.get("conversations", [])),
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
