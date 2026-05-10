'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'
import { Icon } from '../ui/Icon'

interface HeroCTAsProps {
  github: string
  linkedin: string
}

export default function HeroCTAs({ github, linkedin }: HeroCTAsProps) {
  const router = useRouter()

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, staggerChildren: 0.06, delayChildren: 0.1 },
        },
      }}
    >
      <Button variant="primary" size="lg" liquid onClick={() => router.push('/contact')}>
        <span className="inline-flex items-center gap-2">
          Hire me <Icon.ArrowRight size={16} />
        </span>
      </Button>

      <Button
        as="a"
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size="lg"
        liquid
      >
        <span className="inline-flex items-center gap-2">
          <Icon.Github size={16} /> GitHub
        </span>
      </Button>
      <Button
        as="a"
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size="lg"
        liquid
      >
        <span className="inline-flex items-center gap-2">
          <Icon.Linkedin size={16} /> LinkedIn
        </span>
      </Button>
      <Button
        as="a"
        href="/sonu-daryani-cv.pdf"
        download="Sonu_Daryani_CV.pdf"
        variant="secondary"
        size="lg"
        liquid
      >
        <span className="inline-flex items-center gap-2">
          <Icon.Download size={16} /> Download CV
        </span>
      </Button>
    </motion.div>
  )
}
