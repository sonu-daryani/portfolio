import { motion } from 'framer-motion'
import type { Profile } from '../types/profile'

interface ContactProps {
  profile: Profile
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-theme mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in touch
        </motion.h2>
        <motion.p
          className="text-theme-muted mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Open to new opportunities. Let's build something great together.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:text-accent transition-colors"
          >
            <span className="font-mono text-sm">Email</span>
            <span className="text-theme">{profile.email}</span>
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:text-accent transition-colors"
          >
            <span className="font-mono text-sm">Phone</span>
            <span className="text-theme">{profile.phone}</span>
          </a>
        </motion.div>
        <motion.div
          className="mt-10 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href={profile.links.winity}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-muted hover:text-accent transition-colors"
            aria-label="Winity"
          >
            winity.life
          </a>
        </motion.div>
      </div>
    </section>
  )
}
