import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import GamingPC from './canvas/GamingPC'

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[12, 12]} />
      <meshPhysicalMaterial
        color="#080810"
        metalness={0.95}
        roughness={0.03}
        envMapIntensity={0.6}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

export default function Hero({ product }) {
  const sectionRef = useRef(null)
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const wh = window.innerHeight
      const sectionH = rect.height
      const scrolled = wh - rect.top
      const pct = Math.max(0, Math.min(1, scrolled / sectionH))
      scrollRef.current = pct
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-bg"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        camera={{ position: [6.5, 0.2, 0.5], fov: 36, near: 0.1, far: 20 }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <GamingPC scrollRef={scrollRef} />
        <ReflectiveFloor />
        <ContactShadows position={[0, -2.15, 0]} opacity={0.4} scale={6} blur={2.5} far={4} />
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 7, 4]} angle={0.25} penumbra={0.4} intensity={2.5} castShadow />
        <spotLight position={[-3, 4, -2]} angle={0.35} penumbra={0.5} intensity={0.6} color="#4488ff" />
        <spotLight position={[0, -1, 5]} angle={0.4} penumbra={0.7} intensity={0.5} color="#ff8844" />
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={0.4} mipmapBlur />
        </EffectComposer>
      </Canvas>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          <div className="max-w-md w-full pointer-events-auto backdrop-blur-2xl bg-bg/50 p-6 md:p-8 rounded-xl border border-border/30">
            {product?.model && (
              <span className="tag-accent">{product.model}</span>
            )}
            <h1 className="heading text-4xl md:text-6xl lg:text-7xl font-black text-text mt-4 leading-[1.04]">
              {product?.name || 'PC Gamer'}
            </h1>
            <div className="rule-accent mt-5" />
            {product ? (
              <>
                <div className="mt-5 space-y-1.5 text-sm text-text-muted leading-relaxed">
                  {product.cpu && <p><span className="mono text-accent text-xs mr-2">CPU</span>{product.cpu}</p>}
                  {product.gpu && <p><span className="mono text-accent text-xs mr-2">GPU</span>{product.gpu}</p>}
                  {product.ram && <p><span className="mono text-accent text-xs mr-2">RAM</span>{product.ram}</p>}
                  {product.storage && <p><span className="mono text-accent text-xs mr-2">STO</span>{product.storage}</p>}
                </div>
                {product.sale_price && (
                  <div className="flex items-baseline gap-3 mt-6">
                    <span className="text-3xl font-bold text-accent">
                      {Number(product.sale_price).toLocaleString()}{' '}
                      <span className="text-sm text-text-muted font-normal">MAD</span>
                    </span>
                    {Number(product.original_price) > Number(product.sale_price) && (
                      <span className="text-lg text-text-dim line-through">
                        {Number(product.original_price).toLocaleString()} MAD
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    Voir la fiche
                  </Link>
                  <Link to="/configurator" className="btn btn-outline">
                    Configurer le mien
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="mt-5 text-text-muted text-sm leading-relaxed">
                  Puissance et style réunis. Découvrez nos configurations gaming haut de gamme.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <Link to="/pc-gamer" className="btn btn-primary">
                    Explorer les PC
                  </Link>
                  <Link to="/configurator" className="btn btn-outline">
                    Configurer le mien
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-text-dim">
        <span className="text-[0.55rem] font-mono tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-text-dim to-transparent" />
      </div>
    </section>
  )
}


