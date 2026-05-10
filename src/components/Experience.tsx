'use client'

import type { Profile } from '../types/profile'
import Section from './ui/Section'
import StatusPill from './ai/StatusPill'
import TimelineItem from './timeline/TimelineItem'

interface ExperienceProps {
  profile: Profile
}

export default function Experience({ profile }: ExperienceProps) {
  const jobs = profile.experience

  return (
    <Section width="default">
      <div className="flex items-center gap-3 mb-3">
        <StatusPill label="career.log" tone="info" />
        <span className="text-theme-muted font-mono text-xs hidden sm:inline">
          git log --oneline --graph
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme mb-3 tracking-tight opacity-0 motion-safe:animate-fade-in-up-sm motion-reduce:opacity-100 motion-reduce:animate-none">
        Experience.<span className="text-accent-light">timeline()</span>
      </h2>
      <p className="text-theme-muted text-base sm:text-lg mb-10 max-w-2xl">
        Roughly three years of frontend-led full stack work — from React UI delivery to leading
        frontend architecture for an AI-powered recruitment platform.
      </p>

      <ol className="timeline space-y-6 sm:space-y-8" role="list">
        {jobs.map((job, i) => (
          <TimelineItem
            key={job.company}
            job={job}
            index={i}
            isLast={i === jobs.length - 1}
          />
        ))}
      </ol>
    </Section>
  )
}
