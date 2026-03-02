import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="theme-toggle relative w-11 h-6 rounded-full bg-theme-muted/20 dark:bg-theme-card border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors shrink-0"
    >

      {/* Thumb */}
      <motion.span
        className="absolute top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-200 shadow-md pointer-events-none"
        initial={false}
        animate={{
          left: isDark ? '24px' : '4px',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        aria-hidden
      />
    </button>
  )
}
