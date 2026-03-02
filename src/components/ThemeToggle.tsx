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
      className="theme-toggle group relative h-7 w-14 rounded-full border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-all duration-200 shrink-0 overflow-hidden"
    >
      {/* Track background */}
      <span
        className="absolute inset-0 rounded-full theme-toggle-track transition-colors duration-200"
        aria-hidden
      />
      {/* Thumb */}
      <motion.span
        className="absolute top-1 w-5 h-5 rounded-full theme-toggle-thumb pointer-events-none flex items-center justify-center"
        initial={false}
        animate={{
          left: isDark ? 'calc(100% - 22px)' : '6px',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        aria-hidden
      >
        {isDark ? (
          <svg className="w-3 h-3 text-slate-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
        ) : (
          <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0-7a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 14a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm7-7a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm-14 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm12.07-3.5l1.42-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.42a1 1 0 1 1-1.42-1.42zM6.93 17.07l-1.42 1.42a1 1 0 1 1-1.42-1.42l1.42-1.42a1 1 0 1 1 1.42 1.42zm12.14 0l-1.42-1.42a1 1 0 1 1 1.42-1.42l1.42 1.42a1 1 0 1 1-1.42 1.42zM6.93 6.93L5.51 5.51a1 1 0 0 1 1.42-1.42l1.42 1.42a1 1 0 1 1-1.42 1.42z"/></svg>
        )}
      </motion.span>
    </button>
  )
}
