import asyncio
import json
from typing import AsyncGenerator

import anthropic

client = anthropic.AsyncAnthropic()

MODEL = "claude-sonnet-4-6"

EXTRACT_SYSTEM = """You analyze ChatGPT conversation history to extract structured user intelligence.
Extract ONLY what is explicitly present — never infer or hallucinate.

Return ONLY valid JSON (no markdown, no preamble) in this exact schema:
{
  "facts": [
    {"text": "User is a senior engineer at Acme Corp", "confidence": 0.95}
  ],
  "preferences": [
    {"text": "Prefers Python over JavaScript for backend work", "confidence": 0.85}
  ],
  "skills": [
    {
      "name": "Workflow or Domain Name",
      "description": "One sentence description of what they do",
      "examples": ["Specific thing they did 1", "Specific thing they did 2"]
    }
  ],
  "interests": ["topic1", "topic2"],
  "context": ["Ongoing project or goal description"]
}

Rules:
- facts: concrete, verifiable (name, role, company, tools, tech stack, location)
- preferences: how they like to work, style choices, tool preferences
- skills: recurring workflows / domains (be specific and concrete)
- interests: topics they explore
- context: active projects or stated goals
- confidence: 0.0–1.0, only include facts with > 0.5
- Be concise. No filler."""

DEDUP_SYSTEM = """You receive arrays of extracted user data from multiple conversation batches.
Deduplicate and merge them into a clean, unified set.
Return ONLY valid JSON with the same schema as input.
Remove exact duplicates. Merge similar items into one precise statement.
Keep the best/most specific version of duplicated facts."""


def _format_chunk(conversations: list[dict]) -> str:
    """Format a chunk of conversations for the extraction prompt."""
    text = ""
    for conv in conversations:
        text += f"\n### {conv['title']}\n"
        # Cap to first 30 messages, 400 chars each
        for msg in conv["messages"][:30]:
            role = "User" if msg["role"] == "user" else "Assistant"
            content = msg["content"][:400]
            text += f"{role}: {content}\n"
    return text[:12000]  # Hard cap on total chunk size


async def extract_memories_and_skills(
    conversations: list[dict],
) -> AsyncGenerator[dict, None]:
    total = len(conversations)
    yield {
        "type": "start",
        "total": total,
        "message": f"Loaded {total} conversations",
    }

    all_facts: list[str] = []
    all_preferences: list[str] = []
    all_skills: dict[str, dict] = {}
    all_interests: set[str] = set()
    all_context: list[str] = []

    # Process in chunks of 5 conversations
    chunk_size = 5
    chunks = [
        conversations[i : i + chunk_size]
        for i in range(0, len(conversations), chunk_size)
    ]

    for idx, chunk in enumerate(chunks):
        start_n = idx * chunk_size + 1
        end_n = min((idx + 1) * chunk_size, total)

        yield {
            "type": "progress",
            "chunk": idx + 1,
            "total_chunks": len(chunks),
            "message": f"Analyzing conversations {start_n}–{end_n} of {total}...",
            "percent": int((idx / len(chunks)) * 85),
        }

        conv_text = _format_chunk(chunk)

        try:
            response = await client.messages.create(
                model=MODEL,
                max_tokens=2048,
                system=EXTRACT_SYSTEM,
                messages=[
                    {
                        "role": "user",
                        "content": f"Extract user intelligence from these conversations:\n{conv_text}",
                    }
                ],
            )

            raw = response.content[0].text.strip()
            raw = raw.replace("```json", "").replace("```", "").strip()
            extracted = json.loads(raw)

            # Stream discovered items
            for f in extracted.get("facts", []):
                if f.get("confidence", 0) > 0.55:
                    all_facts.append(f["text"])
                    yield {
                        "type": "memory",
                        "category": "fact",
                        "text": f["text"],
                        "confidence": f.get("confidence", 0),
                    }

            for p in extracted.get("preferences", []):
                if p.get("confidence", 0) > 0.55:
                    all_preferences.append(p["text"])
                    yield {
                        "type": "memory",
                        "category": "preference",
                        "text": p["text"],
                        "confidence": p.get("confidence", 0),
                    }

            for s in extracted.get("skills", []):
                name = s.get("name", "")
                if name and name not in all_skills:
                    all_skills[name] = s
                    yield {
                        "type": "skill",
                        "name": name,
                        "description": s.get("description", ""),
                    }

            all_interests.update(extracted.get("interests", []))
            all_context.extend(extracted.get("context", []))

        except json.JSONDecodeError as e:
            yield {
                "type": "warning",
                "message": f"Chunk {idx + 1} JSON parse error — skipping",
            }
        except anthropic.APIError as e:
            yield {
                "type": "warning",
                "message": f"API error on chunk {idx + 1}: {str(e)[:100]}",
            }

        await asyncio.sleep(0.05)

    # Final dedup pass
    yield {
        "type": "progress",
        "message": "Running deduplication pass...",
        "percent": 88,
    }

    raw_results = {
        "facts": all_facts,
        "preferences": all_preferences,
        "skills": list(all_skills.values()),
        "interests": list(all_interests),
        "context": all_context,
    }

    try:
        dedup_response = await client.messages.create(
            model=MODEL,
            max_tokens=3000,
            system=DEDUP_SYSTEM,
            messages=[
                {
                    "role": "user",
                    "content": f"Deduplicate and merge this extracted data:\n{json.dumps(raw_results, indent=2)}",
                }
            ],
        )
        raw = dedup_response.content[0].text.strip()
        raw = raw.replace("```json", "").replace("```", "").strip()
        deduped = json.loads(raw)

        final_results = {
            "memories": deduped.get("facts", []) + deduped.get("preferences", []),
            "skills": deduped.get("skills", all_results_skills(all_skills)),
            "interests": deduped.get("interests", list(all_interests)),
            "context": deduped.get("context", all_context),
        }
    except Exception:
        # Fallback: use raw without dedup
        final_results = {
            "memories": list(set(all_facts + all_preferences)),
            "skills": list(all_skills.values()),
            "interests": list(all_interests),
            "context": list(set(all_context)),
        }

    yield {"type": "progress", "message": "Finalizing outputs...", "percent": 98}
    await asyncio.sleep(0.1)

    yield {"type": "complete", "results": final_results}


def all_results_skills(skill_dict: dict) -> list:
    return list(skill_dict.values())
