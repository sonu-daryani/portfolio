import { Float, Html } from '@react-three/drei'
import type { Profile } from '../../types/profile'

interface HeroUI3DProps {
  profile: Profile
}

export default function HeroUI3D({ profile }: HeroUI3DProps) {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, 0, 0]}>
        <Html
          transform
          center
          distanceFactor={1.8}
          position={[0, 0, 0]}
          style={{
            pointerEvents: 'auto',
            width: '320px',
            userSelect: 'none',
          }}
        >
          <div className="rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl px-8 py-8 shadow-2xl">
            <p className="text-accent font-mono text-sm mb-2">Hi, I'm</p>
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-slate-300 text-sm mb-4 max-w-[280px]">
              {profile.title}
            </p>
            <p className="text-slate-400 text-xs mb-6 max-w-[280px]">
              {profile.tagline}
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href="#contact"
                className="inline-block px-4 py-2 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-400 transition-colors"
              >
                Get in touch
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg border border-white/30 text-white text-sm hover:bg-white/10 transition-colors"
              >
                GitHub
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg border border-white/30 text-white text-sm hover:bg-white/10 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  )
}
