'use client'

import type { CSSProperties } from 'react'
import { useMemo, useRef, useCallback, useEffect, useState } from 'react'
import type { Profile } from '../types/profile'
import { usePointerFine } from '../hooks/usePointerFine'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { HeroTypedTitle } from './hero/HeroTypedTitle'
import HeroAside from './hero/HeroAside'
import HeroAvailability from './hero/HeroAvailability'
import HeroBadges from './hero/HeroBadges'
import HeroCTAs from './hero/HeroCTAs'
import HeroStats from './hero/HeroStats'

interface HeroProps {
  profile: Profile
}

export default function Hero({ profile }: HeroProps) {
  const titles = useMemo(
    () =>
      profile.title
        .split('|')
        .map((t) => t.trim())
        .filter(Boolean),
    [profile.title],
  )
  const titlePhrases = useMemo(
    () => (titles.length ? titles : [profile.title]),
    [titles, profile.title],
  )

  const reducedMotion = usePrefersReducedMotion()
  const pointerFine = usePointerFine()
  const tiltEnabled = !reducedMotion && pointerFine

  const cardRef = useRef<HTMLDivElement>(null)
  const tiltRaf = useRef<number | null>(null)
  const pendingMove = useRef<{ cx: number; cy: number } | null>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const applyPointer = useCallback(() => {
    tiltRaf.current = null
    const move = pendingMove.current
    pendingMove.current = null
    const rect = cardRef.current?.getBoundingClientRect()
    if (!move || !rect) return
    const nx = (move.cx - rect.left) / rect.width - 0.5
    const ny = (move.cy - rect.top) / rect.height - 0.5
    setTilt({ rx: -ny * 12, ry: nx * 12 })
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    pendingMove.current = { cx: e.clientX, cy: e.clientY }
    if (tiltRaf.current != null) return
    tiltRaf.current = window.requestAnimationFrame(applyPointer)
  }

  const resetTilt = () => setTilt({ rx: 0, ry: 0 })

  useEffect(
    () => () => {
      if (tiltRaf.current != null) window.cancelAnimationFrame(tiltRaf.current)
    },
    [],
  )

  const tiltStyle: CSSProperties | undefined = tiltEnabled
    ? {
        perspective: 1000,
        transform:
          tilt.rx !== 0 || tilt.ry !== 0
            ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : undefined,
        transformStyle: 'preserve-3d',
      }
    : undefined

  return (
    <section className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div
          ref={cardRef}
          className="grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] items-start gap-10 sm:gap-12 lg:gap-14 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out"
          style={tiltStyle}
          onMouseMove={tiltEnabled ? handleMouseMove : undefined}
          onMouseLeave={tiltEnabled ? resetTilt : undefined}
        >
          <div
            className="flex-1 min-w-0 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1"
            style={{ transform: 'translateZ(16px)' }}
          >
            <HeroBadges />

            <p className="text-accent font-mono text-sm sm:text-base tracking-wide mb-2 opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none delay-75">
              {'<'} Hi, I&apos;m {' />'}
            </p>

            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-3 opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none delay-150">
              {profile.name}
            </h1>

            <HeroTypedTitle phrases={titlePhrases} delayClass="delay-200" />

            <p className="text-theme-muted text-sm sm:text-base mb-7 sm:mb-9 max-w-xl leading-relaxed opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none delay-300">
              I ship <span className="text-theme font-medium">multi-tenant SaaS</span> with
              Next.js, NestJS, and Azure — currently leading frontend for an AI recruitment
              platform, and going deep on GenAI, system design, and cloud as I grow.
            </p>

            <HeroCTAs github={profile.links.github} linkedin={profile.links.linkedin} />

            <HeroStats />

            <HeroAvailability availability={profile.availability} />
          </div>

          <HeroAside imageSrc={profile.image} name={profile.name} />
        </div>
      </div>
    </section>
  )
}
