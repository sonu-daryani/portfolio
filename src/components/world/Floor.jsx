import { RigidBody } from '@react-three/rapier'

const FLOOR_SIZE = 80

export default function Floor() {
  return (
    <RigidBody type="fixed" friction={0.8} restitution={0}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </RigidBody>
  )
}
