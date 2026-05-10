'use client'

import { forwardRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

type CardElement = 'div' | 'article' | 'section' | 'a' | 'button'

export interface CardProps {
  as?: CardElement
  className?: string
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  liquid?: boolean
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
  children?: ReactNode
  onClick?: () => void
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

const baseClasses =
  'relative overflow-hidden rounded-2xl bg-theme-card/90 dark:bg-theme-card/95 transition-all duration-300 ease-out'

const interactiveClasses =
  'hover:bg-theme-card/95 motion-safe:hover:scale-[1.01] motion-safe:active:scale-[0.99] transition-transform duration-200'

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    as: Component = 'div',
    className,
    interactive = false,
    padding = 'md',
    liquid = false,
    children,
    href,
    target,
    rel,
    type,
    onClick,
    ...rest
  },
  ref,
) {
  const classes = cn(
    baseClasses,
    liquid && 'rounded-[1.25rem] sm:rounded-[1.5rem]',
    paddingMap[padding],
    interactive && interactiveClasses,
    className,
  )

  const style = {
    background: 'linear-gradient(160deg, var(--theme-card) 0%, rgba(255,255,255,0.02) 100%)',
  }

  const content = (
    <>
      <span className="relative z-10 flex flex-col flex-1 min-h-0">{children}</span>
    </>
  )

  if (Component === 'a' && href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        style={style}
        {...rest}
      >
        {content}
      </a>
    )
  }

  if (Component === 'button') {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        onClick={onClick}
        className={classes}
        style={style}
        {...rest}
      >
        {content}
      </button>
    )
  }

  const El = Component as 'div' | 'article' | 'section'
  return (
    <El ref={ref as React.Ref<HTMLDivElement>} className={classes} style={style} {...rest}>
      {content}
    </El>
  )
})

export default Card
