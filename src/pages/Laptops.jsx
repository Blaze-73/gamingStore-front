import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

const cpuFilters = ['Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9']

export default function Laptops() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCpu, setActiveCpu] = useState(null)

  useEffect(() => {
    api.products.list({ category: 'laptops' })
      .then(data => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  let filtered = products
  if (activeCpu) filtered = filtered.filter(p => p.cpu?.includes(activeCpu))

  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">PC Portables</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3 max-w-2xl">
            Gaming en mobilité
          </h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            Jouez partout, sans compromis sur les performances.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">Processeur</p>
        <div className="flex flex-wrap gap-1 mb-6">
          <button onClick={() => setActiveCpu(null)}
            className={`px-2.5 py-1 text-xs font-medium border transition-colors ${!activeCpu ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>Tous</button>
          {cpuFilters.map(cpu => (
            <button key={cpu} onClick={() => setActiveCpu(cpu)}
              className={`px-2.5 py-1 text-xs font-medium border transition-colors ${activeCpu === cpu ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>{cpu}</button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-dim text-sm">Chargement...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(l => <ProductCard key={l.id} product={l} />)}
          </div>
        )}
      </section>
    </div>
  )
}
