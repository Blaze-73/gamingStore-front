import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function FanBlades({ radius = 0.3 }) {
  const count = 7
  const bladeLen = radius * 0.65
  const bladeWid = radius * 0.22
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[radius * 0.18, radius * 0.18, 0.025, 12]} />
        <meshPhysicalMaterial color="#1a1a24" metalness={0.2} roughness={0.8} />
      </mesh>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2
        const r = radius * 0.42
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, Math.sin(a) * r, 0]}
            rotation={[0, 0, a]}
          >
            <boxGeometry args={[bladeLen, bladeWid, 0.015]} />
            <meshPhysicalMaterial color="#2a2a34" metalness={0.1} roughness={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

function CaseFan({ pos, radius = 0.3, rgb = false, speed = 3 }) {
  const blades = useRef()
  useFrame((s) => { if (blades.current) blades.current.rotation.z = s.clock.elapsedTime * speed })
  return (
    <group position={pos}>
      <mesh><torusGeometry args={[radius, 0.022, 6, 24]} /><meshPhysicalMaterial color="#1a1a24" metalness={0.3} roughness={0.7} /></mesh>
      <mesh position={[0, 0, -0.015]}><torusGeometry args={[radius, 0.008, 6, 24]} /><meshPhysicalMaterial color="#111" metalness={0.2} roughness={0.9} /></mesh>
      {rgb && (
        <mesh position={[0, 0, 0.01]}>
          <torusGeometry args={[radius - 0.015, 0.006, 6, 24]} />
          <meshPhysicalMaterial color="#e8b84b" emissive="#e8b84b" emissiveIntensity={0.6} metalness={0.1} roughness={0.3} />
        </mesh>
      )}
      <group ref={blades}><FanBlades radius={radius} /></group>
    </group>
  )
}

export default function GamingPC({ scrollRef }) {
  const group = useRef()
  const rgbStrip = useRef()
  const gpuRgb = useRef()
  const ramRgb = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = scrollRef.current

    if (group.current) {
      const targetY = 0 + p * 0.5
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.045
      group.current.position.y = Math.sin(t * 0.5) * 0.04
    }

    const pulse = 0.4 + Math.sin(t * 1.8) * 0.35
    if (rgbStrip.current) rgbStrip.current.emissiveIntensity = pulse
    if (gpuRgb.current) gpuRgb.current.emissiveIntensity = 0.15 + Math.sin(t * 2.2 + 1) * 0.12
    ramRgb.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.08 + Math.sin(t * 2.5 + i * 0.5) * 0.06
    })
  })

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* ── CASE BODY ── */}
      <RoundedBox args={[2.0, 4.2, 1.9]} radius={0.07} smoothness={4}>
        <meshPhysicalMaterial color="#0a0a12" metalness={0.95} roughness={0.08} envMapIntensity={1.6} />
      </RoundedBox>

      {/* ── RIGHT SIDE PANEL (closed side) ── */}
      <mesh position={[-1.03, 0.05, 0]}>
        <boxGeometry args={[0.03, 3.8, 1.7]} />
        <meshPhysicalMaterial color="#12121c" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* ── INTERIOR WALL ── */}
      <mesh position={[-0.55, 0.05, -0.85]}>
        <boxGeometry args={[0.9, 3.6, 0.03]} />
        <meshPhysicalMaterial color="#0d0d15" metalness={0.4} roughness={0.9} />
      </mesh>

      {/* ── MOTHERBOARD ── */}
      <mesh position={[-0.55, 0.4, -0.5]}>
        <boxGeometry args={[0.02, 1.8, 1.5]} />
        <meshPhysicalMaterial color="#1a301a" metalness={0.1} roughness={0.95} />
      </mesh>

      {/* CPU Socket area */}
      <mesh position={[-0.54, 0.7, -0.1]}>
        <boxGeometry args={[0.015, 0.25, 0.25]} />
        <meshPhysicalMaterial color="#889" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ── CPU TOWER COOLER ── */}
      <group position={[-0.5, 0.78, -0.1]}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i} position={[0.06, 0, -0.04 + i * 0.012]}>
            <boxGeometry args={[0.18, 0.22, 0.004]} />
            <meshPhysicalMaterial color="#556" metalness={0.6} roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0.12, 0, 0.005]}>
          <boxGeometry args={[0.04, 0.22, 0.1]} />
          <meshPhysicalMaterial color="#778" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Cooler fan */}
        <group position={[0.12, 0, 0.005]}>
          <mesh><torusGeometry args={[0.1, 0.012, 6, 20]} /><meshPhysicalMaterial color="#222" metalness={0.2} roughness={0.8} /></mesh>
        </group>
      </group>

      {/* ── RAM ── */}
      {[[-0.15, 0.1], [0.15, 0.1]].map(([z], i) => (
        <group key={i} position={[-0.53, 0.55, z * 0.6]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.015, 0.22, 0.055]} />
            <meshPhysicalMaterial color="#0a0a0a" metalness={0.2} roughness={0.9} />
          </mesh>
          <mesh
            ref={(el) => { ramRgb.current[i] = el }}
            position={[0, 0.12, 0]}
          >
            <boxGeometry args={[0.018, 0.2, 0.06]} />
            <meshPhysicalMaterial color="#e8b84b" metalness={0.4} roughness={0.3} emissive="#e8b84b" emissiveIntensity={0.08} />
          </mesh>
        </group>
      ))}

      {/* ── GPU ── */}
      <group position={[-0.5, -0.25, -0.45]}>
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.35]} />
          <meshPhysicalMaterial color="#0a0a0a" metalness={0.3} roughness={0.8} />
        </mesh>
        <mesh position={[0.1, -0.03, 0]}>
          <boxGeometry args={[0.48, 0.008, 0.33]} />
          <meshPhysicalMaterial color="#181820" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.1, 0.04, 0]}>
          <boxGeometry args={[0.45, 0.015, 0.3]} />
          <meshPhysicalMaterial color="#e8b84b" metalness={0.5} roughness={0.25} />
        </mesh>
        <CaseFan pos={[0, 0.04, 0.1]} radius={0.07} speed={4} />
        <CaseFan pos={[0.2, 0.04, 0.1]} radius={0.07} speed={4} />
        <mesh ref={gpuRgb} position={[0.1, 0.045, 0.14]}>
          <boxGeometry args={[0.15, 0.004, 0.015]} />
          <meshPhysicalMaterial color="#e8b84b" emissive="#e8b84b" emissiveIntensity={0.15} metalness={0.1} roughness={0.3} />
        </mesh>
        {/* GPU power cables */}
        <mesh position={[0.35, 0.025, -0.1]}>
          <cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
          <meshPhysicalMaterial color="#222" metalness={0.1} roughness={0.9} />
        </mesh>
      </group>

      {/* ── TOP EXHAUST FAN ── */}
      <CaseFan pos={[0.2, 1.95, -0.2]} radius={0.32} rgb speed={3} />

      {/* ── REAR EXHAUST FAN ── */}
      <CaseFan pos={[0.55, 0.2, -0.88]} radius={0.22} speed={3.5} />

      {/* ── PSU (bottom) ── */}
      <mesh position={[0, -1.7, -0.55]}>
        <boxGeometry args={[0.55, 0.3, 0.6]} />
        <meshPhysicalMaterial color="#181820" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* PSU fan grill */}
      <mesh position={[0, -1.7, -0.87]}>
        <ringGeometry args={[0.08, 0.2, 16]} />
        <meshPhysicalMaterial color="#222" metalness={0.3} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* ── GLASS PANEL ── */}
      <mesh position={[1.03, 0.05, 0]}>
        <boxGeometry args={[0.015, 3.7, 1.65]} />
        <meshPhysicalMaterial
          color="#cce0ff" metalness={0.0} roughness={0.01}
          transparent opacity={0.1} envMapIntensity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[1.02, 0.05, 0]}>
        <boxGeometry args={[0.008, 3.75, 1.7]} />
        <meshPhysicalMaterial color="#222" metalness={0.8} roughness={0.1} transparent opacity={0.12} />
      </mesh>
      {/* Glass screw details */}
      {[[0.8, 1.7], [-0.8, 1.7], [0.8, -1.6], [-0.8, -1.6]].map(([z, y], i) => (
        <mesh key={i} position={[1.04, y, z]}>
          <circleGeometry args={[0.012, 8]} />
          <meshPhysicalMaterial color="#555" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* ── FRONT PANEL ── */}
      <mesh position={[0, 0.05, 0.97]}>
        <boxGeometry args={[1.7, 3.7, 0.02]} />
        <meshPhysicalMaterial color="#101018" metalness={0.7} roughness={0.15} />
      </mesh>
      {/* Ventilation slits */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 0.7 - i * 0.35, 0.98]}>
          <boxGeometry args={[1.3, 0.006, 0.005]} />
          <meshPhysicalMaterial color="#1a1a28" metalness={0.3} roughness={0.9} />
        </mesh>
      ))}

      {/* ── TOP MESH PANEL ── */}
      <mesh position={[0, 2.12, -0.3]}>
        <boxGeometry args={[1.2, 0.015, 0.7]} />
        <meshPhysicalMaterial color="#141420" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* ── FRONT IO ── */}
      <mesh position={[-0.6, 1.75, 0.98]}>
        <boxGeometry args={[0.2, 0.08, 0.005]} />
        <meshPhysicalMaterial color="#222" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Power button */}
      <mesh position={[0.5, 1.75, 0.99]}>
        <circleGeometry args={[0.035, 12]} />
        <meshPhysicalMaterial color="#e8b84b" metalness={0.5} roughness={0.3} emissive="#e8b84b" emissiveIntensity={0.3} />
      </mesh>

      {/* ── RGB STRIP (bottom front) ── */}
      <mesh ref={rgbStrip} position={[0, -1.7, 0.98]}>
        <boxGeometry args={[0.9, 0.01, 0.005]} />
        <meshPhysicalMaterial color="#e8b84b" emissive="#e8b84b" emissiveIntensity={0.5} metalness={0.1} roughness={0.4} />
      </mesh>

      {/* ── FEET ── */}
      {[[-0.75, -2.12, 0.75], [0.75, -2.12, 0.75], [-0.75, -2.12, -0.75], [0.75, -2.12, -0.75]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.08, 0.03, 0.08]} />
          <meshPhysicalMaterial color="#333" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}

      {/* ── 24-PIN POWER CABLE ── */}
      <mesh position={[-0.35, -0.8, -0.5]}>
        <tubeGeometry
          args={[new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.2, 0, 0),
            new THREE.Vector3(-0.1, -0.3, 0),
            new THREE.Vector3(0.15, -0.4, 0.05),
            new THREE.Vector3(0.35, -0.3, 0.05),
          ]), 20, 0.008, 8, false]}
        />
        <meshPhysicalMaterial color="#222" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* ── CABLE COMBS ── */}
      <mesh position={[0.35, -0.3, 0.05]}>
        <boxGeometry args={[0.06, 0.015, 0.025]} />
        <meshPhysicalMaterial color="#333" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  )
}
