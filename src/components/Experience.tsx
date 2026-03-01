import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Profile } from '../types/profile'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ExperienceProps {
  profile: Profile
}

export default function Experience({ profile }: ExperienceProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-theme mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Experience
        </motion.h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.experience-prev',
            nextEl: '.experience-next',
          }}
          pagination={{
            clickable: true,
            el: '.experience-pagination',
          }}
          className="!overflow-visible"
        >
          {profile.experience.map((job) => (
            <SwiperSlide key={job.company}>
              <article className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 hover:border-accent/30 transition-colors h-full min-h-[320px] flex flex-col">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                  <h3 className="text-xl font-semibold text-theme">{job.role}</h3>
                  <span className="text-theme-muted text-sm font-mono">{job.period}</span>
                </div>
                <p className="text-accent font-medium mb-4">
                  {job.company} <span className="text-theme-muted font-normal">· {job.location}</span>
                </p>
                <ul className="space-y-2 text-theme-muted text-sm flex-1">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-accent mt-1">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            className="experience-prev w-12 h-12 rounded-full border border-theme-muted/50 text-theme hover:border-accent hover:text-accent flex items-center justify-center transition-colors disabled:opacity-40"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="experience-pagination flex gap-1" />
          <button
            type="button"
            className="experience-next w-12 h-12 rounded-full border border-theme-muted/50 text-theme hover:border-accent hover:text-accent flex items-center justify-center transition-colors disabled:opacity-40"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
