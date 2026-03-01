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
      className="fixed top-0 left-0 right-0 z-40 py-4 px-6 md:px-12"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-lg font-bold text-theme hover:text-accent transition-colors"
        >
          SD
        </button>
        <ul className="hidden md:flex items-center gap-8">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => onNavigate(id)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === id ? 'text-accent' : 'text-theme-muted hover:text-accent'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-theme transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-theme transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-theme transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>
    </motion.header>
  )
}
