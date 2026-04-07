import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Profile } from '../types/profile'
import Card from './ui/Card'
import Button from './ui/Button'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ExperienceProps {
  profile: Profile
}

export default function Experience({ profile }: ExperienceProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto w-full min-w-0">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme mb-6 sm:mb-10 tracking-tight"
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
          className="experience-swiper h-[500px] sm:h-[540px] md:h-[560px]"
        >
          {profile.experience.map((job) => (
            <SwiperSlide key={job.company}>
              <Card
                as="article"
                padding="lg"
                interactive
                liquid
                className="h-full min-h-0 flex flex-col"
              >
                {job.previewImage ? (
                  <div className="mb-4 overflow-hidden rounded-xl border border-theme/10 bg-theme-strong/10">
                    <img
                      src={job.previewImage}
                      alt={`${job.company} website preview`}
                      className="w-full h-52 sm:h-56 object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}
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
                {job.website ? (
                  <div className="pt-4">
                    <Button
                      as="a"
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      liquid
                    >
                      Visit Website
                    </Button>
                  </div>
                ) : null}
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="secondary"
            size="icon"
            liquid
            className="experience-prev text-theme hover:text-accent disabled:opacity-40"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="experience-pagination flex gap-1" />
          <Button
            variant="secondary"
            size="icon"
            liquid
            className="experience-next text-theme hover:text-accent disabled:opacity-40"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  )
}
