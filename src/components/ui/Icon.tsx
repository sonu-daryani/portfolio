import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (extra?: string) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: extra,
})

function withSize({ size = 18, className, ...rest }: IconProps) {
  return { ...rest, width: size, height: size, className }
}

export const Icon = {
  Sparkle: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z" />
      <path d="M19 15l.7 1.8L21 17.5l-1.3.7L19 20l-.7-1.8L17 17.5l1.3-.7z" />
    </svg>
  ),
  Brain: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M9.5 4a2.5 2.5 0 00-2.5 2.5v.5A2.5 2.5 0 005 9.5 2.5 2.5 0 005 14a2.5 2.5 0 002 2.5V18a2.5 2.5 0 002.5 2.5" />
      <path d="M14.5 4A2.5 2.5 0 0117 6.5v.5A2.5 2.5 0 0119 9.5a2.5 2.5 0 010 4.5 2.5 2.5 0 01-2 2.5V18a2.5 2.5 0 01-2.5 2.5" />
      <path d="M12 6v12" />
      <path d="M9 11h2" />
      <path d="M13 11h2" />
    </svg>
  ),
  Cpu: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
  Code: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M8 6l-5 6 5 6" />
      <path d="M16 6l5 6-5 6" />
      <path d="M14 4l-4 16" />
    </svg>
  ),
  Terminal: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  ),
  Stack: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M12 3l9 4-9 4-9-4 9-4z" />
      <path d="M3 12l9 4 9-4" />
      <path d="M3 17l9 4 9-4" />
    </svg>
  ),
  Database: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  Cloud: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M7 18a5 5 0 010-10 6 6 0 0111.5 1.5A4.5 4.5 0 0117 18z" />
    </svg>
  ),
  Wrench: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M14.5 6.5a3.5 3.5 0 014.6 4.6L21 13l-2 2-1.9-1.9a3.5 3.5 0 01-4.6-4.6l2 2 2-2-2-2z" />
      <path d="M12 12L4 20l-2-2 8-8" />
    </svg>
  ),
  Bolt: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  ),
  ArrowRight: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowLeft: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  ),
  ArrowUpRight: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  ),
  Mail: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  Phone: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M5 4h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  ),
  Pin: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Linkedin: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v8" />
      <circle cx="8" cy="7" r="0.5" />
      <path d="M12 18v-5a2.5 2.5 0 015 0v5" />
      <path d="M12 13v5" />
    </svg>
  ),
  Github: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.1-4.7-5a4 4 0 011-2.7c-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.8 1a9 9 0 015 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.5.1 2.8a4 4 0 011 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z" />
    </svg>
  ),
  Download: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M12 4v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  ),
  Send: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  Search: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  ),
  Calendar: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  Layers: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </svg>
  ),
  Trophy: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M8 4h8v3a4 4 0 11-8 0V4z" />
      <path d="M5 5H3v2a4 4 0 004 4" />
      <path d="M19 5h2v2a4 4 0 01-4 4" />
      <path d="M9 18h6" />
      <path d="M12 14v4" />
    </svg>
  ),
  Graduate: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M12 3l10 5-10 5L2 8l10-5z" />
      <path d="M6 11v4c0 2 3 4 6 4s6-2 6-4v-4" />
    </svg>
  ),
  Close: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  ),
  Menu: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Pulse: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  ),
  Robot: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 4v3" />
      <circle cx="12" cy="3" r="1" />
      <circle cx="9" cy="13" r="1.2" />
      <circle cx="15" cy="13" r="1.2" />
      <path d="M9 17h6" />
      <path d="M2 12v3" />
      <path d="M22 12v3" />
    </svg>
  ),
  Filter: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <path d="M4 5h16l-6 8v6l-4-2v-4z" />
    </svg>
  ),
  Globe: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a13.5 13.5 0 010 18 13.5 13.5 0 010-18z" />
    </svg>
  ),
  Branch: (p: IconProps) => (
    <svg {...base(p.className)} {...withSize(p)}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <path d="M6 8v8" />
      <path d="M18 8a6 6 0 01-6 6h-4" />
    </svg>
  ),
}

export type IconName = keyof typeof Icon
