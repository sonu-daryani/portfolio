import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Profile } from '../types/profile'
import Card from './ui/Card'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ProjectsProps {
  profile: Profile
}

export default function Projects({ profile }: ProjectsProps) {
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
          className="projects-swiper !overflow-visible h-[300px] sm:h-[320px] md:h-[340px]"
        >
          {profile.projects.map((project) => (
            <SwiperSlide key={project.name}>
              <Card
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                padding="lg"
                interactive
                liquid
                className="block group h-full min-h-0 flex flex-col"
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
                      className="px-2.5 py-1 rounded-xl bg-accent/15 text-accent-light text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Card
            as="button"
            className="projects-prev w-12 h-12 flex items-center justify-center text-theme hover:border-accent hover:text-accent disabled:opacity-40"
            padding="none"
            interactive
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Card>
          <div className="projects-pagination flex gap-1" />
          <Card
            as="button"
            className="projects-next w-12 h-12 flex items-center justify-center text-theme hover:border-accent hover:text-accent disabled:opacity-40"
            padding="none"
            interactive
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Card>
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
    </section>
  )
}
