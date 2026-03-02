import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TorusRingProps {
  isDay: boolean
}

export default function TorusRing({ isDay }: TorusRingProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -4]} scale={1.8}>
      <torusGeometry args={[2.2, 0.03, 16, 100]} />
      <meshBasicMaterial
        color={isDay ? '#94a3b8' : '#a78bfa'}
        transparent
        opacity={isDay ? 0.18 : 0.4}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
