'use client'

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
  /** Static scene + lighter meshes when OS/browser requests reduced motion */
  reducedMotion?: boolean
}

export default function Scene3D({ theme, reducedMotion = false }: Scene3DProps) {
  const groupRef = useRef<Group>(null)
  const { scene, gl } = useThree()
  const isDay = theme === 'light'

  useEffect(() => {
    if (isDay) {
      scene.background = new THREE.Color(0xffffff)
      gl.setClearColor(0xffffff, 1)
      scene.fog = null
    } else {
      scene.background = new THREE.Color(0x000000)
      gl.setClearColor(0x000000, 1)
      scene.fog = null
    }
  }, [isDay, scene, gl])

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <>
      {isDay ? (
        <>
          <SkyDay reducedMotion={reducedMotion} />
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
        <DisplacementSphere isDay={isDay} reducedMotion={reducedMotion} />
        <ParticleField isDay={isDay} reducedMotion={reducedMotion} />
        <TorusRing isDay={isDay} reducedMotion={reducedMotion} />
      </group>

      <FloatingOrbs isDay={isDay} reducedMotion={reducedMotion} />
    </>
  )
}
