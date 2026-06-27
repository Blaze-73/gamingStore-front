import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

const types = ['Tous', 'Souris', 'Clavier', 'Casque']

export default function Peripherals() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('Tous')

  useEffect(() => {
    api.products.list({ category: 'peripherals' })
      .then(data => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  let filtered = products
  if (activeType !== 'Tous') filtered = filtered.filter(p => p.type === activeType)

  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">Périphériques</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3 max-w-2xl">
            Les accessoires qui comptent
          </h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            Souris, clavier, casque. Chaque détail compte.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">Type</p>
        <div className="flex flex-wrap gap-1 mb-6">
          {types.map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              className={`px-2.5 py-1 text-xs font-medium border transition-colors ${activeType === t ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>{t}</button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-dim text-sm">Chargement...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  )
}
