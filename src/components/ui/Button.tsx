import { forwardRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Extra rounded for liquid feel (matches Card) */
  liquid?: boolean
  as?: 'button' | 'a'
  href?: string
  download?: boolean | string
  target?: string
  rel?: string
  type?: 'button' | 'submit'
  active?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
  onClick?: () => void
  'aria-label'?: string
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2.5 text-sm sm:text-base min-h-[40px] sm:min-h-[44px]',
  lg: 'px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base min-h-[44px] sm:min-h-[48px]',
  icon: 'w-10 h-10 sm:w-12 sm:h-12 p-0 min-h-0 flex items-center justify-center',
}

const variantBase = 'rounded-2xl font-semibold transition-all duration-300 ease-out select-none touch-manipulation inline-flex items-center justify-center'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'text-white btn-primary border-0',
  secondary:
    'text-theme btn-liquid border-0 card-shadow-hover',
  ghost:
    'bg-transparent text-theme hover:bg-theme-card/80 text-theme-muted hover:text-theme',
}

const activeClasses = 'text-accent bg-accent/10'

const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(function Button(
  {
    variant = 'secondary',
    size = 'md',
    liquid = false,
    as: Component = 'button',
    href,
    download,
    target,
    rel,
    type = 'button',
    active = false,
    disabled = false,
    className,
    children,
    onClick,
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const classes = cn(
    variantBase,
    sizeClasses[size],
    variantClasses[variant],
    liquid && 'rounded-[1.25rem] sm:rounded-[1.5rem]',
    active && variant === 'ghost' && activeClasses,
    disabled && 'opacity-40 pointer-events-none',
    className
  )

  const motionProps = {
    className: classes,
    whileHover: variant !== 'ghost' ? { scale: 1.02, transition: { duration: 0.2 } } : undefined,
    whileTap: variant !== 'ghost' ? { scale: 0.98, transition: { duration: 0.1 } } : undefined,
  }

  if (Component === 'a' && href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        {...motionProps}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  )
})

export default Button
