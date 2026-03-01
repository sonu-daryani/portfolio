import { motion } from 'framer-motion'
import type { Profile } from '../types/profile'

interface HeroProps {
  profile: Profile
  onNavigateContact?: () => void
}

export default function Hero({ profile, onNavigateContact }: HeroProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-accent font-mono text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, I'm
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {profile.name}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-theme-muted mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {profile.title}
        </motion.p>
        <motion.p
          className="text-theme-muted mb-10 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            type="button"
            onClick={onNavigateContact}
            className="px-6 py-3 rounded-lg bg-accent text-on-accent font-semibold hover:bg-accent-light transition-colors"
          >
            Get in touch
          </button>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-theme-muted text-theme hover:border-accent hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-theme-muted text-theme hover:border-accent hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
