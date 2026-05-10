'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import Nav from './Nav'
import Footer from './Footer'
import Button from './ui/Button'

export interface SectionItem {
  to: string
  label: string
}

export const SECTIONS: SectionItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <div
        className={`fixed inset-0 z-0 canvas-bg ${
          theme === 'light' ? 'canvas-bg-light' : 'canvas-bg-dark'
        }`}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col h-screen max-h-screen overflow-hidden">
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} sections={SECTIONS} />

        <main className="flex-1 min-h-0 main-scroll pt-16 sm:pt-20 pb-20 sm:pb-24 px-0">
          <div
            key={pathname}
            className="min-h-full opacity-0 motion-safe:animate-page-in motion-reduce:opacity-100 motion-reduce:animate-none"
          >
            {children}
          </div>
        </main>

        <Footer />
      </div>

      {menuOpen ? (
        <div
          className="mobile-menu-overlay fixed inset-0 z-50 bg-black/75 dark:bg-black/85 flex items-center justify-center motion-safe:animate-fade-in motion-reduce:animate-none"
          role="presentation"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="flex flex-col gap-2 text-center opacity-0 motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:animate-none"
            onClick={(e) => e.stopPropagation()}
          >
            {SECTIONS.map(({ to, label }) => (
              <Button
                key={to}
                variant="ghost"
                size="lg"
                liquid
                className="text-2xl font-semibold !py-3 !px-6"
                active={pathname === to}
                onClick={() => {
                  setMenuOpen(false)
                  router.push(to)
                }}
              >
                {label}
              </Button>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  )
}
