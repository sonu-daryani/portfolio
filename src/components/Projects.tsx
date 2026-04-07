import { motion } from 'framer-motion'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Profile } from '../types/profile'
import Card from './ui/Card'
import Button from './ui/Button'
import Modal from './ui/Modal'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ProjectsProps {
  profile: Profile
}

export default function Projects({ profile }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Profile['projects'][number] | null>(null)

  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto w-full min-w-0">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme mb-6 sm:mb-10 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 32 },
            900: { slidesPerView: 2, spaceBetween: 36 },
            1280: { slidesPerView: 2, spaceBetween: 40 },
          }}
          navigation={{
            prevEl: '.projects-prev',
            nextEl: '.projects-next',
          }}
          pagination={{
            clickable: true,
            el: '.projects-pagination',
          }}
          className="projects-swiper h-[500px] sm:h-[540px] md:h-[560px] py-6 px-4 sm:px-6 md:px-8"
        >
          {profile.projects.map((project) => (
            <SwiperSlide key={project.name}>
              <Card
                as="button"
                padding="lg"
                interactive
                liquid
                className="block w-full text-left group h-full min-h-0 flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-theme/10 bg-theme-strong/10">
                  <img
                    src={project.previewImage}
                    alt={`${project.name} preview`}
                    className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <span className="text-accent font-mono text-xs">{project.date}</span>
                <h3 className="text-lg font-semibold text-theme mt-2 mb-3 group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <details
                  className="mb-4 rounded-lg border border-theme/10 bg-theme-strong/5 px-3 py-2 group/details"
                  onClick={(event) => event.stopPropagation()}
                >
                  <summary className="cursor-pointer text-sm text-theme-muted list-none flex items-center justify-between gap-3">
                    <span>Description</span>
                    <svg
                      className="w-4 h-4 text-accent transition-transform group-open/details:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-theme-muted text-sm leading-relaxed mt-2 line-clamp-2 group-open/details:line-clamp-none">
                    {project.detailedDescription ?? project.description}
                  </p>
                </details>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="project-tech-tag px-2.5 py-1 rounded-xl bg-accent/15 text-accent-light text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-theme-muted mt-4">Click to expand</span>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="secondary"
            size="icon"
            liquid
            className="projects-prev text-theme hover:text-accent disabled:opacity-40"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="projects-pagination flex gap-1" />
          <Button
            variant="secondary"
            size="icon"
            liquid
            className="projects-next text-theme hover:text-accent disabled:opacity-40"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
        <Card
          as="div"
          padding="lg"
          liquid
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-theme font-semibold mb-4 tracking-tight">Achievements</h3>
          <ul className="grid sm:grid-cols-2 gap-2 text-theme-muted text-sm">
            {profile.achievements.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">★</span>
                {a}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name}
      >
        {selectedProject ? (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-theme/10 bg-theme-strong/10">
              <img
                src={selectedProject.previewImage}
                alt={`${selectedProject.name} preview`}
                className="w-full h-52 sm:h-64 object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-accent text-xs font-mono">{selectedProject.date}</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-theme mt-1">
                  {selectedProject.name}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-theme-muted hover:text-theme"
                aria-label="Close project details"
                onClick={() => setSelectedProject(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            <details className="rounded-xl border border-theme/10 bg-theme-strong/5 px-4 py-3 group/details" open>
              <summary className="cursor-pointer text-sm font-medium text-theme list-none flex items-center justify-between gap-3">
                <span>Project Description</span>
                <svg
                  className="w-4 h-4 text-accent transition-transform group-open/details:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-theme-muted leading-relaxed mt-3 line-clamp-2 group-open/details:line-clamp-none">
                {selectedProject.detailedDescription ?? selectedProject.description}
              </p>
            </details>

            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((tech) => (
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
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                liquid
              >
                Visit Project
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
