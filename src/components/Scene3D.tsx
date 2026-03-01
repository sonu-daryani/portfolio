import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import DisplacementSphere from '../shaders/displacementSphere'
import ParticleField from './world/ParticleField'
import FloatingOrbs from './world/FloatingOrbs'
import TorusRing from './world/TorusRing'
import Earth3D from './world/Earth3D'
import SkyDay from './world/SkyDay'
import type { Theme } from '../context/ThemeContext'

interface Scene3DProps {
  theme: Theme
}

export default function Scene3D({ theme }: Scene3DProps) {
  const groupRef = useRef<Group>(null)
  const { scene } = useThree()
  const isDay = theme === 'light'

  useEffect(() => {
    if (isDay) {
      scene.background = new THREE.Color(0xb8d4e8)
      scene.fog = null
    } else {
      scene.background = null
      scene.fog = null
    }
  }, [isDay, scene])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <>
      {isDay ? (
        <>
          <SkyDay />
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 15, 10]} intensity={1.4} color="#fff8e7" castShadow />
          <pointLight position={[-5, 5, 5]} intensity={0.4} color="#bfdbfe" />
        </>
      ) : (
        <>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#a78bfa" />
          <pointLight position={[-10, -5, 5]} intensity={0.6} color="#7c3aed" />
          <pointLight position={[0, 5, 5]} intensity={0.4} color="#c4b5fd" />
        </>
      )}

      <group ref={groupRef}>
        <DisplacementSphere isDay={isDay} />
        <ParticleField isDay={isDay} />
        <TorusRing isDay={isDay} />
      </group>

      <FloatingOrbs isDay={isDay} />
      <Earth3D isDay={isDay} />
    </>
  )
}
