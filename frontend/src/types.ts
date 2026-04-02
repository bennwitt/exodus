export type AppState = 'idle' | 'uploading' | 'processing' | 'complete' | 'error'

export interface UploadResponse {
  job_id: string
  conversation_count: number
}

export interface SSEEvent {
  type: 'start' | 'progress' | 'memory' | 'skill' | 'warning' | 'complete' | 'error'
  message?: string
  total?: number
  chunk?: number
  total_chunks?: number
  percent?: number
  category?: 'fact' | 'preference'
  text?: string
  confidence?: number
  name?: string
  description?: string
  results?: ExtractionResults
}

export interface MemoryEntry {
  category: 'fact' | 'preference'
  text: string
  confidence: number
}

export interface SkillEntry {
  name: string
  description: string
}

export interface ExtractionResults {
  memories: string[]
  skills: Array<{ name: string; description: string; examples?: string[] }>
  interests: string[]
  context: string[]
}

export interface JobState {
  jobId: string
  conversationCount: number
  events: SSEEvent[]
  memories: MemoryEntry[]
  skills: SkillEntry[]
  results: ExtractionResults | null
  percent: number
  errorMessage?: string
}
