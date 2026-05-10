'use client'

import type { Profile } from '../types/profile'
import Card from './ui/Card'
import { Icon, type IconName } from './ui/Icon'
import StatusPill from './ai/StatusPill'

interface AboutProps {
  profile: Profile
}

interface SkillGroup {
  label: string
  key: keyof Profile['skills']
  icon: IconName
  caption: string
}

const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Languages', key: 'languages', icon: 'Code', caption: 'Type-safe, modern syntax' },
  { label: 'Frontend', key: 'frameworks', icon: 'Layers', caption: 'React · Next.js · UI systems' },
  { label: 'Backend & Data', key: 'backend', icon: 'Database', caption: 'NestJS · GraphQL · SQL' },
  { label: 'Cloud & DevOps', key: 'cloud', icon: 'Cloud', caption: 'Azure-first, AWS-aware' },
  { label: 'Testing & DX', key: 'tools', icon: 'Wrench', caption: 'Quality, build & day-to-day kit' },
]

const FOCUS_AREAS = [
  {
    icon: 'Layers' as IconName,
    title: 'Multi-tenant SaaS',
    desc: 'Next.js architectures with RBAC, JWT, and audited data flows for recruiter and candidate journeys.',
  },
  {
    icon: 'Bolt' as IconName,
    title: 'Frontend craft',
    desc: 'Pixel-perfect UI, accessible components, fast first paint, and predictable state at scale.',
  },
  {
    icon: 'Stack' as IconName,
    title: 'Full-stack delivery',
    desc: 'NestJS APIs, PostgreSQL/Prisma, Microsoft Graph, Azure Functions/Queue, and Temporal workflows.',
  },
  {
    icon: 'Branch' as IconName,
    title: 'Frontend lead',
    desc: 'Own delivery timelines, mentor juniors, and partner closely with product, design, and ML teams.',
  },
]

export default function About({ profile }: AboutProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-10 sm:py-14 md:py-16">
      <div className="max-w-6xl mx-auto w-full opacity-0 motion-safe:animate-fade-in motion-reduce:opacity-100 motion-reduce:animate-none">
        <div className="flex items-center gap-3 mb-4">
          <StatusPill label="about.json" tone="info" />
          <span className="text-theme-muted font-mono text-xs hidden sm:inline">
            ~/sonu-daryani/about
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme tracking-tight mb-3">
          Frontend-led engineer shipping{' '}
          <span className="text-accent-light">AI-powered SaaS</span>.
        </h2>
        <p className="text-theme-muted max-w-3xl leading-relaxed mb-10 sm:mb-12 text-base sm:text-lg">
          {profile.about}
        </p>

        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-4 opacity-0 motion-safe:animate-fade-in-scale motion-reduce:opacity-100 motion-reduce:animate-none delay-75">
            <div className="relative rounded-[1.4rem] overflow-hidden border border-theme-border bg-theme-card/40 shadow-xl">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full aspect-square object-cover"
              />
              <span className="hero-portrait-glow" aria-hidden />
            </div>
            <div className="rounded-2xl border border-theme-border bg-theme-card/85 p-4 space-y-2 text-sm">
              <p className="text-theme-muted font-mono text-[11px] uppercase tracking-[0.2em]">
                Quick facts
              </p>
              <p className="text-theme inline-flex items-center gap-2">
                <Icon.Pin size={14} className="text-accent" /> Based in{' '}
                {profile.availability.baseLocation}
              </p>
              <p className="text-theme-muted text-xs ml-6 leading-snug">
                {profile.availability.localModes.join(' · ')} in{' '}
                {profile.availability.baseLocation}
                {profile.availability.remoteOnlyElsewhere ? ' · Remote-only elsewhere' : ''}
              </p>
              <p className="text-theme inline-flex items-center gap-2">
                <Icon.Graduate size={14} className="text-accent" /> {profile.education.degree}
              </p>
              <p className="text-theme-muted text-xs ml-6">
                {profile.education.institute} · {profile.education.period}
              </p>
              <p className="text-theme inline-flex items-center gap-2">
                <Icon.Trophy size={14} className="text-accent" /> {profile.certification}
              </p>
            </div>
          </div>

          <div className="min-w-0 space-y-8">
            <div>
              <h3 className="text-theme font-semibold mb-4 inline-flex items-center gap-2">
                <Icon.Sparkle size={16} className="text-accent" /> Focus areas
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {FOCUS_AREAS.map((f, i) => {
                  const IconC = Icon[f.icon]
                  return (
                    <div
                      key={f.title}
                      className="focus-card rounded-2xl border border-theme-border bg-theme-card/85 p-4 sm:p-5 opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none"
                      style={{
                        animationDelay: `${80 + i * 60}ms`,
                        animationFillMode: 'forwards',
                      }}
                    >
                      <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-accent/15 text-accent-light mb-3">
                        <IconC size={18} />
                      </div>
                      <p className="text-theme font-semibold mb-1.5">{f.title}</p>
                      <p className="text-theme-muted text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-theme font-semibold mb-4 inline-flex items-center gap-2">
                <Icon.Pulse size={16} className="text-accent" /> Currently learning
              </h3>
              <p className="text-theme-muted text-sm leading-relaxed mb-4 max-w-2xl">
                I&apos;m part of AI projects at work, but I&apos;m still actively levelling up in
                these areas — be honest with me about what a role expects and I&apos;ll be upfront
                about where I&apos;m strong vs. learning.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                {profile.learning.map((track, i) => (
                  <div
                    key={track.area}
                    className="focus-card rounded-2xl border border-theme-border bg-theme-card/80 p-4 opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none"
                    style={{
                      animationDelay: `${100 + i * 50}ms`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    <p className="text-theme font-semibold inline-flex items-center gap-2 mb-1.5">
                      <span className="text-accent-light text-[11px] font-mono">[learning]</span>
                      {track.area}
                    </p>
                    <p className="text-theme-muted text-sm leading-relaxed">{track.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-theme font-semibold mb-4 inline-flex items-center gap-2">
                <Icon.Stack size={16} className="text-accent" /> Tech stack
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {SKILL_GROUPS.map((group, i) => {
                  const IconC = Icon[group.icon]
                  return (
                    <div
                      key={group.label}
                      className="opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none"
                      style={{
                        animationDelay: `${120 + i * 45}ms`,
                        animationFillMode: 'forwards',
                      }}
                    >
                      <Card as="div" padding="md" liquid>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-accent/15 text-accent shrink-0">
                            <IconC size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-theme font-semibold leading-tight">{group.label}</p>
                            <p className="text-theme-muted text-[11px] font-mono mt-0.5">
                              {group.caption}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {profile.skills[group.key].map((s) => (
                            <span
                              key={s}
                              className="skill-chip text-[11px] sm:text-xs px-2 py-1 rounded-lg border border-theme-border bg-theme-strong/40 text-theme-muted font-mono"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
