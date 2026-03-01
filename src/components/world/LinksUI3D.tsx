import { Float, Html } from '@react-three/drei'
import type { Profile } from '../../types/profile'

interface LinksUI3DProps {
  profile: Profile
}

const LINKS = [
  { label: 'intalent.ai', href: (p: Profile) => p.links.intalent },
  { label: 'UnlockLife', href: (p: Profile) => p.links.unlocklife },
  { label: 'winity.life', href: (p: Profile) => p.links.winity },
] as const

export default function LinksUI3D({ profile }: LinksUI3DProps) {
  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <group position={[3.2, -0.5, 0]}>
        <Html
          transform
          center
          distanceFactor={2}
          style={{ pointerEvents: 'auto', width: '140px' }}
        >
          <div className="rounded-xl border border-white/15 bg-black/50 backdrop-blur-md px-4 py-3">
            <p className="text-violet-300 font-mono text-xs mb-2">Projects</p>
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href(profile)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/90 text-sm hover:text-violet-300 transition-colors py-0.5"
              >
                {label} →
              </a>
            ))}
          </div>
        </Html>
      </group>
    </Float>
  )
}
