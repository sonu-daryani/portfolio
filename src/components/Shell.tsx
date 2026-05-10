'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'
import Scene3D from './Scene3D'
import Nav from './Nav'
import Footer from './Footer'
import Button from './ui/Button'
import AILauncher from './ai/AILauncher'

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
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <div
        className={`fixed inset-0 z-0 canvas-bg ${
          theme === 'light' ? 'canvas-bg-light' : 'canvas-bg-dark'
        }`}
      >
        {mounted ? (
          <Canvas
            key={theme}
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ alpha: false, antialias: true }}
            dpr={[1, 2]}
          >
            <Scene3D theme={theme} />
          </Canvas>
        ) : null}
      </div>

      <div className="relative z-10 flex flex-col h-screen max-h-screen overflow-hidden">
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} sections={SECTIONS} />

        <main className="flex-1 min-h-0 main-scroll pt-16 sm:pt-20 pb-20 sm:pb-24 px-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay fixed inset-0 z-50 bg-theme-strong/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              className="flex flex-col gap-2 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
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
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AILauncher />
    </>
  )
}
