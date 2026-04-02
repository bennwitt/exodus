import { useCallback, useRef, useState } from 'react'
import { Upload, FileJson, ArrowRight } from 'lucide-react'

interface Props {
  onFile: (file: File) => void
  isUploading: boolean
}

export function UploadZone({ onFile, isUploading }: Props) {
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.json')) {
        alert('Please upload a .json file (ChatGPT data export)')
        return
      }
      setFileName(file.name)
      onFile(file)
    },
    [onFile],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Header */}
      <div className="text-center mb-16 slide-up">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-bold"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            GPT
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--amber)',
                  opacity: 0.4 + i * 0.3,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-bold"
            style={{
              background: 'rgba(245,158,11,0.15)',
              color: 'var(--amber)',
              border: '1px solid rgba(245,158,11,0.3)',
            }}
          >
            ◆
          </div>
        </div>
        <h1
          className="font-display text-5xl font-bold tracking-tight mb-3"
          style={{ color: 'var(--text)' }}
        >
          Migration Bridge
        </h1>
        <p style={{ color: 'var(--muted)' }} className="text-lg max-w-md mx-auto">
          Extract your ChatGPT intelligence and rebuild it as Claude memory &amp; skills
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className="relative w-full max-w-xl slide-up"
        style={{ animationDelay: '0.1s' }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <div
          className="relative rounded-2xl p-12 text-center cursor-pointer transition-all duration-300"
          style={{
            background: dragging ? 'rgba(245,158,11,0.05)' : 'var(--panel)',
            border: `2px dashed ${dragging ? 'rgba(245,158,11,0.6)' : 'var(--border)'}`,
            boxShadow: dragging
              ? '0 0 40px rgba(245,158,11,0.1), inset 0 0 40px rgba(245,158,11,0.03)'
              : 'none',
          }}
          onClick={() => !isUploading && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: 'var(--amber)', borderTopColor: 'transparent' }}
              />
              <p className="font-mono text-sm" style={{ color: 'var(--amber)' }}>
                Parsing conversations...
              </p>
            </div>
          ) : fileName ? (
            <div className="flex flex-col items-center gap-4">
              <FileJson size={48} style={{ color: 'var(--amber)' }} />
              <p className="font-mono text-sm" style={{ color: 'var(--text)' }}>{fileName}</p>
              <p style={{ color: 'var(--muted)' }} className="text-sm">
                Starting analysis...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.2)',
                  transform: dragging ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <Upload size={32} style={{ color: 'var(--amber)' }} />
              </div>
              <div>
                <p className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text)' }}>
                  Drop your conversations.json
                </p>
                <p style={{ color: 'var(--muted)' }} className="text-sm">
                  or click to browse
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-lg text-xs font-mono"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                }}
              >
                Settings → Data Controls → Export data → conversations.json
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature pills */}
      <div
        className="flex flex-wrap justify-center gap-3 mt-12 slide-up"
        style={{ animationDelay: '0.2s' }}
      >
        {['Memory Extraction', 'Skill Generation', 'Preference Mapping', 'ZIP Download'].map((f) => (
          <div
            key={f}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
            style={{
              background: 'var(--panel)',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
            }}
          >
            <ArrowRight size={12} style={{ color: 'var(--amber)' }} />
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}
