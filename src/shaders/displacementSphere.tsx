import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'
import type { ShaderMaterial } from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDisplacement;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float elevation = sin(pos.x * 2.0 + uTime * 0.5) * cos(pos.y * 2.0 + uTime * 0.3) * uDisplacement;
    pos += normal * elevation;
    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float mixStrength = (vElevation + 0.5) * 0.5;
    vec3 color = mix(uColor1, uColor2, mixStrength);
    float alpha = 0.4 - vUv.y * 0.2;
    gl_FragColor = vec4(color, alpha);
  }
`

interface ShaderUniforms {
  uTime: { value: number }
  uDisplacement: { value: number }
  uColor1: { value: THREE.Color }
  uColor2: { value: THREE.Color }
}

const DARK_COLORS = { c1: '#4c1d95', c2: '#7c3aed' }
const LIGHT_COLORS = { c1: '#f1f5f9', c2: '#ffffff' }

interface DisplacementSphereProps {
  isDay: boolean
}

export default function DisplacementSphere({ isDay }: DisplacementSphereProps) {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial & { uniforms: ShaderUniforms }>(null)
  const colors = isDay ? LIGHT_COLORS : DARK_COLORS

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
    if (materialRef.current?.uniforms?.uTime) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} scale={2.2}>
      <icosahedronGeometry args={[2.5, 4]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uDisplacement: { value: 0.25 },
          uColor1: { value: new THREE.Color(colors.c1) },
          uColor2: { value: new THREE.Color(colors.c2) },
        }}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
