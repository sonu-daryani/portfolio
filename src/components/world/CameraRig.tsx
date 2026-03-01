import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Theme } from '../../context/ThemeContext'

const DARK_POS = new THREE.Vector3(0, 0, 6)
const LIGHT_POS = new THREE.Vector3(0, 0.3, 3.2)
const TARGET = new THREE.Vector3(0, 0, 0)

interface CameraRigProps {
  theme: Theme
}

export default function CameraRig({ theme }: CameraRigProps) {
  const { camera } = useThree()
  const posRef = useRef(new THREE.Vector3(0, 0, 6))

  useFrame((_, delta) => {
    const targetPos = theme === 'light' ? LIGHT_POS : DARK_POS
    posRef.current.lerp(targetPos, Math.min(1, delta * 2))
    camera.position.copy(posRef.current)
    camera.lookAt(TARGET)
    camera.updateProjectionMatrix()
  })

  return null
}
