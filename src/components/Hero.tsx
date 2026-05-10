'use client'

import { useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Profile } from '../types/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import HeroAside from './hero/HeroAside'
import HeroAvailability from './hero/HeroAvailability'
import HeroBadges from './hero/HeroBadges'
import HeroCTAs from './hero/HeroCTAs'
import HeroStats from './hero/HeroStats'

interface HeroProps {
  profile: Profile
}

const STAGGER = 0.08
const FADE_DURATION = 0.5

export default function Hero({ profile }: HeroProps) {
  const titles = useMemo(
    () =>
      profile.title
        .split('|')
        .map((t) => t.trim())
        .filter(Boolean),
    [profile.title],
  )
  const typedTitle = useTypewriter(titles.length ? titles : [profile.title])

  // Subtle 3D tilt that follows the cursor over the hero card.
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), spring)
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), spring)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const resetTilt = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <section className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={cardRef}
          className="grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] items-start gap-10 sm:gap-12 lg:gap-14"
          style={{
            perspective: 1000,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: STAGGER, delayChildren: 0.05 } },
            hidden: {},
          }}
        >
          <div
            className="flex-1 min-w-0 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1"
            style={{ transform: 'translateZ(16px)' }}
          >
            <HeroBadges />

            <motion.p
              className="text-accent font-mono text-sm sm:text-base tracking-wide mb-2"
              variants={fadeUp}
            >
              {'<'} Hi, I&apos;m {' />'}
            </motion.p>

            <motion.h1
              className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-3"
              variants={titleReveal}
            >
              {profile.name}
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-theme-muted font-medium mb-3 sm:mb-4 max-w-2xl"
              variants={fadeUp}
            >
              <span className="text-theme">{typedTitle}</span>
              <span className="typed-cursor" aria-hidden>
                |
              </span>
            </motion.p>

            <motion.p
              className="text-theme-muted text-sm sm:text-base mb-7 sm:mb-9 max-w-xl leading-relaxed"
              variants={fadeUp}
            >
              I ship <span className="text-theme font-medium">multi-tenant SaaS</span> with
              Next.js, NestJS, and Azure — currently leading frontend for an AI recruitment
              platform, and going deep on GenAI, system design, and cloud as I grow.
            </motion.p>

            <HeroCTAs github={profile.links.github} linkedin={profile.links.linkedin} />

            <HeroStats />

            <HeroAvailability availability={profile.availability} />
          </div>

          <HeroAside imageSrc={profile.image} name={profile.name} />
        </motion.div>
      </div>
    </section>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: FADE_DURATION } },
}

const titleReveal = {
  hidden: { opacity: 0, y: 20, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: FADE_DURATION, ease: [0.22, 0.61, 0.36, 1] as const },
  },
}
