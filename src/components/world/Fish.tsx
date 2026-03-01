import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FishProps {
  pathOffset: number
  speed: number
  radius: number
  verticalOffset: number
  size: number
  color: string
}

export default function Fish({
  pathOffset,
  speed,
  radius,
  verticalOffset,
  size,
  color,
}: FishProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime * speed + pathOffset
    groupRef.current.position.x = Math.cos(t) * radius
    groupRef.current.position.z = Math.sin(t) * radius
    groupRef.current.position.y = verticalOffset + Math.sin(t * 0.7) * 0.3
    groupRef.current.rotation.y = -t
  })

  return (
    <group ref={groupRef}>
      <mesh scale={[size * 1.2, size * 0.4, size * 0.5]} castShadow>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial
          color={color}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      <mesh position={[-size * 0.7, 0, 0]} scale={[size * 0.35, size * 0.5, size * 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.35, 0.5, 6]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
