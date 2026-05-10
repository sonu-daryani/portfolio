import type { ExperienceItem } from '../../types/profile'
import Button from '../ui/Button'
import { Icon } from '../ui/Icon'

interface JobCardProps {
  job: ExperienceItem
  current?: boolean
}

export default function JobCard({ job, current }: JobCardProps) {
  return (
    <article className="timeline-card rounded-2xl border border-theme-border bg-theme-card/92 p-5 sm:p-6 shadow-md">
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          {job.previewImage ? (
            <div className="company-thumb shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden border border-theme-border bg-theme-strong/40">
              <img
                src={job.previewImage}
                alt={`${job.company} preview`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : null}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-theme leading-tight">
                {job.role}
              </h3>
              {current ? (
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/25 font-mono">
                  current
                </span>
              ) : null}
            </div>
            <p className="text-accent font-medium mt-1">
              {job.company}{' '}
              <span className="text-theme-muted font-normal">· {job.location}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-theme-muted font-mono">
            <Icon.Calendar size={12} />
            {job.period}
          </span>
          {job.website ? (
            <Button
              as="a"
              href={job.website}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              className="!px-2"
              aria-label={`Visit ${job.company} website`}
            >
              <span className="inline-flex items-center gap-1 text-xs">
                Visit <Icon.ArrowUpRight size={12} />
              </span>
            </Button>
          ) : null}
        </div>
      </header>
      <ul className="space-y-2 text-theme-muted text-sm">
        {job.points.map((point, i) => (
          <li key={i} className="flex gap-2.5">
            <Icon.ArrowRight size={14} className="text-accent mt-0.5 shrink-0" />
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
