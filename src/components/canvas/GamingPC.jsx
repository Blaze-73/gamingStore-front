import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function GamingPC({ scrollRef }) {
  const group = useRef()
  const rgbRef = useRef()
  const fanRef = useRef()
  const gpuRgbRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = scrollRef.current

    if (group.current) {
      const targetY = -0.4 + p * 4.2
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.045
      const floatY = Math.sin(t * 0.6) * 0.045
      group.current.position.y = floatY
    }

    if (fanRef.current) {
      fanRef.current.rotation.z = t * 3.5
    }

    const pulse = 0.5 + Math.sin(t * 1.8) * 0.35
    if (rgbRef.current) rgbRef.current.emissiveIntensity = pulse
    if (gpuRgbRef.current) gpuRgbRef.current.emissiveIntensity = 0.15 + Math.sin(t * 2.2 + 1) * 0.1
  })

  return (
    <group ref={group} position={[0.6, -0.4, 0]}>
      <RoundedBox args={[1.8, 3.6, 1.5]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial
          color="#09090f"
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={1.6}
        />
      </RoundedBox>

      <mesh position={[0, 0.05, -0.72]}>
        <boxGeometry args={[1.55, 3.1, 0.04]} />
        <meshPhysicalMaterial color="#14141c" metalness={0.5} roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.4, -0.7]}>
        <boxGeometry args={[1.1, 1.7, 0.02]} />
        <meshPhysicalMaterial color="#1e3a1e" metalness={0.1} roughness={0.9} />
      </mesh>

      <group position={[0, 0.75, -0.68]}>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.2, 0.2, 0.02]} />
          <meshPhysicalMaterial color="#8a9aaa" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.36, 0.36, 0.08]} />
          <meshPhysicalMaterial color="#5a6a7a" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      <group position={[-0.3, -0.1, -0.68]}>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.55, 0.06, 0.35]} />
          <meshPhysicalMaterial color="#0a0a10" metalness={0.4} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.04, 0.02]}>
          <boxGeometry args={[0.5, 0.02, 0.3]} />
          <meshPhysicalMaterial
            ref={gpuRgbRef}
            color="#e8b84b"
            metalness={0.5}
            roughness={0.25}
            emissive="#e8b84b"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {[-0.12, 0.12].map((x, i) => (
        <mesh key={i} position={[x, 0.6, -0.68]}>
          <boxGeometry args={[0.02, 0.3, 0.05]} />
          <meshPhysicalMaterial
            color="#e8b84b"
            metalness={0.3}
            roughness={0.4}
            emissive="#e8b84b"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}

      <group ref={fanRef} position={[0, 1.65, -0.15]}>
        {[0.25, 0.15].map((r, i) => (
          <mesh key={i} position={[0, 0, i * 0.01]}>
            <torusGeometry args={[r, 0.02, 6, 20]} />
            <meshPhysicalMaterial color="#2a2a34" metalness={0.3} roughness={0.8} />
          </mesh>
        ))}
      </group>

      <mesh position={[0, -1.45, -0.6]}>
        <boxGeometry args={[0.5, 0.25, 0.5]} />
        <meshPhysicalMaterial color="#181820" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[0, 0.05, 0.77]}>
        <boxGeometry args={[1.55, 3.0, 0.02]} />
        <meshPhysicalMaterial
          color="#bbddff"
          metalness={0.0}
          roughness={0.01}
          transparent
          opacity={0.1}
          envMapIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0.05, 0.76]}>
        <boxGeometry args={[1.6, 3.05, 0.01]} />
        <meshPhysicalMaterial
          color="#222"
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh position={[0, 0.05, -0.77]}>
        <boxGeometry args={[1.65, 3.15, 0.02]} />
        <meshPhysicalMaterial color="#101018" metalness={0.75} roughness={0.15} />
      </mesh>

      <mesh position={[0, -0.4, -0.78]}>
        <boxGeometry args={[1.0, 0.015, 0.01]} />
        <meshPhysicalMaterial
          ref={rgbRef}
          color="#e8b84b"
          emissive="#e8b84b"
          emissiveIntensity={0.6}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0.7, 0.9, -0.76]}>
        <boxGeometry args={[0.12, 0.1, 0.01]} />
        <meshPhysicalMaterial color="#222" metalness={0.6} roughness={0.5} />
      </mesh>
    </group>
  )
}
