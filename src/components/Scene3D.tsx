import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import DisplacementSphere from '../shaders/displacementSphere'
import ParticleField from './world/ParticleField'
import FloatingOrbs from './world/FloatingOrbs'
import TorusRing from './world/TorusRing'
import SkyDay from './world/SkyDay'
import type { Theme } from '../context/ThemeContext'

interface Scene3DProps {
  theme: Theme
}

export default function Scene3D({ theme }: Scene3DProps) {
  const groupRef = useRef<Group>(null)
  const { scene, gl } = useThree()
  const isDay = theme === 'light'

  useEffect(() => {
    if (isDay) {
      scene.background = new THREE.Color(0xffffff)
      gl.setClearColor(0xffffff, 1)
      scene.fog = null
    } else {
      scene.background = null
      gl.setClearColor(0x030306, 1)
      scene.fog = null
    }
  }, [isDay, scene, gl])

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
          <ambientLight intensity={0.95} />
          <directionalLight position={[10, 15, 10]} intensity={1.2} color="#ffffff" castShadow />
          <pointLight position={[-5, 5, 5]} intensity={0.3} color="#ffffff" />
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
    </>
  )
}
