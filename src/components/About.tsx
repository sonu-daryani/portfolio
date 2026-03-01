import { motion } from 'framer-motion'
import type { Profile } from '../types/profile'

interface AboutProps {
  profile: Profile
}

const SKILL_GROUPS: { label: string; key: keyof Profile['skills'] }[] = [
  { label: 'Languages', key: 'languages' },
  { label: 'Frameworks', key: 'frameworks' },
  { label: 'Backend & Data', key: 'backend' },
  { label: 'Cloud & DevOps', key: 'cloud' },
  { label: 'Tools', key: 'tools' },
]

export default function About({ profile }: AboutProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-theme mb-12">About me</h2>
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-56 h-56 md:w-72 md:h-72 rounded-2xl object-cover shadow-2xl border-2 border-accent/30"
            />
          </motion.div>
          <div className="flex-1">
            <p className="text-theme-muted leading-relaxed mb-6">{profile.about}</p>
            <p className="text-theme-muted text-sm font-mono mb-8">{profile.location}</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href={profile.links.intalent} target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent text-sm font-medium">
                intalent.ai →
              </a>
              <a href={profile.links.unlocklife} target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent text-sm font-medium">
                UnlockLife →
              </a>
              <a href={profile.links.winity} target="_blank" rel="noopener noreferrer" className="text-accent-light hover:text-accent text-sm font-medium">
                winity.life →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((group, i) => (
                <motion.div
                  key={group.label}
                  className="rounded-xl bg-white/5 border border-white/10 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h3 className="text-accent font-mono text-xs uppercase tracking-wider mb-2">{group.label}</h3>
                  <p className="text-theme-muted text-sm">{profile.skills[group.key].join(' · ')}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
