import { forwardRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

type CardElement = 'div' | 'article' | 'section' | 'a' | 'button'

export interface CardProps {
  as?: CardElement
  className?: string
  /** Interactive hover state (border glow, shadow) */
  interactive?: boolean
  /** Padding scale */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Extra rounded for more liquid feel */
  liquid?: boolean
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
  children?: ReactNode
  onClick?: () => void
  /** Framer motion variants / initial / animate for entrance */
  initial?: object
  animate?: object
  whileInView?: object
  viewport?: { once?: boolean; margin?: string }
  transition?: { duration?: number; delay?: number }
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

const baseClasses =
  'relative overflow-hidden rounded-2xl bg-theme-card/80 backdrop-blur-xl transition-all duration-300 ease-out'

const interactiveClasses =
  'hover:bg-theme-card/95'

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
    initial,
    animate,
    whileInView,
    viewport,
    transition,
    ...rest
  },
  ref
) {
  const classes = cn(
    baseClasses,
    liquid && 'rounded-[1.25rem] sm:rounded-[1.5rem]',
    paddingMap[padding],
    interactive && interactiveClasses,
    className
  )

  const style = {
    background: 'linear-gradient(160deg, var(--theme-card) 0%, rgba(255,255,255,0.02) 100%)',
  }

  const motionProps = {
    initial,
    animate,
    whileInView,
    viewport,
    transition,
    ...(interactive && {
      whileHover: { scale: 1.01, transition: { duration: 0.2 } },
      whileTap: { scale: 0.99, transition: { duration: 0.1 } },
    }),
  }

  const content = (
    <>
      <span className="relative z-10 flex flex-col flex-1 min-h-0">{children}</span>
    </>
  )

  if (Component === 'a' && href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={classes}
        style={style}
        {...motionProps}
        {...rest}
      >
        {content}
      </motion.a>
    )
  }

  if (Component === 'button') {
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        onClick={onClick}
        className={classes}
        style={style}
        {...motionProps}
        {...rest}
      >
        {content}
      </motion.button>
    )
  }

  const MotionEl = motion[Component as 'div' | 'article' | 'section']
  return (
    <MotionEl
      ref={ref}
      className={classes}
      style={style}
      {...motionProps}
      {...rest}
    >
      {content}
    </MotionEl>
  )
})

export default Card
