'use client'

import { memo } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter'

interface HeroTypedTitleProps {
  phrases: string[]
  /** Tailwind delay-* class for stagger (e.g. delay-200) */
  delayClass?: string
}

export const HeroTypedTitle = memo(function HeroTypedTitle({
  phrases,
  delayClass = 'delay-200',
}: HeroTypedTitleProps) {
  const typedTitle = useTypewriter(phrases.length ? phrases : [''])

  return (
    <p
      className={`text-lg sm:text-xl md:text-2xl text-theme-muted font-medium mb-3 sm:mb-4 max-w-2xl opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none ${delayClass}`}
    >
      <span className="text-theme">{typedTitle}</span>
      <span className="typed-cursor" aria-hidden>
        |
      </span>
    </p>
  )
})
