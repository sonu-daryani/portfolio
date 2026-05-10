'use client'

import { motion } from 'framer-motion'
import type { Profile } from '../../types/profile'
import Card from '../ui/Card'
import { Icon } from '../ui/Icon'

type Project = Profile['projects'][number]

interface ProjectCardProps {
  project: Project
  index: number
  isAI: boolean
  onSelect: (project: Project) => void
}

export default function ProjectCard({ project, index, isAI, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
    >
      <Card
        as="button"
        padding="none"
        interactive
        liquid
        className="block w-full text-left group h-full overflow-hidden"
        onClick={() => onSelect(project)}
      >
        <div className="relative">
          <div className="overflow-hidden bg-theme-strong/10">
            <img
              src={project.previewImage}
              alt={`${project.name} preview`}
              className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          {isAI ? (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/90 text-on-accent text-[11px] font-mono shadow-md backdrop-blur">
              <Icon.Sparkle size={12} /> AI
            </span>
          ) : null}
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/55 text-white/90 text-[10px] font-mono">
            {project.date}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-theme group-hover:text-accent transition-colors mb-2">
            {project.name}
          </h3>
          <p className="text-theme-muted text-sm leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
          <TechTags tech={project.tech} />
          <span className="inline-flex items-center gap-1 text-xs text-accent font-mono">
            View case study <Icon.ArrowUpRight size={12} />
          </span>
        </div>
      </Card>
    </motion.div>
  )
}

function TechTags({ tech }: { tech: string[] }) {
  const visible = tech.slice(0, 4)
  const overflow = tech.length - visible.length

  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {visible.map((t) => (
        <span
          key={t}
          className="project-tech-tag px-2 py-0.5 rounded-md bg-accent/12 text-accent-light text-[11px] font-mono"
        >
          {t}
        </span>
      ))}
      {overflow > 0 ? (
        <span className="px-2 py-0.5 rounded-md bg-theme-card/60 text-theme-muted text-[11px] font-mono">
          +{overflow}
        </span>
      ) : null}
    </div>
  )
}
