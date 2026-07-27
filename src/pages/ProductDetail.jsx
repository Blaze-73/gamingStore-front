import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.products.get(id).then(data => {
      if (mounted) setProduct(data)
    }).catch(() => {
      if (mounted) setProduct(null)
    }).finally(() => {
      if (mounted) setLoading(false)
    })
    return () => { mounted = false }
  }, [id])

  const { addItem } = useCart()

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center text-text-dim text-sm">
      Chargement...
    </div>
  )

  if (!product) return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
      <p className="text-text-muted mb-4">Produit introuvable.</p>
      <Link to="/" className="btn btn-outline btn-sm">Retour à l'accueil</Link>
    </div>
  )

  const {
    name, model, description, cpu, gpu, ram, storage,
    original_price, sale_price, discount, badge, image,
    games, software, screen_size, resolution, refresh_rate, panel,
    includes, type, category, in_stock,
  } = product

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Link to={category ? `/${category.slug}` : '/'} className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text transition-colors mono">
        ← Retour
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-6">
        <div className="aspect-[4/3] bg-bg border border-border overflow-hidden">
          {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
        </div>

        <div>
          <div className="flex items-start gap-2 mb-2">
            {model && <span className="tag-accent">{model}</span>}
            {badge && <span className="tag-accent">{badge}</span>}
            {category && <span className="tag">{category.name}</span>}
            <span className="tag-api">API</span>
          </div>

          <h1 className="heading text-3xl md:text-4xl font-black text-text mt-3">{name}</h1>

          <div className="rule-accent mt-4" />

          {description && (
            <p className="text-text-muted text-sm mt-4 leading-relaxed">{description}</p>
          )}

          <div className="mt-5 space-y-2">
            {cpu && <SpecRow label="CPU" value={cpu} />}
            {gpu && <SpecRow label="GPU" value={gpu} />}
            {ram && <SpecRow label="RAM" value={ram} />}
            {storage && <SpecRow label="Stockage" value={storage} />}
            {screen_size && <SpecRow label="Taille" value={`${screen_size} · ${resolution} · ${refresh_rate} · ${panel}`} />}
            {type && <SpecRow label="Type" value={type} />}
          </div>

          {games?.length > 0 && (
            <div className="mt-4">
              <p className="mono text-[10px] text-accent font-semibold uppercase tracking-widest mb-1">Jeux recommandés</p>
              <div className="flex flex-wrap gap-1">
                {games.map(g => <span key={g} className="tag">{g}</span>)}
              </div>
            </div>
          )}

          {software?.length > 0 && (
            <div className="mt-4">
              <p className="mono text-[10px] text-accent font-semibold uppercase tracking-widest mb-1">Logiciels compatibles</p>
              <div className="flex flex-wrap gap-1">
                {software.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          )}

          {includes?.length > 0 && (
            <div className="mt-4">
              <p className="mono text-[10px] text-accent font-semibold uppercase tracking-widest mb-1">Inclus</p>
              <ul className="space-y-0.5">
                {includes.map((item, i) => (
                  <li key={i} className="text-sm text-text-muted flex items-center gap-2">
                    <span className="text-accent">+</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rule mt-6 mb-4" />

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-accent">
              {Number(sale_price).toLocaleString()} <span className="text-sm text-text-muted font-normal">MAD</span>
            </span>
            {Number(original_price) > Number(sale_price) && (
              <span className="text-lg text-text-dim line-through">{Number(original_price).toLocaleString()} MAD</span>
            )}
            {Number(discount) > 0 && (
              <span className="text-xs font-bold text-accent mono">-{discount}%</span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => addItem(product)} className="btn btn-primary">
              Ajouter au panier
            </button>
            <Link to="/configurator" className="btn btn-outline">
              Configurer un PC similaire
            </Link>
          </div>

          {!in_stock && (
            <p className="text-xs text-accent mt-3 mono">Hors stock — nous contacter pour un délai</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="mono text-[10px] text-accent font-semibold uppercase tracking-widest w-16 flex-shrink-0">{label}</span>
      <span className="rule flex-1" />
      <span className="text-text-muted text-right">{value}</span>
    </div>
  )
}
