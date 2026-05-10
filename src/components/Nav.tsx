'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { SectionItem } from './Shell'
import Button from './ui/Button'
import ThemeToggle from './ThemeToggle'
import { Icon } from './ui/Icon'

interface NavProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  sections: SectionItem[]
}

export default function Nav({ menuOpen, setMenuOpen, sections }: NavProps) {
  const pathname = usePathname()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 py-3 px-4 sm:py-4 sm:px-6 md:px-12"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav-bar max-w-6xl mx-auto flex items-center justify-between rounded-xl sm:rounded-2xl py-2.5 px-3 sm:py-3 sm:px-5 bg-theme-strong/80 dark:bg-theme-strong/60 backdrop-blur-xl shadow-lg">
        <Link
          href="/"
          aria-label="Home"
          className="brand inline-flex items-center gap-2 text-theme font-bold tracking-tight"
        >
          <span className="brand-mark inline-flex items-center justify-center h-8 w-8 rounded-xl text-white">
            <Icon.Sparkle size={16} />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm">Sonu Daryani</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-theme-muted font-mono">
              Frontend · Full Stack
            </span>
          </span>
          <span className="sm:hidden text-base">SD</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {sections.map(({ to, label }) => {
            const isActive = to === '/' ? pathname === '/' : pathname?.startsWith(to)
            return (
              <li key={to}>
                <Link
                  href={to}
                  className={`nav-link inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-accent bg-accent/10 shadow-inner'
                      : 'text-theme-muted hover:text-theme hover:bg-theme-card/80'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-btn md:hidden !rounded-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <Icon.Close size={20} /> : <Icon.Menu size={20} />}
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
