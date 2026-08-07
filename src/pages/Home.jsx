import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

const whyUs = [
  {
    title: 'Assemblé & testé',
    desc: 'Chaque PC est monté, testé et burn-in avant livraison. On ne vend pas des boîtes.',
  },
  {
    title: 'Garantie 2 ans',
    desc: 'SAV local à Tanger et Casablanca. Pièces et main-d\'œuvre incluses.',
  },
  {
    title: 'Livraison Maroc',
    desc: 'Express dans les grandes villes, 48-72h ailleurs. Paiement à la livraison.',
  },
]

export default function Home() {
  const [featured, setFeatured] = useState(null)
  const [pcs, setPcs] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function load() {
      try {
        const data = await api.products.list({ featured: true })
        setFeatured(data.data?.[0] || null)
        const all = await api.products.list()
        setPcs(all.data || [])
        setTotalCount(all.total || all.data?.length || 0)
      } catch (e) {
        console.error('Failed to load products', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      <Hero product={featured} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-4 mb-8">
          <hr className="rule-accent" />
          <h2 className="heading text-2xl font-black text-text">Pourquoi SnakeGaming</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {whyUs.map((item) => (
            <div key={item.title} className="card card-border p-6">
              <h3 className="heading-flat text-base font-bold text-text mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg-alt border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-8">
            <hr className="rule-accent" />
            <div>
              <h2 className="heading text-2xl font-black text-text">PC Gamer</h2>
              <p className="text-text-muted text-sm mt-0.5">
                {totalCount > 0 ? `${totalCount} produits disponibles` : 'Disponibles et prêts à partir'}
              </p>
            </div>
            <span className="ml-auto tag-api">API</span>
          </div>
          {loading ? (
            <div role="status" aria-live="polite" className="text-center py-12 text-text-dim text-sm">Chargement...</div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pcs.slice(0, 4).map((pc) => (
                  <ProductCard key={pc.id} product={pc} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/pc-gamer" className="btn btn-outline btn-sm">
                  Voir tous les PC Gamer
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="card card-border p-8 md:p-10 pattern-diamonds">
          <div className="max-w-lg">
            <span className="tag-accent">Configurateur</span>
            <h2 className="heading text-3xl font-black text-text mt-4">
              Construisez votre PC
            </h2>
            <p className="text-text-muted text-sm mt-3 leading-relaxed">
              Choisissez chaque composant. On assemble, on teste, on livre.
            </p>
            <Link to="/configurator" className="btn btn-primary mt-6 inline-flex">
              Lancer le configurateur
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
