'use client'

import { Icon } from '../ui/Icon'
import { cn } from '../../lib/utils'

export type FilterValue = 'all' | 'ai' | string

interface ProjectFiltersProps {
  techs: string[]
  value: FilterValue
  onChange: (next: FilterValue) => void
}

export default function ProjectFilters({ techs, value, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex items-center gap-2 mb-7 flex-wrap">
      <span className="inline-flex items-center gap-1.5 text-theme-muted text-xs font-mono mr-1">
        <Icon.Filter size={14} /> Filter:
      </span>
      <Chip label="All" active={value === 'all'} onClick={() => onChange('all')} />
      <Chip
        label="AI"
        icon={<Icon.Brain size={12} />}
        active={value === 'ai'}
        onClick={() => onChange('ai')}
      />
      {techs.map((t) => (
        <Chip key={t} label={t} active={value === t} onClick={() => onChange(t)} />
      ))}
    </div>
  )
}

interface ChipProps {
  label: string
  active: boolean
  onClick: () => void
  icon?: React.ReactNode
}

function Chip({ label, active, onClick, icon }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'filter-chip inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all',
        active
          ? 'bg-accent/20 text-accent-light border-accent/40 shadow-inner'
          : 'bg-theme-card/50 text-theme-muted border-theme-border hover:text-theme hover:border-accent/30',
      )}
    >
      {icon}
      {label}
    </button>
  )
}
