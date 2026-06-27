import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

const cpuFilters = ['AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'Intel Ultra 9']
const priceRanges = [
  { label: ' Moins de 4 999 MAD', min: 0, max: 4999 },
  { label: '4 999 - 9 999 MAD', min: 4999, max: 9999 },
  { label: '9 999 - 20 000 MAD', min: 9999, max: 20000 },
  { label: '+ 20 000 MAD', min: 20000, max: 999999 },
]

export default function PCGamer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCpu, setActiveCpu] = useState(null)
  const [activePrice, setActivePrice] = useState(null)

  useEffect(() => {
    api.products.list()
      .then(data => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  let filtered = products
  if (activeCpu) filtered = filtered.filter(p => p.cpu?.includes(activeCpu))
  if (activePrice !== null) {
    const range = priceRanges[activePrice]
    filtered = filtered.filter(p => p.sale_price >= range.min && p.sale_price <= range.max)
  }

  return (
    <div>
      <section className="border-b border-border bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">PC Gamer</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3 max-w-2xl">
            Performance sans compromis
          </h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            Du 1080p compétitif à la 4K ultra. Toutes nos configs sont testées avant livraison.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
          <div>
            <p className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">Processeur</p>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => setActiveCpu(null)}
                className={`px-2.5 py-1 text-xs font-medium border transition-colors ${!activeCpu ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>
                Tous
              </button>
              {cpuFilters.map(cpu => (
                <button key={cpu} onClick={() => setActiveCpu(cpu)}
                  className={`px-2.5 py-1 text-xs font-medium border transition-colors ${activeCpu === cpu ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>
                  {cpu}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">Budget</p>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => setActivePrice(null)}
                className={`px-2.5 py-1 text-xs font-medium border transition-colors ${activePrice === null ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>
                Tous
              </button>
              {priceRanges.map((r, i) => (
                <button key={r.label} onClick={() => setActivePrice(i)}
                  className={`px-2.5 py-1 text-xs font-medium border transition-colors ${activePrice === i ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-dim text-sm">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-text-muted text-sm">Aucune configuration trouvée.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(pc => (
              <ProductCard key={pc.id} product={pc} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
