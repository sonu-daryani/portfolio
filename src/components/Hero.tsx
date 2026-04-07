import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { Profile } from '../types/profile'
import Button from './ui/Button'

interface HeroProps {
  profile: Profile
  onNavigateContact?: () => void
}

const stagger = 0.08
const duration = 0.5

export default function Hero({ profile, onNavigateContact }: HeroProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), spring)
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), spring)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    x.set((e.clientX - rect.left) / w)
    y.set((e.clientY - rect.top) / h)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={cardRef}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16"
          style={{
            perspective: 1000,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
            hidden: {},
          }}
        >
          {/* Image - responsive order: first on mobile, left on desktop */}
          <motion.div
            className="flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-none lg:w-72 xl:w-80"
            style={{ transform: 'translateZ(24px)' }}
            variants={{
              hidden: { opacity: 0, y: 24, rotateY: -12 },
              visible: {
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: { duration, ease: [0.22, 0.61, 0.36, 1] },
              },
            }}
          >
            <motion.div
              className="relative overflow-hidden rounded-[1.35rem] sm:rounded-[1.5rem] bg-theme-card/30"
              style={{
                transform: 'translateZ(0)',
                boxShadow: '0 8px 32px -8px rgba(0,0,0,0.5), 0 16px 48px -16px rgba(0,0,0,0.4)',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 50px -16px rgba(0,0,0,0.55), 0 0 40px -12px rgba(167,139,250,0.2)',
                transition: { duration: 0.25 },
              }}
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full aspect-square object-cover rounded-[1.35rem] sm:rounded-[1.5rem]"
              />
              <span
                className="pointer-events-none absolute inset-0 rounded-[1.35rem] sm:rounded-[1.5rem] opacity-80"
                style={{
                  background: 'linear-gradient(160deg, transparent 30%, rgba(167,139,250,0.06) 100%)',
                }}
                aria-hidden
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div
            className="flex-1 min-w-0 text-center lg:text-left flex flex-col items-center lg:items-start"
            style={{ transform: 'translateZ(16px)' }}
          >
            <motion.p
              className="text-accent font-mono text-sm sm:text-base tracking-wide mb-2 sm:mb-3"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration } },
              }}
            >
              Hi, I'm
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-theme tracking-tight leading-[1.1] mb-2 sm:mb-4"
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration, ease: [0.22, 0.61, 0.36, 1] },
                },
              }}
            >
              {profile.name}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-theme-muted font-medium mb-3 sm:mb-4 max-w-2xl"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration } },
              }}
            >
              {profile.title}
            </motion.p>
            <motion.p
              className="text-theme-muted text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-xl leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration } },
              }}
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration, staggerChildren: 0.06, delayChildren: 0.1 },
                },
              }}
            >
              {[
                {
                  label: 'Get in touch',
                  onClick: true,
                  variant: 'primary' as const,
                },
                {
                  label: 'GitHub',
                  href: profile.links.github,
                  variant: 'secondary' as const,
                },
                {
                  label: 'LinkedIn',
                  href: profile.links.linkedin,
                  variant: 'secondary' as const,
                },
                {
                  label: 'Download CV',
                  href: '/sonu-daryani-cv.pdf',
                  variant: 'secondary' as const,
                  download: true,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  style={{ transform: 'translateZ(8px)' }}
                >
                  {item.onClick ? (
                    <Button
                      variant={item.variant}
                      size="lg"
                      liquid
                      onClick={onNavigateContact}
                    >
                      {item.label}
                    </Button>
                  ) : (
                    <Button
                      as="a"
                      href={item.href}
                      target={item.download ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      variant={item.variant}
                      size="lg"
                      liquid
                      download={item.download ? 'Sonu_Daryani_CV.pdf' : undefined}
                    >
                      {item.label}
                    </Button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
