import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useTheme } from './context/ThemeContext'
import { profile } from './data/profile'
import Scene3D from './components/Scene3D'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Button from './components/ui/Button'

export type SectionId = 'home' | 'about' | 'experience' | 'projects' | 'contact'

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const { theme } = useTheme()

  const goTo = (id: SectionId) => {
    setActiveSection(id)
    setMenuOpen(false)
  }

  return (
    <>
      <div className={`fixed inset-0 z-0 canvas-bg ${theme === 'light' ? 'canvas-bg-light' : 'canvas-bg-dark'}`}>
        <Canvas
          key={theme}
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ alpha: false, antialias: true }}
          dpr={[1, 2]}
        >
          <Scene3D theme={theme} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-h-screen overflow-hidden">
        <Nav
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          activeSection={activeSection}
          onNavigate={goTo}
          sections={SECTIONS}
        />

        <main className="flex-1 min-h-0 main-scroll pt-16 sm:pt-20 pb-20 sm:pb-24 px-0">
          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="min-h-full"
              >
                <Hero profile={profile} onNavigateContact={() => goTo('contact')} />
              </motion.div>
            )}
            {activeSection === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="min-h-full"
              >
                <About profile={profile} />
              </motion.div>
            )}
            {activeSection === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="min-h-full"
              >
                <Experience profile={profile} />
              </motion.div>
            )}
            {activeSection === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="min-h-full"
              >
                <Projects profile={profile} />
              </motion.div>
            )}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="min-h-full"
              >
                <Contact profile={profile} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer profile={profile} />
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
              {SECTIONS.map(({ id, label }) => (
                <Button
                  key={id}
                  variant="ghost"
                  size="lg"
                  liquid
                  className="text-2xl font-semibold !py-3 !px-6"
                  onClick={() => goTo(id)}
                >
                  {label}
                </Button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
