'use client'

import { cn } from '../../lib/utils'

interface StatusPillProps {
  label: string
  tone?: 'live' | 'info' | 'muted'
  className?: string
}

const toneClasses = {
  live: 'text-emerald-300 bg-emerald-500/10 border-emerald-400/25',
  info: 'text-accent-light bg-accent/10 border-accent/25',
  muted: 'text-theme-muted bg-theme-card/60 border-theme-border',
}

export default function StatusPill({ label, tone = 'live', className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'status-pill inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono tracking-wide bg-theme-card/90 opacity-0 motion-safe:animate-fade-in-down motion-reduce:opacity-100 motion-reduce:animate-none',
        toneClasses[tone],
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex h-2 w-2 shrink-0 rounded-full',
          tone === 'live' && 'bg-emerald-400',
          tone === 'info' && 'bg-accent',
          tone === 'muted' && 'bg-theme-muted',
        )}
      />
      {label}
    </span>
  )
}
