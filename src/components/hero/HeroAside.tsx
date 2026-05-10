'use client'

import StatusPill from '../ai/StatusPill'
import TerminalIntro from '../ai/TerminalIntro'

interface HeroAsideProps {
  imageSrc: string
  name: string
}

const TERMINAL_SCRIPT = [
  { prompt: '$', output: 'whoami', tone: 'theme' as const },
  { output: 'sonu_daryani — senior frontend / full stack', tone: 'accent' as const },
  { prompt: '$', output: 'cat focus.json', tone: 'theme' as const },
  {
    output: '["Next.js", "NestJS", "multi-tenant SaaS", "Azure"]',
    tone: 'muted' as const,
  },
  { prompt: '$', output: 'cat learning.json', tone: 'theme' as const },
  {
    output: '["GenAI", "system design", "cloud platforms"]',
    tone: 'muted' as const,
  },
  { prompt: '$', output: 'echo $STATUS', tone: 'theme' as const },
  { output: 'shipping product every week ✓', tone: 'accent' as const },
]

export default function HeroAside({ imageSrc, name }: HeroAsideProps) {
  return (
    <aside
      className="order-1 lg:order-2 w-full max-w-[320px] mx-auto lg:mx-0 lg:max-w-none flex flex-col gap-4 opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none delay-100"
      style={{ transform: 'translateZ(24px)' }}
    >
      <div className="hero-portrait relative overflow-hidden rounded-[1.5rem] bg-theme-card/30 transition-transform duration-200 ease-out hover:scale-[1.02]">
        <img src={imageSrc} alt={name} className="w-full aspect-square object-cover" />
        <span className="hero-portrait-glow" aria-hidden />
        <div className="absolute top-3 left-3">
          <StatusPill label="online" tone="live" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
          <span className="px-2 py-0.5 rounded-md bg-black/55">whoami</span>
          <span className="px-2 py-0.5 rounded-md bg-black/55">v4.0</span>
        </div>
      </div>

      <TerminalIntro lines={TERMINAL_SCRIPT} />
    </aside>
  )
}
