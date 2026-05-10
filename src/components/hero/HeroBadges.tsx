'use client'

import StatusPill from '../ai/StatusPill'
import RoleChip from '../ai/RoleChip'
import { Icon } from '../ui/Icon'

export default function HeroBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5 opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none">
      <StatusPill label="Available for new roles" tone="live" />
      <RoleChip icon={<Icon.Bolt size={12} />} label="Senior Frontend" />
      <RoleChip icon={<Icon.Stack size={12} />} label="Full Stack" />
      <RoleChip icon={<Icon.Branch size={12} />} label="Frontend Lead" />
      <RoleChip icon={<Icon.Brain size={12} />} label="Builds on AI products" />
    </div>
  )
}
