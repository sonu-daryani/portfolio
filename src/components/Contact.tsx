import { motion } from 'framer-motion'
import type { Profile } from '../types/profile'
import Card from './ui/Card'
import Button from './ui/Button'

interface ContactProps {
  profile: Profile
}

export default function Contact({ profile }: ContactProps) {
  return (
    <section className="min-h-[calc(100vh-8rem)] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-2xl mx-auto w-full min-w-0 text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-theme mb-4 sm:mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in touch
        </motion.h2>
        <motion.p
          className="text-theme-muted mb-12 text-lg max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Open to new opportunities. Let's build something great together.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card
            as="a"
            href={`mailto:${profile.email}`}
            padding="md"
            interactive
            liquid
            className="flex items-center gap-3 w-full sm:w-auto sm:min-w-[240px] justify-center"
          >
            <span className="font-mono text-sm text-accent shrink-0">Email</span>
            <span className="text-theme font-medium truncate min-w-0">{profile.email}</span>
          </Card>
          <Card
            as="a"
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
            padding="md"
            interactive
            liquid
            className="flex items-center gap-3 w-full sm:w-auto sm:min-w-[240px] justify-center"
          >
            <span className="font-mono text-sm text-accent shrink-0">Phone</span>
            <span className="text-theme font-medium truncate min-w-0">{profile.phone}</span>
          </Card>
        </motion.div>
        <motion.div
          className="mt-10 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            as="a"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            aria-label="LinkedIn"
          >
            LinkedIn
          </Button>
          <Button
            as="a"
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            aria-label="GitHub"
          >
            GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
