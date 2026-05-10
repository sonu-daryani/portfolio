'use client'

const STATS = [
  { value: '4+', label: 'Years building' },
  { value: '15+', label: 'Production apps' },
  { value: '500+', label: 'DSA solved' },
  { value: '99', label: 'Lighthouse avg' },
]

export default function HeroStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none delay-[420ms]">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="hero-stat rounded-xl border border-theme-border bg-theme-card/85 dark:bg-theme-card/80 px-3 py-3 text-center sm:text-left"
        >
          <p className="text-xl sm:text-2xl font-bold text-theme leading-none">{s.value}</p>
          <p className="text-[11px] sm:text-xs text-theme-muted font-mono mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
