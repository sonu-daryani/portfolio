import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ORBS = [
  { position: [2.5, 1.2, -2] as [number, number, number], scale: 0.4, speed: 0.3 },
  { position: [-2, -0.8, -1.5] as [number, number, number], scale: 0.25, speed: 0.2 },
  { position: [1, -1.5, -2.5] as [number, number, number], scale: 0.2, speed: 0.25 },
  { position: [-1.5, 1.5, -3] as [number, number, number], scale: 0.18, speed: 0.15 },
]

interface FloatingOrbsProps {
  isDay: boolean
}

export default function FloatingOrbs({ isDay }: FloatingOrbsProps) {
  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const t = state.clock.elapsedTime * (ORBS[i].speed + 0.1)
      mesh.position.y = (ORBS[i].position[1] as number) + Math.sin(t) * 0.15
    })
  })

  if (isDay) {
    return (
      <group>
        {ORBS.slice(0, 2).map((orb, i) => (
          <mesh
            key={i}
            ref={(el) => { refs.current[i] = el }}
            position={orb.position}
            scale={orb.scale * 0.8}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color="#e2e8f0"
              transparent
              opacity={0.2}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    )
  }

  return (
    <group>
      {ORBS.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el }}
          position={orb.position}
          scale={orb.scale}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
