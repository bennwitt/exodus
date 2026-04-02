import type { SSEEvent, UploadResponse } from './types'

const BASE = '/api'

export async function uploadFile(file: File): Promise<UploadResponse> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE}/upload`, { method: 'POST', body: form })
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`)
  return res.json()
}

export function streamJob(
  jobId: string,
  onEvent: (e: SSEEvent) => void,
  onDone: () => void,
  onError: (msg: string) => void,
): () => void {
  const es = new EventSource(`${BASE}/stream/${jobId}`)

  es.onmessage = (e) => {
    try {
      const event: SSEEvent = JSON.parse(e.data)
      onEvent(event)
      if (event.type === 'complete' || event.type === 'error') {
        es.close()
        if (event.type === 'complete') onDone()
        else onError(event.message ?? 'Unknown error')
      }
    } catch {
      // ignore parse errors
    }
  }

  es.onerror = () => {
    es.close()
    onError('Connection lost. Check that the backend is running.')
  }

  return () => es.close()
}

export function downloadUrl(jobId: string): string {
  return `${BASE}/download/${jobId}`
}
