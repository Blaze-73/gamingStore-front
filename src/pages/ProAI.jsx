import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

const softwareCategories = [
  { name: '3D & Ingénierie', programs: ['Autodesk Maya', '3ds Max', 'Lumion', 'Catia', 'Fusion 360', 'AutoCAD'], icon: '🏗️' },
  { name: 'Data & Simulation', programs: ['Python', 'Power BI', 'OsiriX', '3D Slicer', 'AnyLogic', 'Altium Designer'], icon: '📊' },
  { name: 'Design & Vidéo', programs: ['Adobe Photoshop', 'After Effects', 'Camtasia', 'Premiere Pro', 'Blender'], icon: '🎨' },
]

export default function ProAI() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.products.list({ category: 'pc-ai' })
      .then(data => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <section className="border-b border-border bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">IA & Professionnel</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3 max-w-2xl">
            Stations de travail pour pros
          </h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            3D, rendu, IA, data science, montage vidéo. Optimisé pour vos logiciels métier.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-4">Logiciels supportés</p>
        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {softwareCategories.map((cat) => (
            <div key={cat.name} className="card card-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="text-sm font-bold text-text">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.programs.map((p) => (
                  <span key={p} className="tag">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <hr className="rule-accent" />
          <h2 className="heading-flat text-xl font-bold text-text">Stations recommandées</h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-dim text-sm">Chargement...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(pc => (
              <ProductCard key={pc.id} product={pc} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
