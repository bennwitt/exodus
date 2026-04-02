import { useEffect, useRef } from 'react'
import { AlertTriangle, CheckCircle, Cpu, Zap } from 'lucide-react'
import type { JobState, SSEEvent } from '../types'

interface Props {
  job: JobState
}

function EventRow({ event, index }: { event: SSEEvent; index: number }) {
  const delay = Math.min(index * 0.03, 0.5)

  if (event.type === 'memory') {
    const isPreference = event.category === 'preference'
    return (
      <div
        className="flex gap-3 items-start slide-up py-1"
        style={{ animationDelay: `${delay}s` }}
      >
        <span
          className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-xs font-mono font-medium"
          style={{
            background: isPreference ? 'rgba(99,102,241,0.15)' : 'rgba(245,158,11,0.12)',
            color: isPreference ? '#818cf8' : 'var(--amber)',
            border: `1px solid ${isPreference ? 'rgba(99,102,241,0.3)' : 'rgba(245,158,11,0.25)'}`,
          }}
        >
          {isPreference ? 'PREF' : 'FACT'}
        </span>
        <span className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
          {event.text}
        </span>
      </div>
    )
  }

  if (event.type === 'skill') {
    return (
      <div
        className="flex gap-3 items-start slide-up py-1"
        style={{ animationDelay: `${delay}s` }}
      >
        <span
          className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-xs font-mono font-medium"
          style={{
            background: 'rgba(16,185,129,0.12)',
            color: '#10b981',
            border: '1px solid rgba(16,185,129,0.25)',
          }}
        >
          SKILL
        </span>
        <span className="text-sm" style={{ color: '#10b981' }}>
          {event.name}
        </span>
      </div>
    )
  }

  if (event.type === 'warning') {
    return (
      <div
        className="flex gap-2 items-start slide-up py-1"
        style={{ animationDelay: `${delay}s` }}
      >
        <AlertTriangle size={14} className="shrink-0 mt-0.5" style={{ color: '#f97316' }} />
        <span className="text-sm font-mono" style={{ color: '#f97316' }}>
          {event.message}
        </span>
      </div>
    )
  }

  if (event.type === 'progress' || event.type === 'start') {
    return (
      <div
        className="flex gap-2 items-center slide-up py-0.5"
        style={{ animationDelay: `${delay}s` }}
      >
        <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          ›
        </span>
        <span className="text-sm font-mono" style={{ color: 'var(--muted)' }}>
          {event.message}
        </span>
      </div>
    )
  }

  return null
}

export function ProgressFeed({ job }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [job.events.length])

  const chunkEvent = job.events.findLast((e) => e.type === 'progress' && e.total_chunks)
  const totalChunks = chunkEvent?.total_chunks ?? 1
  const currentChunk = chunkEvent?.chunk ?? 0
  const displayPercent = job.percent

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-10 slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-2 h-2 rounded-full progress-pulse"
            style={{ background: 'var(--amber)' }}
          />
          <span className="font-display text-2xl font-bold" style={{ color: 'var(--text)' }}>
            Analyzing Conversations
          </span>
        </div>
        <p style={{ color: 'var(--muted)' }} className="text-sm">
          {job.conversationCount} conversations · Claude {String.fromCharCode(8594)} extracting intelligence
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8 slide-up" style={{ animationDelay: '0.05s' }}>
        {[
          {
            label: 'Memories Found',
            value: job.memories.length,
            icon: <Zap size={16} />,
            color: 'var(--amber)',
            bg: 'rgba(245,158,11,0.08)',
            border: 'rgba(245,158,11,0.2)',
          },
          {
            label: 'Skills Detected',
            value: job.skills.length,
            icon: <Cpu size={16} />,
            color: '#10b981',
            bg: 'rgba(16,185,129,0.08)',
            border: 'rgba(16,185,129,0.2)',
          },
          {
            label: 'Progress',
            value: `${displayPercent}%`,
            icon: <CheckCircle size={16} />,
            color: '#818cf8',
            bg: 'rgba(99,102,241,0.08)',
            border: 'rgba(99,102,241,0.2)',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5"
            style={{
              background: stat.bg,
              border: `1px solid ${stat.border}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3" style={{ color: stat.color }}>
              {stat.icon}
              <span className="text-xs font-mono uppercase tracking-wider">{stat.label}</span>
            </div>
            <div
              className="font-display text-3xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="mb-6 rounded-full overflow-hidden slide-up"
        style={{
          height: '4px',
          background: 'var(--panel)',
          animationDelay: '0.1s',
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${displayPercent}%`,
            background: 'linear-gradient(90deg, var(--indigo), var(--amber))',
          }}
        />
      </div>

      {/* Chunk progress */}
      {totalChunks > 1 && (
        <div className="flex gap-1.5 mb-8">
          {Array.from({ length: totalChunks }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                background:
                  i < currentChunk
                    ? 'var(--amber)'
                    : i === currentChunk
                      ? 'rgba(245,158,11,0.4)'
                      : 'var(--border)',
              }}
            />
          ))}
        </div>
      )}

      {/* Event log */}
      <div
        className="flex-1 rounded-xl p-5 overflow-y-auto slide-up"
        ref={scrollRef}
        style={{
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          maxHeight: '420px',
          animationDelay: '0.15s',
        }}
      >
        <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
            Extraction Log
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full progress-pulse"
            style={{ background: 'var(--amber)' }}
          />
        </div>

        <div className="space-y-0.5">
          {job.events
            .filter((e) => e.type !== 'complete')
            .map((event, i) => (
              <EventRow key={i} event={event} index={i} />
            ))}
        </div>

        {job.events.length === 0 && (
          <div className="font-mono text-sm cursor-blink" style={{ color: 'var(--muted)' }}>
            Initializing
          </div>
        )}
      </div>
    </div>
  )
}
