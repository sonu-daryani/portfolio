import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Profile } from '../types/profile'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ProjectsProps {
  profile: Profile
}

export default function Projects({ profile }: ProjectsProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-theme mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: '.projects-prev',
            nextEl: '.projects-next',
          }}
          pagination={{
            clickable: true,
            el: '.projects-pagination',
          }}
          className="!overflow-visible"
        >
          {profile.projects.map((project) => (
            <SwiperSlide key={project.name}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-accent/40 hover:bg-white/10 transition-all group h-full min-h-[280px] flex flex-col"
              >
                <span className="text-accent font-mono text-xs">{project.date}</span>
                <h3 className="text-lg font-semibold text-theme mt-2 mb-3 group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-theme-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded bg-accent/20 text-accent-light text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            className="projects-prev w-12 h-12 rounded-full border border-theme-muted/50 text-theme hover:border-accent hover:text-accent flex items-center justify-center transition-colors disabled:opacity-40"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="projects-pagination flex gap-1" />
          <button
            type="button"
            className="projects-next w-12 h-12 rounded-full border border-theme-muted/50 text-theme hover:border-accent hover:text-accent flex items-center justify-center transition-colors disabled:opacity-40"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <motion.div
          className="mt-12 rounded-2xl bg-white/5 border border-white/10 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-theme font-semibold mb-4">Achievements</h3>
          <ul className="grid sm:grid-cols-2 gap-2 text-theme-muted text-sm">
            {profile.achievements.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">★</span>
                {a}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
