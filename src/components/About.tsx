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
        <h2 className="text-3xl md:text-4xl font-bold text-theme tracking-tight mb-10 sm:mb-12">
          About me
        </h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 lg:gap-14 xl:gap-16">
          <motion.div
            className="flex-shrink-0 w-full max-w-[240px] sm:max-w-[260px] lg:max-w-[280px]"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full aspect-square object-cover rounded-[1.25rem] sm:rounded-[1.5rem] shadow-lg"
            />
          </motion.div>
          <div className="flex-1 min-w-0 w-full">
            <p className="text-theme-muted leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
              {profile.about}
            </p>
            <p className="text-theme-muted text-sm font-mono mb-6 sm:mb-8">
              {profile.location}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              <a
                href={profile.links.intalent}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm font-medium"
              >
                intalent.ai →
              </a>
              <a
                href={profile.links.unlocklife}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm font-medium"
              >
                UnlockLife →
              </a>
              <a
                href={profile.links.winity}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm font-medium"
              >
                winity.life →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  <h3 className="text-accent font-mono text-xs uppercase tracking-wider mb-2">
                    {group.label}
                  </h3>
                  <p className="text-theme-muted text-sm leading-relaxed">
                    {profile.skills[group.key].join(' · ')}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
