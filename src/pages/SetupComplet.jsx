import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

export default function SetupComplet() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.products.list({ category: 'setup-complet' })
      .then(data => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">Setup complet</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3 max-w-2xl">
            On vous livre tout, prêt à jouer
          </h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            PC + écran + périphériques + chaise. Un seul achat, zéro prise de tête.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="text-center py-12 text-text-dim text-sm">Chargement...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(s => (
              <ProductCard key={s.id} product={s} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="card card-border p-6 max-w-xl mx-auto text-center">
            <p className="text-text-muted text-sm mb-4">
              Vous voulez un setup différent ? On compose votre bundle sur mesure.
            </p>
            <Link to="/configurator" className="btn btn-primary btn-sm">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
