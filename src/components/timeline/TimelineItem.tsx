'use client'

import { cn } from '../../lib/utils'
import type { ExperienceItem } from '../../types/profile'
import { useInViewOnce } from '../../hooks/useInViewOnce'
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
  const { ref, inView } = useInViewOnce<HTMLLIElement>()

  return (
    <li
      ref={ref}
      className={cn(
        'grid grid-cols-[20px_minmax(0,1fr)] gap-4 sm:grid-cols-[28px_minmax(0,1fr)] sm:gap-6',
        !inView && 'opacity-0',
        inView && 'motion-safe:animate-fade-in-left motion-reduce:opacity-100',
      )}
      style={
        inView
          ? { animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }
          : undefined
      }
    >
      <div className="flex flex-col items-center pt-3">
        <TimelineDot active={isCurrent} />
        {!isLast ? <TimelineRail /> : null}
      </div>
      <JobCard job={job} current={isCurrent} />
    </li>
  )
}
