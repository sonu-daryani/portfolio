import type { Profile } from '../types/profile'
import Button from './ui/Button'

interface FooterProps {
  profile: Profile
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-theme-border py-6 sm:py-8 px-4 sm:px-6 md:px-12 bg-theme-strong/30 backdrop-blur-sm flex-shrink-0">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-theme-muted text-sm">
          © {new Date().getFullYear()} {profile.name}. Built with Vite + React + Three.js
        </p>
        <div className="flex gap-4">
          <Button
            as="a"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            className="!p-0 min-w-0"
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
            className="!p-0 min-w-0"
            aria-label="GitHub"
          >
            GitHub
          </Button>
        </div>
      </div>
    </footer>
  )
}
