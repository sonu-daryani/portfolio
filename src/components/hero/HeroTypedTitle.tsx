'use client'

import { memo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useTypewriter } from '../../hooks/useTypewriter'

interface HeroTypedTitleProps {
  phrases: string[]
  variants: Variants
}

/**
 * Typewriter state is isolated here so parent Hero does not re-render on every
 * character tick (~18/s), which was forcing the whole page subtree to reconcile.
 */
export const HeroTypedTitle = memo(function HeroTypedTitle({
  phrases,
  variants,
}: HeroTypedTitleProps) {
  const typedTitle = useTypewriter(phrases.length ? phrases : [''])

  return (
    <motion.p
      className="text-lg sm:text-xl md:text-2xl text-theme-muted font-medium mb-3 sm:mb-4 max-w-2xl"
      variants={variants}
    >
      <span className="text-theme">{typedTitle}</span>
      <span className="typed-cursor" aria-hidden>
        |
      </span>
    </motion.p>
  )
})
