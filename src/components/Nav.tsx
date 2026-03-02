import { motion } from 'framer-motion'
import type { SectionId } from '../App'

interface SectionItem {
  id: SectionId
  label: string
}

interface NavProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  activeSection: SectionId
  onNavigate: (id: SectionId) => void
  sections: SectionItem[]
}

export default function Nav({ menuOpen, setMenuOpen, activeSection, onNavigate, sections }: NavProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 py-3 px-4 sm:py-4 sm:px-6 md:px-12"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between rounded-xl sm:rounded-2xl py-2.5 px-3 sm:py-3 sm:px-5 bg-theme-strong/80 dark:bg-theme-strong/60 backdrop-blur-xl shadow-lg">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-lg font-bold tracking-tight text-theme hover:text-accent transition-colors"
        >
          SD
        </button>
        <ul className="hidden md:flex items-center gap-1">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onNavigate(id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === id
                    ? 'text-accent bg-accent/10'
                    : 'text-theme-muted hover:text-theme hover:bg-theme-card'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="md:hidden w-10 h-10 rounded-xl flex flex-col justify-center gap-1.5 hover:bg-theme-card transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-theme rounded-full transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-theme rounded-full transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-theme rounded-full transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>
    </motion.header>
  )
}
