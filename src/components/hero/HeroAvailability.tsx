'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Availability } from '../../types/profile'
import { Icon } from '../ui/Icon'

interface HeroAvailabilityProps {
  availability: Availability
}

export default function HeroAvailability({ availability }: HeroAvailabilityProps) {
  return (
    <motion.div
      className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-xs text-theme-muted font-mono"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } },
      }}
    >
      <span className="inline-flex items-center gap-1.5">
        <Icon.Pin size={12} className="text-accent" />
        Based in {availability.baseLocation}
      </span>
      <span className="opacity-40 hidden sm:inline">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Icon.Branch size={12} className="text-accent" />
        {availability.localModes.join(' / ')} in {availability.baseLocation}
      </span>
      <span className="opacity-40 hidden sm:inline">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Icon.Globe size={12} className="text-accent" />
        {availability.remoteOnlyElsewhere ? 'Remote-only elsewhere' : 'Open to relocation'}
      </span>
      <span className="opacity-40 hidden sm:inline">·</span>
      <Link href="/projects" className="hover:text-accent inline-flex items-center gap-1">
        Browse projects <Icon.ArrowUpRight size={12} />
      </Link>
    </motion.div>
  )
}
