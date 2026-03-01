import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Mesh } from 'three'

const EARTH_COLORS = {
  ocean: '#1e3a5f',
  emissive: '#0d1f33',
  atmosphere: '#6ba3c6',
}

const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmosphereFragmentShader = /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 uColor;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
    gl_FragColor = vec4(uColor, 0.25 * intensity);
  }
`

const TEXTURE_URLS = [
  'https://cdn.apewebapps.com/threejs/168/examples/textures/planets/earth_atmos_2048.jpg',
  'https://unpkg.com/three-globe@2.31.0/example/img/earth-day.jpg',
]

const EARTH_POS: [number, number, number] = [3.8, 0.2, -2.5]
const EARTH_SCALE = 1.4

interface Earth3DProps {
  isDay: boolean
}

export default function Earth3D({ isDay }: Earth3DProps) {
  const meshRef = useRef<Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    let cancelled = false
    const loader = new THREE.TextureLoader()
    const tryLoad = (idx: number) => {
      if (cancelled || idx >= TEXTURE_URLS.length) return
      loader.load(
        TEXTURE_URLS[idx],
        (tex) => {
          if (cancelled) return
          tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
          tex.colorSpace = THREE.SRGBColorSpace
          setEarthTexture(tex)
        },
        undefined,
        () => tryLoad(idx + 1)
      )
    }
    tryLoad(0)
    return () => { cancelled = true }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.06
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = state.clock.elapsedTime * 0.06
    }
  })

  return (
    <group position={EARTH_POS} scale={EARTH_SCALE}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        {earthTexture ? (
          <meshStandardMaterial
            map={earthTexture}
            metalness={0.05}
            roughness={0.75}
            envMapIntensity={0.2}
          />
        ) : (
          <meshStandardMaterial
            color={EARTH_COLORS.ocean}
            metalness={0.05}
            roughness={0.9}
            emissive={EARTH_COLORS.emissive}
          />
        )}
      </mesh>
      {/* Fresnel atmosphere glow – lighter in day mode */}
      <mesh ref={atmosphereRef} scale={1.08}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={{
            uColor: { value: new THREE.Color(isDay ? '#93c5fd' : EARTH_COLORS.atmosphere) },
          }}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
