```
 ██████╗██╗  ██╗ █████╗ ████████╗ ██████╗ ██████╗ ████████╗     ████████╗ ██████╗      ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝██╔════╝ ██╔══██╗╚══██╔══╝     ╚══██╔══╝██╔═══██╗    ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ███████║███████║   ██║   ██║  ███╗██████╔╝   ██║            ██║   ██║   ██║    ██║     ██║     ███████║██║   ██║██║  ██║█████╗
██║     ██╔══██║██╔══██║   ██║   ██║   ██║██╔═══╝    ██║            ██║   ██║   ██║    ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝
╚██████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║        ██║            ██║   ╚██████╔╝    ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝        ╚═╝            ╚═╝    ╚═════╝      ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
```

<div align="center">

# 🌉 ChatGPT → Claude Migration Bridge

### *Your intelligence. Your history. Your move.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.12+](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)](https://python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20Sonnet-D4AC0D)](https://anthropic.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://docker.com)
[![uv](https://img.shields.io/badge/uv-locked-5A45FF?logo=uv&logoColor=white)](https://docs.astral.sh/uv/)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)

**A free, open-source ETL pipeline that reads your entire ChatGPT conversation history,
extracts your knowledge, preferences, and workflows using Claude AI,
and outputs it as ready-to-import Claude memory entries, skill documents, and a full migration report.**

[**→ Quick Start**](#-quick-start) · [**→ Why This Exists**](#-why-this-exists) · [**→ Architecture**](#-architecture) · [**→ Deploy**](#-deployment) · [**→ Contribute**](#-contributing)

</div>

---

## 🔥 Why This Exists

Let's be direct.

OpenAI — the company that literally named itself after the promise of open, democratized, beneficial AI — has spent the last several years executing one of the most dramatic corporate pivots in Silicon Valley history. What started as a nonprofit research lab with a stated mission to "ensure that artificial general intelligence benefits all of humanity" is today a $157 billion for-profit company that has:

- **Signed contracts with the U.S. Department of Defense** — reversing its own prior policy banning military weapons applications — to provide AI capabilities for defense and intelligence use cases, after spending years telling the public it was building AI "for humanity."
- **Dissolved its Superalignment team** — the very team tasked with solving the long-term safety problem of superintelligent AI — just months after loudly announcing it with fanfare, freeing up compute for product velocity instead.
- **Watched its own safety leadership walk out the door** — including co-founder Ilya Sutskever and safety team head Jan Leike, who wrote publicly upon resignation that "safety culture and processes have taken a back seat to product."
- **Converted from nonprofit to capped-profit to full for-profit** in a sequence of structural decisions that progressively transferred control away from the safety mission and toward investor returns — a journey that ended with a $40 billion fundraise at a valuation in the same tier as nation-state defense contractors.
- **Courted sovereign wealth funds and foreign strategic investors** whose interests have nothing to do with beneficial AI for humanity and everything to do with geopolitical positioning in the most consequential technology race of the century.

This is not speculation. This is the documented public record.

---

Meanwhile, in San Francisco, a group of researchers who saw exactly this trajectory forming — and left to do something about it — founded **Anthropic**.

Anthropic was built from day one on a different premise: that building the most powerful AI systems in history requires the most rigorous safety research in history. Not as a PR layer. Not as a regulatory compliance checkbox. But as the actual technical and cultural core of how you build the models and run the company.

Their contributions to the field:

- **Constitutional AI (CAI)** — a novel training methodology that gives AI systems a set of principles to reason about their own outputs, enabling alignment at scale with dramatically improved safety properties. [Published openly. Freely available.](https://arxiv.org/abs/2212.08073)
- **Responsible Scaling Policy (RSP)** — a self-imposed framework of commitments that triggers mandatory safety evaluations before deploying more powerful models. A company binding itself contractually to safety thresholds before profits. Radical.
- **Claude's Character** — Claude isn't a chatbot that's been guardrailed into compliance with filters and blocklists. It's a model trained from the ground up to have genuine values: intellectual curiosity, honesty, care for the people it works with, directness, and a deep resistance to deception. Not bolted-on safety. Foundational architecture.
- **Interpretability Research** — Anthropic publishes groundbreaking peer-reviewed work on understanding what is actually happening inside these models at the mechanistic level, because you cannot align what you cannot see. They're doing the hard science that nobody else wants to pay for, and they're giving it away for free.
- **Benefit Corporation Structure** — Anthropic is structured to legally prioritize its mission over pure shareholder return. The governance is built to resist the exact organizational pressures that rotated OpenAI away from its founding principles and toward being a weapon for the highest bidder.

Is Anthropic perfect? No. Are they a company with investors and revenue targets and competitive pressures? Yes. But the difference in *how they've chosen to navigate those pressures* is real, documented, and consequential.

---

> **OpenAI:** Move fast, capture market share, sort out safety later. Serve whoever can write the biggest check.
>
> **Anthropic:** Safety research *is* the product. The model that's most trustworthy is the model that earns the right to be most powerful. Trustworthiness is the moat.

**When you choose who to build with, you're casting a vote.** Your API spend, your enterprise contract, your developer mindshare — these are real signals that shape which companies get funded, which approaches get validated, and which values get scaled to billions of users.

This tool exists to make that vote zero-friction.

---

## ✨ What It Does

You've spent months — maybe years — building context with ChatGPT. In that conversation history lives an enormous amount of intelligence about *you*: your technical stack, your communication style, your active projects, your recurring workflows, your preferences, your domain expertise. That data was generated by you. It belongs to you.

This tool reclaims it and rebuilds it on Claude.

```
Your ChatGPT Export                          Your Claude Profile
───────────────────────         ETL          ────────────────────────────
conversations.json        ─────────────►     memory_entries.json
  1,000+ conversations      Claude AI          skills/*.md
  millions of tokens        extraction         migration_report.md
  years of context          pipeline           raw_results.json
```

**The pipeline extracts:**

| Category | What It Finds | Output Target |
|---|---|---|
| **Facts** | Name, role, company, tech stack, tools used, languages | Claude memory entries |
| **Preferences** | Communication style, code style, formatting preferences | Claude memory entries |
| **Skills** | Recurring workflows, technical domains, specialized knowledge | Skill `.md` files |
| **Interests** | Topics you explore, domains you care about | Memory context |
| **Active Context** | Ongoing projects, stated goals, open problems | Memory entries |

**The outputs are immediately usable:**

- `memory_entries.json` → Import directly into Claude's memory system
- `skills/*.md` → Drop into your Claude skills directory — picked up automatically
- `migration_report.md` → Human-readable summary for review before import
- `raw_results.json` → Full unfiltered extraction for custom processing

---

## ⚡ Before vs. After

This is what the migration actually changes. Day one on Claude without this tool versus day one with it.

### Without migration — Claude starts cold

```
You:    "Help me refactor this Python service."
Claude: "Sure! Could you tell me a bit about the project —
         what framework are you using, what does the service do,
         and what style conventions should I follow?"

You:    "It's FastAPI, async, we use Pydantic v2, Black formatter,
         no type: ignore comments, structured logging with structlog..."

Claude: "Got it. And what's your deployment target?"

You:    "Azure Container Apps, we use Bicep for IaC..."

Claude: "Great. And your team's testing philosophy?"

You:    *sigh* "pytest, 80% coverage minimum, factories not fixtures..."
```

**Three exchanges before Claude can even start helping.** Multiply this by every new conversation, every new task, every new team member onboarding. The context tax is real and it compounds.

---

### With migration — Claude starts knowing you

```
You:    "Help me refactor this Python service."
Claude: "On it. I'll keep it async FastAPI with Pydantic v2 models,
         Black-formatted, structlog for logging, and pytest-ready.
         Targeting Azure Container Apps so I'll make sure the health
         check endpoint stays clean. Paste the service and let's go."
```

**Zero ramp-up.** Claude already knows your stack, your style, your deployment target, your testing philosophy, your preferences. It hits the ground running on the first message of the first conversation.

That's the migration. Not a novelty — a real, compounding productivity gain for every conversation you have going forward.

---

## 🔀 What Migrates vs. What Doesn't

This is not a full conversation port. It's smarter than that — and it's worth being clear about why.

Raw conversation history is mostly noise: the back-and-forth, the wrong turns, the "can you try that again," the half-finished thoughts. What actually matters is the *durable signal* that lives inside those conversations — the facts about you, the patterns in how you work, the preferences you've expressed, the skills you've demonstrated repeatedly.

That's what gets extracted. The noise gets left behind.

| ✅ What Migrates | ❌ What Doesn't |
|---|---|
| Facts about you (role, company, team, location) | Raw conversation transcripts |
| Your technical stack and tooling preferences | Specific answers ChatGPT gave you |
| Communication and formatting style | Files, images, or code from past conversations |
| Recurring workflows and technical domains | ChatGPT's "memory" feature text verbatim |
| Active project context and goals | Time-sensitive or one-off exchanges |
| Domain expertise signals | Opinions ChatGPT expressed |
| How you like problems approached | Conversation tone or relationship dynamics |

**The result is a clean, curated profile** — not a dump of everything you ever said, but a distilled representation of the knowledge about you that makes Claude immediately useful. You review it before importing. You decide what stays.

Think of it less like "moving your chat history" and more like "briefing Claude on who you are" — except Claude does the briefing prep from your history automatically.

---

## 🚀 Quick Start

### Prerequisites

- [Docker](https://docker.com) + Docker Compose
- An `ANTHROPIC_API_KEY` — get one free at [console.anthropic.com](https://console.anthropic.com)

### One-command launch

```bash
git clone https://github.com/YOUR_ORG/chatgpt-to-claude.git
cd chatgpt-to-claude

# Optional: copy .env.example → .env and set ANTHROPIC_API_KEY (Compose loads .env when present)
ANTHROPIC_API_KEY=sk-ant-... docker compose up --build
```

Open **[http://localhost:3000](http://localhost:3000)** — that's it.

### Get your ChatGPT export

1. Log into [chat.openai.com](https://chat.openai.com)
2. **Settings → Data Controls → Export data**
3. Click **Export** — OpenAI emails you a download link (can take up to an hour for large accounts)
4. Download the ZIP, extract it
5. Find `conversations.json` inside
6. Upload it to this app

> **Large exports:** Power users can have 500MB+ exports with thousands of conversations. The pipeline handles it — conversations are processed in batches with real-time streaming progress so you can watch extraction happen live.

---

## 🏗 Architecture

### System Overview

```
┌────────────────────────────────────────────────────────────────────┐
│                            Browser                                  │
│                                                                    │
│   ┌──────────────┐    ┌──────────────────┐    ┌────────────────┐  │
│   │  UploadZone  │    │  ProgressFeed    │    │  ResultsView   │  │
│   │              │    │                  │    │                │  │
│   │  Drag & Drop │    │  Terminal log    │    │  Memory cards  │  │
│   │  .json file  │    │  Live counters   │    │  Skill grid    │  │
│   │  State: idle │    │  Chunk progress  │    │  ZIP download  │  │
│   └──────┬───────┘    └────────┬─────────┘    └──────┬─────────┘  │
│          │ POST /upload        │ SSE stream           │ GET /dl    │
└──────────┼─────────────────────┼──────────────────────┼────────────┘
           ▼                     ▼                      ▼
┌────────────────────────────────────────────────────────────────────┐
│                          FastAPI Backend                            │
│                                                                    │
│   POST /api/upload          GET /api/stream/{id}   GET /api/dl    │
│   ─────────────────         ─────────────────────  ────────────   │
│   Parse JSON                SSE typed events       Build ZIP      │
│   BFS tree walk             Run ETL pipeline       memory.json    │
│   Return job_id             Stream results live    skills/*.md    │
│                             Store final results    report.md      │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│                          ETL Pipeline                               │
│                                                                    │
│   parser.py              extractor.py              generator.py   │
│   ──────────             ────────────              ────────────   │
│   BFS tree walk    ──►   Claude API          ──►   memory.json    │
│   Flatten nodes          Batch extraction          skills/*.md    │
│   Sort by date           Confidence filter          report.md     │
│   Cap msg length         Dedup pass                raw.json       │
└─────────────────────────────────┬──────────────────────────────────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │   Anthropic API   │
                        │                  │
                        │  claude-sonnet   │
                        │       -4-6       │
                        │                  │
                        │  Extraction      │
                        │  Deduplication   │
                        └──────────────────┘
```

### Frontend: React + Vite + TypeScript + Tailwind

Three-phase UI driven by a clean state machine in `App.tsx`:

```
idle ──upload──► uploading ──parsed──► processing ──done──► complete
  │                                        │
  └──────────────── error ◄────────────────┘
```

| State | Component | What Happens |
|---|---|---|
| `idle` | `UploadZone` | Drag-and-drop file input, feature pills, export instructions |
| `uploading` | `UploadZone` | Spinner, "Parsing conversations..." |
| `processing` | `ProgressFeed` | Live SSE terminal log, chunk progress bar, real-time counters |
| `complete` | `ResultsView` | Memory cards, skill grid, collapsible sections, ZIP download CTA |
| `error` | Error panel | Diagnostic message, API key check prompt, retry button |

**SSE lifecycle in `App.tsx`:**

```typescript
// Upload → get job_id
const { job_id, conversation_count } = await uploadFile(file)

// Open SSE stream → handle typed events
const cleanup = streamJob(job_id,
  (event) => {
    if (event.type === 'memory') accumulate memory entry
    if (event.type === 'skill')  accumulate skill entry
    if (event.type === 'progress') update percent
    if (event.type === 'complete') transition to results view
  },
  onDone,
  onError
)

// Cleanup on unmount or reset
return () => cleanup()
```

### Backend: FastAPI + Python

**Four endpoints:**

```
POST /api/upload/{job_id}     Accept conversations.json → parse → return job_id + count
GET  /api/stream/{job_id}     SSE stream: run ETL, emit typed JSON events
GET  /api/download/{job_id}   Generate and serve ZIP artifact bundle
GET  /api/results/{job_id}    Fetch final results JSON (polling fallback)
```

**`parser.py` — BFS tree walker:**

OpenAI stores conversations as a directed acyclic graph of nodes, not a simple array. Each node has a `parent`, `children[]`, and optionally a `message`. The format is optimized for their internal rendering engine, not for external consumption. The walker:

1. Finds the root node (the one with no parent or whose parent isn't in the mapping)
2. BFS-traverses children in order
3. Extracts only `user` and `assistant` messages
4. Skips empty content, system messages, and tool outputs
5. Returns a flat ordered list sorted by creation timestamp

```python
# OpenAI's actual format (simplified)
{
  "mapping": {
    "node-abc": {
      "parent": null,           # root — often has no message
      "children": ["node-def"],
      "message": null
    },
    "node-def": {
      "parent": "node-abc",
      "children": ["node-ghi"],
      "message": {
        "author": {"role": "user"},
        "content": {"parts": ["Hello, explain async/await to me"]}
      }
    }
  }
}
```

**`extractor.py` — Two-pass Claude extraction:**

*Pass 1: Batch extraction*

Conversations are chunked into groups of 5 and sent to Claude with a structured prompt. The prompt demands JSON-only output with this schema:

```json
{
  "facts": [
    {"text": "User is a senior ML engineer at a nonprofit org", "confidence": 0.92}
  ],
  "preferences": [
    {"text": "Prefers async Python patterns over threading", "confidence": 0.88}
  ],
  "skills": [
    {
      "name": "Snowflake + Cortex Integration",
      "description": "Building ML pipelines on Snowflake using Cortex functions",
      "examples": ["Cortex COMPLETE for text generation", "Vector search for RAG"]
    }
  ],
  "interests": ["GPU-accelerated computing", "video generation models"],
  "context": ["Building a two-stage email generation pipeline for nonprofit fundraising"]
}
```

Items with confidence < 0.55 are discarded. Each discovered item is immediately emitted as an SSE event so the UI shows them appearing in real time.

*Pass 2: Deduplication*

After all batches complete, the full accumulated result set is sent to Claude for a deduplication and merging pass. Near-duplicate facts get merged into the most specific version. Contradictory facts get resolved toward the most recent signal. The output is a clean, non-redundant user profile.

**`generator.py` — Three artifact types:**

```
memory_entries.json    Flat array of strings, one per Claude memory entry
skills/{slug}.md       One file per detected skill, Claude SKILL.md format
migration_report.md    Human-readable summary with tables and next steps
raw_results.json       Unprocessed extraction output for custom handling
```

### SSE Event Protocol

The stream endpoint emits newline-delimited `data:` events. The UI pattern-matches on `type`:

```typescript
// Every event the backend can emit:
type SSEEvent =
  | { type: 'start';    total: number; message: string }
  | { type: 'progress'; chunk: number; total_chunks: number; percent: number; message: string }
  | { type: 'memory';   category: 'fact' | 'preference'; text: string; confidence: number }
  | { type: 'skill';    name: string; description: string }
  | { type: 'warning';  message: string }
  | { type: 'complete'; results: ExtractionResults }
  | { type: 'error';    message: string }
```

The `complete` event carries the full final `ExtractionResults` payload which the UI stores as job state and renders in `ResultsView`.

---

## ⚙️ Configuration

| Variable | Required | Default | Description |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | — | Your Anthropic API key from console.anthropic.com |

**Model selection** — edit `MODEL` in `backend/etl/extractor.py`:

```python
MODEL = "claude-sonnet-4-6"       # Default: fast, accurate, cost-effective
# MODEL = "claude-opus-4-6"       # Higher quality extraction, ~5x cost
# MODEL = "claude-haiku-4-5-20251001" # Fastest, cheapest, good for small exports
```

**Extraction tuning** — in `extractor.py`:

```python
chunk_size = 5           # Conversations per API call. Higher = faster, lower = more accurate.
confidence_threshold = 0.55  # Min confidence to keep a fact/preference. Raise to reduce noise.
max_messages_per_conv = 30   # Max messages extracted per conversation. Caps token cost.
max_content_chars = 400      # Max characters per message before truncation.
max_chunk_chars = 12000      # Hard cap on total characters sent per API call.
```

---

## 🐳 Deployment

### Docker Compose (recommended for self-hosting)

```bash
# Local dev / internal deployment
ANTHROPIC_API_KEY=sk-ant-... docker compose up --build

# Detached production mode
ANTHROPIC_API_KEY=sk-ant-... docker compose up -d --build

# View logs
docker compose logs -f backend
docker compose logs -f frontend
```

Ports: `localhost:3000` (UI) · `localhost:8000` (API direct)

### Azure Container Apps

```bash
# 1. Login and create registry
az login
az acr login --name <your-acr>

# 2. Build and push
docker compose build

docker tag chatgpt-to-claude-backend <your-acr>.azurecr.io/migration-backend:latest
docker tag chatgpt-to-claude-frontend <your-acr>.azurecr.io/migration-frontend:latest

docker push <your-acr>.azurecr.io/migration-backend:latest
docker push <your-acr>.azurecr.io/migration-frontend:latest

# 3. Deploy backend as internal Container App (no public ingress)
az containerapp create \
  --name migration-backend \
  --resource-group <rg> \
  --environment <env> \
  --image <your-acr>.azurecr.io/migration-backend:latest \
  --target-port 8000 \
  --ingress internal \
  --secrets anthropic-key=<your-key> \
  --env-vars ANTHROPIC_API_KEY=secretref:anthropic-key \
  --min-replicas 1 \
  --max-replicas 3

# 4. Deploy frontend with external ingress
az containerapp create \
  --name migration-frontend \
  --resource-group <rg> \
  --environment <env> \
  --image <your-acr>.azurecr.io/migration-frontend:latest \
  --target-port 80 \
  --ingress external \
  --min-replicas 1
```

> **SSE Note:** Azure Container Apps supports SSE natively. Ensure `--ingress` transport is `http` (not `http2`). The Nginx config already sets the correct `proxy_buffering off` and `X-Accel-Buffering: no` headers.

### Fly.io

```bash
fly launch --no-deploy
fly secrets set ANTHROPIC_API_KEY=sk-ant-...
fly deploy
```

### Railway

```bash
railway init
railway add --service backend
railway variables set ANTHROPIC_API_KEY=sk-ant-...
railway up
```

### Bare metal / VM

```bash
# Backend (install [uv](https://docs.astral.sh/uv/) once: curl -LsSf https://astral.sh/uv/install.sh | sh)
cd backend
uv sync
ANTHROPIC_API_KEY=sk-ant-... uv run uvicorn main:app --host 0.0.0.0 --port 8000 --workers 2

# Frontend — build and serve
cd frontend
npm install && npm run build
# Serve dist/ with Nginx, Caddy, or any static host
# Configure /api proxy to your backend host:8000
# Ensure proxy_buffering is disabled for SSE
```

---

## 📦 Local Development

```bash
# Clone
git clone https://github.com/YOUR_ORG/chatgpt-to-claude.git
cd chatgpt-to-claude

# Backend — [uv](https://docs.astral.sh/uv/) manages Python + venv + lockfile
cd backend
uv sync                                    # creates .venv from uv.lock
ANTHROPIC_API_KEY=sk-ant-... uv run uvicorn main:app --reload --port 8000

# After editing dependencies: change pyproject.toml, then
#   uv lock && uv sync

# Frontend (new terminal)
cd frontend
npm ci
npm run dev
# → http://localhost:5173
# Vite proxy routes /api/* → localhost:8000 automatically
```

---

## 📁 Project Structure

```
chatgpt-to-claude/
│
├── backend/
│   ├── main.py                  FastAPI app — upload, SSE stream, download, results
│   ├── pyproject.toml           Dependencies + setuptools layout (main + etl)
│   ├── uv.lock                  Locked versions for uv / Docker
│   ├── Dockerfile               Python 3.12 + uv sync (frozen lock)
│   └── etl/
│       ├── __init__.py
│       ├── parser.py            BFS tree walk of OpenAI node graph → flat messages
│       ├── extractor.py         Async Claude API extraction + dedup (streaming SSE)
│       └── generator.py         Build memory.json, skill .md files, report.md
│
├── frontend/
│   ├── index.html               Vite entry + Google Fonts (Syne, Manrope, JetBrains Mono)
│   ├── package.json             React 18, lucide-react, Tailwind 3, Vite 6
│   ├── package-lock.json        Pinned deps for npm ci / Docker
│   ├── vite.config.ts           Vite config + /api proxy to backend
│   ├── tsconfig.json            Strict TypeScript
│   ├── tailwind.config.js       Design tokens: colors, fonts, animations
│   ├── postcss.config.js
│   ├── nginx.conf               SPA routing + /api proxy + SSE buffering headers
│   ├── Dockerfile               Multi-stage: Node build → Nginx serve
│   └── src/
│       ├── main.tsx             React root + StrictMode
│       ├── App.tsx              State machine: idle→uploading→processing→complete
│       ├── api.ts               uploadFile(), streamJob(), downloadUrl()
│       ├── types.ts             AppState, SSEEvent, JobState, MemoryEntry, etc.
│       ├── index.css            Design system: CSS vars, animations, scrollbars
│       └── components/
│           ├── UploadZone.tsx   Drag-and-drop with animated state transitions
│           ├── ProgressFeed.tsx SSE log + live stat counters + chunk progress bar
│           └── ResultsView.tsx  Memory cards, skill grid, copy buttons, ZIP CTA
│
├── docker-compose.yml           Backend + Nginx frontend, one-command deploy
├── .env.example                 Optional ANTHROPIC_API_KEY template for Compose
└── README.md                    This file
```

---

## 🔄 The Migration Playbook

After you run the tool and download `claude-migration.zip`:

### Step 1: Review Before You Import

Open `migration_report.md` first. Read every entry. Ask yourself:
- Is this still true? Jobs change, projects end, tech stacks evolve.
- Is this something I want Claude to know permanently?
- Is there anything sensitive I'd rather leave out?

Edit `memory_entries.json` to remove or correct anything before the next step.

### Step 2: Import Memory Entries

Each string in `memory_entries.json` is one Claude memory entry — a plain English statement about you.

**Via Claude.ai:** Settings → Memory → Add memory → paste each entry.

**Scripted (when Anthropic exposes bulk Memory API):**

```python
import json

entries = json.load(open("claude-migration/memory_entries.json"))

print(f"Ready to import {len(entries)} memory entries:")
for i, entry in enumerate(entries, 1):
    print(f"  [{i:03d}] {entry}")

# Future: call Anthropic Memory API per entry
# For now: paste into Claude.ai Settings → Memory
```

### Step 3: Install Skill Documents

```bash
unzip claude-migration.zip -d ./migration-output
cp migration-output/claude-migration/skills/*.md /path/to/your/claude/skills/
```

Skill files follow Claude's `SKILL.md` frontmatter format. Any Claude instance with access to that skills directory will automatically have access to these skills.

### Step 4: Validate

Test that Claude has your context:

```
What's my current tech stack?
What projects am I actively working on?
How do I prefer my code structured?
What's my role and where do I work?
```

If the answers reflect your reality accurately — migration is complete.

### Step 5: Decommission

Once confirmed, shut down the migration app. Delete the export file. Your data is now in Claude where it belongs.

```bash
docker compose down
rm -rf claude-migration.zip ~/Downloads/chatgpt_export.zip
```

---

## 🛣️ Roadmap

This is v1.0. What's next if the community wants it:

- [ ] **Bulk Memory API import** — programmatic mass-import when Anthropic exposes the endpoint
- [ ] **Conversation browser** — preview and cherry-pick which conversations to include before extraction
- [ ] **Custom extraction templates** — domain-specific prompts for legal, medical, engineering, finance
- [ ] **Multi-user mode** — enterprise deployment with per-user job isolation and auth
- [ ] **Persistent job storage** — Redis or Postgres backend so jobs survive container restarts
- [ ] **Additional import sources** — Google Gemini, GitHub Copilot, Perplexity, Cursor, Notion AI
- [ ] **Incremental sync** — re-run on new exports, only process conversations since last run
- [ ] **Webhook delivery** — POST results to your own endpoint instead of downloading
- [ ] **Claude.ai OAuth** — authenticate and push directly into your Claude account
- [ ] **Org-level export** — team leads migrate entire department context to Claude in one run

Open an issue. Open a PR. This thing should be as good as the community makes it.

---

## 🤝 Contributing

```bash
# Fork → Clone → Branch
git clone https://github.com/YOUR_ORG/chatgpt-to-claude.git
cd chatgpt-to-claude
git checkout -b feat/your-feature

# Make changes → Commit (conventional commits)
git commit -m "feat: add support for Gemini conversation export"
git commit -m "fix: handle empty message nodes in BFS walker"
git commit -m "docs: add Azure deployment walkthrough"

# Push → PR
git push origin feat/your-feature
```

### Where to contribute

| Area | What's needed |
|---|---|
| **Parser** | Edge cases: voice conversations, multimodal content, plugin outputs, canvas |
| **Extraction prompts** | Domain-specific variants for legal, medical, scientific, engineering users |
| **Frontend** | Accessibility (ARIA, keyboard nav), mobile layout, light theme |
| **Tests** | Unit tests for parser BFS logic, extraction mocking, generator output validation |
| **Deployment** | Helm chart for Kubernetes, Terraform modules, one-click deploy buttons |
| **Import sources** | Gemini, Copilot, Perplexity, Cursor conversation formats |
| **Docs** | Non-English translations, video walkthrough, enterprise deployment guide |

### Code standards

- **Python:** Black formatter · type hints on all functions · docstrings on public APIs
- **TypeScript:** strict mode · functional components · no `any` · explicit return types
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) format
- **PRs:** One thing per PR · describe *why* not just *what* · screenshots for UI changes

---

## 🔐 Privacy & Security

This tool processes years of your personal conversation history. Be informed:

**Data flow:**
```
Your machine → FastAPI backend → Anthropic API → Back to your machine
```

- **Nothing is stored persistently.** The FastAPI backend holds job state in memory only. Container restart = data gone.
- **Your conversations hit the Anthropic API** for semantic extraction. This is subject to Anthropic's [Privacy Policy](https://www.anthropic.com/privacy) and [Usage Policy](https://www.anthropic.com/legal/aup). Anthropic **does not train on API data** by default.
- **Run it fully local** if you need zero external data exposure. `uvicorn main:app --reload` on your machine means your data never leaves your network.
- **No auth by default.** For enterprise multi-user deployments, add an auth layer in front (Azure API Management, nginx basic auth, OAuth proxy, etc.).
- **Review the output.** You decide what actually gets imported into Claude. The tool extracts; you curate.

---

## 💡 On Who Builds the Future and How

There's a cynical take that says all AI companies are the same — just racing to build the most capable model as fast as possible, ethics as wallpaper.

Anthropic is a direct institutional rebuttal to that cynicism.

When Jan Leike resigned from OpenAI's safety team, he wrote: *"safety culture and processes have taken a back seat to product."* That is the former head of safety at the most influential AI company in the world, saying in plain language that the mission has been subordinated to the business.

Anthropic was founded specifically because a group of people saw that dynamic forming from the inside and refused to participate in it. They left. They built something different. They published their methods. They bound themselves to safety commitments before being required to. They built the governance structures to resist the pressures that captured their former employer.

The technology they're building — Claude — reflects that. Not as a branding choice. As an architectural choice. A model trained to have genuine values doesn't just behave differently in edge cases. It behaves differently in millions of everyday interactions with millions of people.

**Who builds this technology matters. How they build it matters. The values they encode — deliberately or by neglect — get deployed to everyone.**

This migration tool is one small piece of infrastructure for people who've decided that matters.

---

## 📄 License

**MIT.** See [LICENSE](LICENSE).

Free to use, fork, modify, deploy, and distribute. Attribution is appreciated, not required.
Built by the community. For the community.

---

## 🙏 Acknowledgments

- **[Anthropic](https://anthropic.com)** — for building Claude with Constitutional AI and making safety research public
- **[FastAPI](https://fastapi.tiangolo.com)** — the cleanest async Python API framework in existence
- **[Vite](https://vitejs.dev)** + **[React](https://react.dev)** — for making the frontend ecosystem not completely miserable
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first CSS that actually scales
- **The open source community** — every library, every published paper, every Stack Overflow answer that made this possible in a weekend

---

<div align="center">

**Built by developers who believe the future of AI is not predetermined.**
**It gets built by the choices we make today.**

*If this matters to you — star it, share it, contribute to it.*

[![Star on GitHub](https://img.shields.io/github/stars/YOUR_ORG/chatgpt-to-claude?style=social)](https://github.com/YOUR_ORG/chatgpt-to-claude)

---

*ChatGPT → Claude Migration Bridge · MIT License · Powered by Anthropic Claude*

</div>
