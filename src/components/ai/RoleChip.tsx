import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface RoleChipProps {
  icon: ReactNode
  label: string
  className?: string
}

export default function RoleChip({ icon, label, className }: RoleChipProps) {
  return (
    <span
      className={cn(
        'role-chip inline-flex items-center gap-1.5 rounded-full border border-theme-border bg-theme-card/90 px-3 py-1 text-xs font-medium text-theme',
        className,
      )}
    >
      <span className="text-accent-light">{icon}</span>
      {label}
    </span>
  )
}
