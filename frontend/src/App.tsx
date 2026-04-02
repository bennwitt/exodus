import { useCallback, useRef, useState } from 'react'
import type { AppState, JobState, MemoryEntry, SSEEvent, SkillEntry } from './types'
import { uploadFile, streamJob } from './api'
import { UploadZone } from './components/UploadZone'
import { ProgressFeed } from './components/ProgressFeed'
import { ResultsView } from './components/ResultsView'

const INITIAL_JOB: JobState = {
  jobId: '',
  conversationCount: 0,
  events: [],
  memories: [],
  skills: [],
  results: null,
  percent: 0,
}

export default function App() {
  const [appState, setAppState] = useState<AppState>('idle')
  const [isUploading, setIsUploading] = useState(false)
  const [job, setJob] = useState<JobState>(INITIAL_JOB)
  const [errorMessage, setErrorMessage] = useState('')
  const cleanupRef = useRef<(() => void) | null>(null)

  const handleFile = useCallback(async (file: File) => {
    setIsUploading(true)
    setAppState('uploading')

    try {
      const { job_id, conversation_count } = await uploadFile(file)

      setJob((prev) => ({
        ...prev,
        jobId: job_id,
        conversationCount: conversation_count,
      }))

      setIsUploading(false)
      setAppState('processing')

      const cleanup = streamJob(
        job_id,
        // onEvent
        (event: SSEEvent) => {
          setJob((prev) => {
            const nextEvents = [...prev.events, event]
            let nextMemories = [...prev.memories]
            let nextSkills = [...prev.skills]
            let nextPercent = prev.percent

            if (event.type === 'memory' && event.text) {
              const entry: MemoryEntry = {
                category: event.category ?? 'fact',
                text: event.text,
                confidence: event.confidence ?? 0.7,
              }
              nextMemories = [...nextMemories, entry]
            }

            if (event.type === 'skill' && event.name) {
              const skill: SkillEntry = {
                name: event.name,
                description: event.description ?? '',
              }
              // Avoid duplicates
              if (!nextSkills.find((s) => s.name === event.name)) {
                nextSkills = [...nextSkills, skill]
              }
            }

            if (event.percent !== undefined) {
              nextPercent = event.percent
            }

            return {
              ...prev,
              events: nextEvents,
              memories: nextMemories,
              skills: nextSkills,
              percent: nextPercent,
            }
          })
        },
        // onDone
        () => {
          setJob((prev) => ({ ...prev, percent: 100 }))
          // Small delay so the 100% registers visually
          setTimeout(() => {
            setJob((prev) => {
              const completeEvent = prev.events.findLast((e) => e.type === 'complete')
              return {
                ...prev,
                results: completeEvent?.results ?? null,
              }
            })
            setAppState('complete')
          }, 600)
        },
        // onError
        (msg: string) => {
          setErrorMessage(msg)
          setAppState('error')
        },
      )

      cleanupRef.current = cleanup
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Upload failed')
      setIsUploading(false)
      setAppState('error')
    }
  }, [])

  const handleReset = useCallback(() => {
    cleanupRef.current?.()
    cleanupRef.current = null
    setJob(INITIAL_JOB)
    setErrorMessage('')
    setAppState('idle')
    setIsUploading(false)
  }, [])

  if (appState === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div
          className="max-w-md w-full rounded-2xl p-8 text-center slide-up"
          style={{
            background: 'var(--panel)',
            border: '1px solid rgba(239,68,68,0.3)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(239,68,68,0.1)' }}
          >
            <span className="text-3xl">⚠</span>
          </div>
          <h2
            className="font-display text-2xl font-bold mb-3"
            style={{ color: 'var(--text)' }}
          >
            Something went wrong
          </h2>
          <p
            className="text-sm font-mono mb-6 leading-relaxed"
            style={{ color: '#ef4444' }}
          >
            {errorMessage}
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Make sure <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)' }}>ANTHROPIC_API_KEY</code> is set
            and the backend is running on port 8000.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
            style={{ background: 'var(--amber)', color: '#000' }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (appState === 'complete' && job.results) {
    return <ResultsView job={job} onReset={handleReset} />
  }

  if (appState === 'processing') {
    return <ProgressFeed job={job} />
  }

  return <UploadZone onFile={handleFile} isUploading={isUploading} />
}
