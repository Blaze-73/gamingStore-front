import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

const sizeFilters = ['Tous', '24"', '25"', '27"', '34"']
const resFilters = ['Toutes', '1920x1080', '2560x1440', '3440x1440']

export default function Monitors() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [size, setSize] = useState('Tous')
  const [res, setRes] = useState('Toutes')

  useEffect(() => {
    api.products.list({ category: 'monitors' })
      .then(data => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  let filtered = products
  if (size !== 'Tous') filtered = filtered.filter(p => p.screen_size === size)
  if (res !== 'Toutes') filtered = filtered.filter(p => p.resolution === res)

  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">Moniteurs</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3 max-w-2xl">
            L&rsquo;écran fait la différence
          </h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            Hautes fréquences, faibles latences. Des moniteurs qui encaissent tout.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
          <div>
            <p className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">Taille</p>
            <div className="flex flex-wrap gap-1">
              {sizeFilters.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className={`px-2.5 py-1 text-xs font-medium border transition-colors ${size === s ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">Résolution</p>
            <div className="flex flex-wrap gap-1">
              {resFilters.map(r => (
                <button key={r} onClick={() => setRes(r)}
                  className={`px-2.5 py-1 text-xs font-medium border transition-colors ${res === r ? 'bg-accent text-bg border-accent' : 'border-border text-text-muted hover:border-text-dim'}`}>{r}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-dim text-sm">Chargement...</div>
        ) : (
          <div className="space-y-3">
            {filtered.map(m => (
              <div key={m.id} className="card card-border p-4 flex flex-col sm:flex-row gap-4 items-start">
                <Link to={`/product/${m.id}`} className="w-full sm:w-32 aspect-[4/3] overflow-hidden border border-border flex-shrink-0 bg-bg">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${m.id}`} className="text-sm font-semibold text-text hover:text-accent transition-colors">{m.name}</Link>
                  <div className="text-xs text-text-muted mt-1 mono space-x-2">
                    <span>{m.screen_size}</span><span className="text-border">|</span>
                    <span>{m.resolution}</span><span className="text-border">|</span>
                    <span>{m.refresh_rate}</span><span className="text-border">|</span>
                    <span>{m.panel}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-base font-bold text-accent">{Number(m.sale_price).toLocaleString()} <span className="text-xs text-text-muted font-normal">MAD</span></span>
                    {Number(m.original_price) > Number(m.sale_price) && <span className="text-xs text-text-dim line-through">{Number(m.original_price).toLocaleString()} MAD</span>}
                    {Number(m.discount) > 0 && <span className="text-[10px] font-bold text-accent mono">-{m.discount}%</span>}
                  </div>
                  <Link to={`/product/${m.id}`} className="mt-2 inline-flex py-1.5 px-3 text-xs font-semibold text-accent border border-accent hover:bg-accent hover:text-bg transition-colors">Voir</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
