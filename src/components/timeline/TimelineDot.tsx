import { cn } from '../../lib/utils'

interface TimelineDotProps {
  active?: boolean
}

export default function TimelineDot({ active }: TimelineDotProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex items-center justify-center h-4 w-4 rounded-full border-2',
        active
          ? 'bg-accent border-accent shadow-[0_0_0_4px_rgba(167,139,250,0.18)]'
          : 'bg-theme-strong border-accent/60',
      )}
    >
      {active ? (
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 animate-ping" />
      ) : null}
    </span>
  )
}
