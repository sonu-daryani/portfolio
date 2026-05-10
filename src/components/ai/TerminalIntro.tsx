'use client'

import { useEffect, useState } from 'react'

interface TerminalIntroProps {
  lines: { prompt?: string; output: string; tone?: 'accent' | 'muted' | 'theme' }[]
  prompt?: string
}

const toneClass = {
  accent: 'text-accent-light',
  muted: 'text-theme-muted',
  theme: 'text-theme',
}

export default function TerminalIntro({ lines, prompt = 'sonu@portfolio:~$' }: TerminalIntroProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= lines.length) return
    const t = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 350 : 600)
    return () => window.clearTimeout(t)
  }, [step, lines.length])

  return (
    <div className="terminal-card rounded-2xl border border-theme-border bg-theme-strong/92 dark:bg-zinc-950/90 p-4 sm:p-5 font-mono text-[13px] sm:text-sm shadow-xl overflow-hidden opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none delay-200">
      <div className="flex items-center gap-1.5 pb-3 border-b border-theme-border">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-theme-muted text-[11px] sm:text-xs tracking-wide">
          ~/sonu-daryani — zsh
        </span>
      </div>
      <div className="pt-3 space-y-1.5">
        {lines.slice(0, step).map((l, i) => (
          <div
            key={i}
            className="flex gap-2 opacity-0 motion-safe:animate-fade-in-left motion-reduce:opacity-100 motion-reduce:animate-none"
            style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'forwards' }}
          >
            {l.prompt !== undefined ? (
              <span className="text-accent shrink-0">{l.prompt || prompt}</span>
            ) : null}
            <span className={`${toneClass[l.tone ?? 'theme']} break-words`}>{l.output}</span>
          </div>
        ))}
        {step < lines.length ? (
          <span className="inline-block w-2 h-4 bg-accent/90 align-middle" />
        ) : (
          <div className="flex gap-2">
            <span className="text-accent shrink-0">{prompt}</span>
            <span className="inline-block w-2 h-4 bg-accent/90 align-middle" />
          </div>
        )}
      </div>
    </div>
  )
}
