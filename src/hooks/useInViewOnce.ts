'use client'

import { useEffect, useRef, useState } from 'react'

export function useInViewOnce<T extends HTMLElement = HTMLElement>(
  options?: { rootMargin?: string },
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true)
      return
    }

    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: options?.rootMargin ?? '-60px', threshold: 0.06 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, options?.rootMargin])

  return { ref, inView }
}
