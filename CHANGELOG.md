# Changelog

## [feat] Add initial ChatGPT → Claude migration bridge scaffold
**2026-04-02** at 23:47 UTC

Add project scaffold with backend ETL, frontend UI, and documentation.

### Changes

**Added:**
- `.env.example`
- `.gitignore`
- `backend/.dockerignore`
- `backend/Dockerfile`
- `backend/etl/__init__.py`
- `backend/etl/extractor.py`
- `backend/etl/generator.py`
- `backend/etl/parser.py`
- `backend/main.py`
- `backend/pyproject.toml`
- `backend/uv.lock`
- `docker-compose.yml`
- `frontend/.dockerignore`
- `frontend/Dockerfile`
- `frontend/index.html`
- `frontend/nginx.conf`
- `frontend/package-lock.json`
- `frontend/package.json`
- `frontend/postcss.config.js`
- `frontend/src/App.tsx`
- `frontend/src/api.ts`
- `frontend/src/components/ProgressFeed.tsx`
- `frontend/src/components/ResultsView.tsx`
- `frontend/src/components/UploadZone.tsx`
- `frontend/src/index.css`
- `frontend/src/main.tsx`
- `frontend/src/types.ts`
- `frontend/tailwind.config.js`
- `frontend/tsconfig.json`
- `frontend/vite.config.ts`

**Modified:**
- `README.md`

### Details
## Overview
Initial implementation of the ChatGPT → Claude migration bridge includes both backend and frontend components with configuration, deployment, and documentation.

## Backend
* FastAPI server with upload, SSE stream, and download endpoints
* ETL pipeline for parsing conversations, extracting and deduplicating user intelligence
* Dockerfile and .dockerignore for containerized deployment
* pyproject.toml and uv.lock for reproducible dependency management

## Frontend
* React + Vite + Tailwind CSS UI for file upload, progress feed, and result display
* Modular components for upload zone, progress log, and results view
* Dockerfile and nginx.conf for static hosting and API proxying
* Tailwind, PostCSS, TypeScript, and linting config for development

## Deployment
* Docker Compose setup for orchestrating backend and frontend services
* .env.example template for environment variable configuration

## Documentation
* Comprehensive README.md with quick start guide, architecture overview, usage instructions, and roadmap

---
