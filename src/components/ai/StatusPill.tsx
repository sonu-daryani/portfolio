'use client'

import { motion } from 'framer-motion'
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
    <motion.span
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'status-pill inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono tracking-wide backdrop-blur-md',
        toneClasses[tone],
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
            tone === 'live' && 'bg-emerald-400',
            tone === 'info' && 'bg-accent',
            tone === 'muted' && 'bg-theme-muted',
          )}
        />
        <span
          className={cn(
            'relative inline-flex h-2 w-2 rounded-full',
            tone === 'live' && 'bg-emerald-400',
            tone === 'info' && 'bg-accent',
            tone === 'muted' && 'bg-theme-muted',
          )}
        />
      </span>
      {label}
    </motion.span>
  )
}
