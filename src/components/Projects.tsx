'use client'

import { useMemo, useState } from 'react'
import type { Profile } from '../types/profile'
import { isAIProject, uniqueTechs } from '../lib/projects'
import Section from './ui/Section'
import Card from './ui/Card'
import StatusPill from './ai/StatusPill'
import { Icon } from './ui/Icon'
import ProjectCard from './projects/ProjectCard'
import ProjectFilters, { type FilterValue } from './projects/ProjectFilters'
import ProjectModal from './projects/ProjectModal'

interface ProjectsProps {
  profile: Profile
}

type Project = Profile['projects'][number]

export default function Projects({ profile }: ProjectsProps) {
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState<FilterValue>('all')

  const techs = useMemo(() => uniqueTechs(profile.projects), [profile.projects])

  const filtered = useMemo(() => {
    if (filter === 'all') return profile.projects
    if (filter === 'ai') return profile.projects.filter(isAIProject)
    return profile.projects.filter((p) => p.tech.includes(filter))
  }, [profile.projects, filter])

  return (
    <Section width="wide">
      <div className="flex items-center gap-3 mb-3">
        <StatusPill label="projects.deploy()" tone="info" />
        <span className="text-theme-muted font-mono text-xs hidden sm:inline">
          {filtered.length} of {profile.projects.length} loaded
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme tracking-tight mb-3 opacity-0 motion-safe:animate-fade-in-up-sm motion-reduce:opacity-100 motion-reduce:animate-none">
        Selected <span className="text-accent-light">builds</span>.
      </h2>
      <p className="text-theme-muted text-base sm:text-lg mb-6 max-w-2xl">
        Production work across AI recruiting, fintech, scheduling, and commerce — shipped end
        to end.
      </p>

      <ProjectFilters techs={techs} value={filter} onChange={setFilter} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            isAI={isAIProject(project)}
            onSelect={setSelected}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-theme-muted text-sm mt-10 font-mono">
          // no matching projects — try another filter
        </p>
      ) : null}

      <Card
        as="div"
        padding="lg"
        liquid
        className="mt-12 opacity-0 motion-safe:animate-fade-in motion-reduce:opacity-100 motion-reduce:animate-none delay-200"
      >
        <h3 className="text-theme font-semibold mb-4 tracking-tight inline-flex items-center gap-2">
          <Icon.Trophy size={16} className="text-accent" /> Achievements
        </h3>
        <ul className="grid sm:grid-cols-2 gap-2 text-theme-muted text-sm">
          {profile.achievements.map((a, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-accent mt-0.5">★</span>
              {a}
            </li>
          ))}
        </ul>
      </Card>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
