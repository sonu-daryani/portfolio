'use client'

import { motion } from 'framer-motion'
import StatusPill from '../ai/StatusPill'
import RoleChip from '../ai/RoleChip'
import { Icon } from '../ui/Icon'

export default function HeroBadges() {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5"
      variants={{
        hidden: { opacity: 0, y: -8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <StatusPill label="Available for new roles" tone="live" />
      <RoleChip icon={<Icon.Bolt size={12} />} label="Senior Frontend" />
      <RoleChip icon={<Icon.Stack size={12} />} label="Full Stack" />
      <RoleChip icon={<Icon.Branch size={12} />} label="Frontend Lead" />
      <RoleChip icon={<Icon.Brain size={12} />} label="Builds on AI products" />
    </motion.div>
  )
}
