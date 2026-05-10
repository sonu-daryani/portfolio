import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  /** Constrain the inner column width. Defaults to a 1024px column. */
  width?: 'narrow' | 'default' | 'wide'
}

const widthClass = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
}

export default function Section({ children, className, width = 'default' }: SectionProps) {
  return (
    <section
      className={cn(
        'min-h-[calc(100vh-8rem)] flex flex-col justify-center',
        'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24',
        'py-10 sm:py-14 md:py-16',
        className,
      )}
    >
      <div className={cn('mx-auto w-full min-w-0', widthClass[width])}>{children}</div>
    </section>
  )
}
