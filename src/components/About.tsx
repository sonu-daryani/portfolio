import { motion } from 'framer-motion'
import type { Profile } from '../types/profile'
import Card from './ui/Card'

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
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
      <motion.div
        className="max-w-5xl mx-auto w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-theme tracking-tight">About me</h2>
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
          <div className="flex-1">
            <p className="text-theme-muted leading-relaxed mb-6 text-lg">{profile.about}</p>
            <p className="text-theme-muted text-sm font-mono mb-8">{profile.location}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((group, i) => (
                <Card
                  key={group.label}
                  as="div"
                  padding="md"
                  liquid
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h3 className="text-accent font-mono text-xs uppercase tracking-wider mb-2">{group.label}</h3>
                  <p className="text-theme-muted text-sm leading-relaxed">{profile.skills[group.key].join(' · ')}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
