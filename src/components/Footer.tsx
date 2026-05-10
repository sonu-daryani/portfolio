'use client'

import Link from 'next/link'
import { profile } from '../data/profile'
import { Icon } from './ui/Icon'

export default function Footer() {
  return (
    <footer className="site-footer border-t border-theme-border py-4 sm:py-5 px-4 sm:px-6 md:px-12 bg-theme-strong/55 dark:bg-black/40 flex-shrink-0">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-theme-muted text-xs sm:text-sm font-mono">
          © {new Date().getFullYear()} {profile.name} — built with{' '}
          <span className="text-accent">Next.js</span> +{' '}
          <span className="text-accent">TypeScript</span> +{' '}
          <span className="text-accent">Tailwind CSS</span>
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/projects"
            className="text-theme-muted hover:text-accent text-xs font-mono inline-flex items-center gap-1"
          >
            Projects <Icon.ArrowUpRight size={12} />
          </Link>
          <span className="text-theme-muted/40">·</span>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-muted hover:text-accent inline-flex items-center"
            aria-label="LinkedIn"
          >
            <Icon.Linkedin size={16} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-muted hover:text-accent inline-flex items-center"
            aria-label="GitHub"
          >
            <Icon.Github size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
