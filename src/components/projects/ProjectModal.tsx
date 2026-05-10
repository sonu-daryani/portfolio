'use client'

import type { Profile } from '../../types/profile'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { Icon } from '../ui/Icon'

type Project = Profile['projects'][number]

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Modal isOpen={!!project} onClose={onClose} title={project?.name}>
      {project ? (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-theme-border bg-theme-strong/10">
            <img
              src={project.previewImage}
              alt={`${project.name} preview`}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-accent text-xs font-mono">{project.date}</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-theme mt-1">
                {project.name}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-theme-muted hover:text-theme"
              aria-label="Close project details"
              onClick={onClose}
            >
              <Icon.Close size={20} />
            </Button>
          </div>

          <p className="text-theme-muted leading-relaxed">
            {project.detailedDescription ?? project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="project-tech-tag px-2.5 py-1 rounded-xl bg-accent/15 text-accent-light text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <Button
              as="a"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              liquid
            >
              <span className="inline-flex items-center gap-2">
                Visit Project <Icon.ArrowUpRight size={14} />
              </span>
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
