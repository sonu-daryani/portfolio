'use client'

import { motion } from 'framer-motion'
import type { ExperienceItem } from '../../types/profile'
import JobCard from './JobCard'
import TimelineDot from './TimelineDot'
import TimelineRail from './TimelineRail'

interface TimelineItemProps {
  job: ExperienceItem
  index: number
  isLast: boolean
}

export default function TimelineItem({ job, index, isLast }: TimelineItemProps) {
  const isCurrent = index === 0

  return (
    <motion.li
      className="grid grid-cols-[20px_minmax(0,1fr)] gap-4 sm:grid-cols-[28px_minmax(0,1fr)] sm:gap-6"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="flex flex-col items-center pt-3">
        <TimelineDot active={isCurrent} />
        {!isLast ? <TimelineRail /> : null}
      </div>
      <JobCard job={job} current={isCurrent} />
    </motion.li>
  )
}
