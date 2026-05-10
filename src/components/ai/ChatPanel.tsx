'use client'

import { motion } from 'framer-motion'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useChat } from '../../context/ChatContext'
import ChatBubble from './ChatBubble'
import { Icon } from '../ui/Icon'

export default function ChatPanel() {
  const { messages, streaming, send, stop, suggestions, closePanel } = useChat()
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => window.clearTimeout(t)
  }, [])

  const submit = (text: string) => {
    if (!text.trim() || streaming) return
    setInput('')
    void send(text)
  }

  const showSuggestions = messages.length <= 1

  return (
    <motion.div
      role="dialog"
      aria-label="AI assistant"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      className="ai-panel fixed bottom-24 right-3 sm:right-5 z-40 w-[min(420px,94vw)] max-h-[min(640px,80vh)] flex flex-col rounded-2xl border border-theme-border bg-theme-strong/98 dark:bg-zinc-950/98 shadow-2xl overflow-hidden"
    >
      <Header onClose={closePanel} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3 ai-chat-body"
      >
        {messages.map((m) => (
          <ChatBubble key={m.id} msg={m} />
        ))}
      </div>

      {showSuggestions ? <Suggestions options={suggestions} onPick={submit} /> : null}

      <Composer
        ref={inputRef}
        value={input}
        onChange={setInput}
        onSubmit={() => submit(input)}
        onStop={stop}
        streaming={streaming}
      />

      <p className="px-4 py-1.5 text-[10px] text-theme-muted/70 font-mono text-center border-t border-theme-border bg-theme-strong/30">
        grounded on the real profile · replies in seconds
      </p>
    </motion.div>
  )
}

function Header({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-theme-border">
      <div className="flex items-center gap-2">
        <span className="ai-launcher-orb">
          <Icon.Sparkle size={14} />
        </span>
        <div className="leading-tight">
          <p className="text-theme font-semibold text-sm">SonuBot</p>
          <p className="text-theme-muted text-[11px] font-mono">
            AI assistant · grounded on real data
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          live
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-theme-muted hover:text-theme p-1"
        >
          <Icon.Close size={16} />
        </button>
      </div>
    </div>
  )
}

function Suggestions({
  options,
  onPick,
}: {
  options: string[]
  onPick: (text: string) => void
}) {
  return (
    <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-2 border-t border-theme-border pt-3 bg-theme-strong/30">
      {options.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          className="ai-suggestion text-left text-[11px] sm:text-xs text-theme-muted bg-theme-card/60 hover:bg-theme-card border border-theme-border rounded-full px-3 py-1.5 transition"
        >
          {s}
        </button>
      ))}
    </div>
  )
}

interface ComposerProps {
  value: string
  onChange: (next: string) => void
  onSubmit: () => void
  onStop: () => void
  streaming: boolean
}

const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(function Composer(
  { value, onChange, onSubmit, onStop, streaming },
  ref,
) {
  return (
    <form
      className="flex items-end gap-2 px-3 sm:px-4 py-3 border-t border-theme-border bg-theme-strong/40"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSubmit()
          }
        }}
        placeholder="Ask anything about Sonu..."
        rows={1}
        disabled={streaming}
        className="chat-input flex-1 resize-none bg-transparent text-theme placeholder:text-theme-muted focus:outline-none text-sm leading-relaxed py-1.5 max-h-28"
      />
      {streaming ? (
        <button
          type="button"
          onClick={onStop}
          className="rounded-full bg-rose-500/85 hover:bg-rose-500 text-white px-3 h-9 text-xs font-semibold inline-flex items-center gap-1"
        >
          Stop
        </button>
      ) : (
        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Send"
          className="rounded-full bg-accent text-on-accent disabled:opacity-40 disabled:cursor-not-allowed px-3 h-9 inline-flex items-center justify-center"
        >
          <Icon.Send size={14} />
        </button>
      )}
    </form>
  )
})
