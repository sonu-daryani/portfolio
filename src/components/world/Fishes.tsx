import Fish from './Fish'

const FISH_CONFIG = [
  { pathOffset: 0, speed: 0.4, radius: 2.2, verticalOffset: -0.5, size: 0.25, color: '#3b82f6' },
  { pathOffset: 2, speed: 0.35, radius: 2.5, verticalOffset: 0.3, size: 0.2, color: '#06b6d4' },
  { pathOffset: 4, speed: 0.5, radius: 1.8, verticalOffset: 0, size: 0.18, color: '#0ea5e9' },
  { pathOffset: 1, speed: 0.3, radius: 2.8, verticalOffset: -0.2, size: 0.22, color: '#38bdf8' },
  { pathOffset: 3, speed: 0.45, radius: 2, verticalOffset: 0.5, size: 0.15, color: '#22d3ee' },
  { pathOffset: 5, speed: 0.38, radius: 2.3, verticalOffset: -0.3, size: 0.2, color: '#2dd4bf' },
]

export default function Fishes() {
  return (
    <group position={[0, 0, -1]}>
      {FISH_CONFIG.map((props, i) => (
        <Fish key={i} {...props} />
      ))}
    </group>
  )
}
