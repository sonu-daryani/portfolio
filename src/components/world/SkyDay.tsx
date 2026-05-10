import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec3 vWorldPosition;
  void main() {
    vec4 p = modelViewMatrix * vec4(position, 1.0);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * p;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform float uOffset;
  varying vec3 vWorldPosition;

  void main() {
    float h = normalize(vWorldPosition + uOffset).y;
    vec3 color = mix(uBottomColor, uTopColor, max(0.0, h));
    gl_FragColor = vec4(color, 1.0);
  }
`

interface SkyDayProps {
  reducedMotion?: boolean
}

export default function SkyDay({ reducedMotion = false }: SkyDayProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame((state) => {
    if (reducedMotion || !materialRef.current?.uniforms?.uOffset) return
    materialRef.current.uniforms.uOffset.value = state.clock.elapsedTime * 0.02
  })

  return (
    <mesh scale={[-1, 1, 1]} position={[0, 0, 0]}>
      <sphereGeometry args={[50, 24, 24]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTopColor: { value: new THREE.Color('#ffffff') },
          uBottomColor: { value: new THREE.Color('#ffffff') },
          uOffset: { value: 0 },
        }}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}
