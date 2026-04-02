import { useState } from 'react'
import {
  Download,
  Brain,
  Wrench,
  Compass,
  FileText,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from 'lucide-react'
import type { JobState } from '../types'
import { downloadUrl } from '../api'

interface Props {
  job: JobState
  onReset: () => void
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={handle}
      className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ color: copied ? '#10b981' : 'var(--muted)' }}
      title="Copy"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

function Section({
  title,
  icon,
  count,
  accent,
  children,
  defaultOpen = true,
}: {
  title: string
  icon: React.ReactNode
  count: number
  accent: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      className="rounded-2xl overflow-hidden slide-up"
      style={{ background: 'var(--panel)', border: '1px solid var(--border)' }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 transition-colors"
        style={{ borderBottom: open ? '1px solid var(--border)' : 'none' }}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${accent}18`, color: accent }}
          >
            {icon}
          </div>
          <span className="font-display text-lg font-semibold" style={{ color: 'var(--text)' }}>
            {title}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-mono font-bold"
            style={{ background: `${accent}18`, color: accent }}
          >
            {count}
          </span>
        </div>
        <div style={{ color: 'var(--muted)' }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {open && <div className="px-6 py-5">{children}</div>}
    </div>
  )
}

export function ResultsView({ job, onReset }: Props) {
  const results = job.results!
  const facts = job.memories.filter((m) => m.category === 'fact')
  const prefs = job.memories.filter((m) => m.category === 'preference')
  const allMemories = results.memories ?? []

  const statCards = [
    { label: 'Conversations', value: job.conversationCount, color: '#64748b' },
    { label: 'Memories', value: allMemories.length, color: '#f59e0b' },
    { label: 'Skills', value: results.skills?.length ?? 0, color: '#10b981' },
    { label: 'Interests', value: results.interests?.length ?? 0, color: '#818cf8' },
  ]

  return (
    <div className="min-h-screen px-6 py-12 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 slide-up">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#10b981' }}>
              Extraction Complete
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold" style={{ color: 'var(--text)' }}>
            Your Claude Profile
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
            Review below, then download your migration package.
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-sm px-4 py-2 rounded-lg transition-colors"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
          }}
        >
          ← New file
        </button>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-4 gap-3 mb-8 slide-up" style={{ animationDelay: '0.05s' }}>
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 text-center"
            style={{ background: 'var(--panel)', border: '1px solid var(--border)' }}
          >
            <div className="font-display text-3xl font-bold mb-1" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Download CTA */}
      <div
        className="rounded-2xl p-6 mb-8 flex items-center justify-between slide-up"
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(99,102,241,0.06) 100%)',
          border: '1px solid rgba(245,158,11,0.25)',
          animationDelay: '0.1s',
        }}
      >
        <div>
          <p className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>
            Ready to migrate
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            ZIP contains: memory_entries.json · skills/*.md · migration_report.md · raw_results.json
          </p>
        </div>
        <a
          href={downloadUrl(job.jobId)}
          download="claude-migration.zip"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: 'var(--amber)',
            color: '#000',
          }}
        >
          <Download size={16} />
          Download Package
        </a>
      </div>

      <div className="space-y-4">
        {/* Memories */}
        <Section
          title="Memory Entries"
          icon={<Brain size={16} />}
          count={allMemories.length}
          accent="#f59e0b"
        >
          {allMemories.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>No memories extracted.</p>
          ) : (
            <div className="space-y-2">
              {allMemories.map((mem, i) => (
                <div
                  key={i}
                  className="group flex items-start justify-between gap-3 px-4 py-3 rounded-xl slide-up card-hover"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border)',
                    animationDelay: `${i * 0.02}s`,
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>
                    {mem}
                  </p>
                  <CopyButton text={mem} />
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Skills */}
        <Section
          title="Skills Detected"
          icon={<Wrench size={16} />}
          count={results.skills?.length ?? 0}
          accent="#10b981"
        >
          {!results.skills?.length ? (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>No skills extracted.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {results.skills.map((skill, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 slide-up card-hover"
                  style={{
                    background: 'rgba(16,185,129,0.04)',
                    border: '1px solid rgba(16,185,129,0.15)',
                    animationDelay: `${i * 0.03}s`,
                  }}
                >
                  <p className="font-semibold text-sm mb-1.5" style={{ color: '#10b981' }}>
                    {skill.name}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {skill.description}
                  </p>
                  {skill.examples && skill.examples.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {skill.examples.slice(0, 2).map((ex, j) => (
                        <p key={j} className="text-xs font-mono" style={{ color: '#475569' }}>
                          · {ex}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Interests */}
        {results.interests && results.interests.length > 0 && (
          <Section
            title="Interests"
            icon={<Compass size={16} />}
            count={results.interests.length}
            accent="#818cf8"
            defaultOpen={false}
          >
            <div className="flex flex-wrap gap-2">
              {results.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full text-sm"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    color: '#a5b4fc',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Context */}
        {results.context && results.context.length > 0 && (
          <Section
            title="Active Context"
            icon={<FileText size={16} />}
            count={results.context.length}
            accent="#f97316"
            defaultOpen={false}
          >
            <div className="space-y-2">
              {results.context.map((ctx, i) => (
                <div
                  key={i}
                  className="group flex items-start justify-between gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(249,115,22,0.05)',
                    border: '1px solid rgba(249,115,22,0.15)',
                  }}
                >
                  <p className="text-sm" style={{ color: '#cbd5e1' }}>{ctx}</p>
                  <CopyButton text={ctx} />
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* Bottom download repeat */}
      <div className="mt-8 text-center slide-up">
        <a
          href={downloadUrl(job.jobId)}
          download="claude-migration.zip"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-base transition-all duration-200 hover:scale-105"
          style={{ background: 'var(--amber)', color: '#000' }}
        >
          <Download size={18} />
          Download claude-migration.zip
        </a>
        <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>
          Import memories via Claude Settings → Memory · Place skill .md files in your skills directory
        </p>
      </div>
    </div>
  )
}
