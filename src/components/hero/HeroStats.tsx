'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '4+', label: 'Years building' },
  { value: '15+', label: 'Production apps' },
  { value: '500+', label: 'DSA solved' },
  { value: '99', label: 'Lighthouse avg' },
]

export default function HeroStats() {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
      }}
    >
      {STATS.map((s) => (
        <div
          key={s.label}
          className="hero-stat rounded-xl border border-theme-border bg-theme-card/60 backdrop-blur-md px-3 py-3 text-center sm:text-left"
        >
          <p className="text-xl sm:text-2xl font-bold text-theme leading-none">{s.value}</p>
          <p className="text-[11px] sm:text-xs text-theme-muted font-mono mt-1">{s.label}</p>
        </div>
      ))}
    </motion.div>
  )
}
