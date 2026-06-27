import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

const gameCategories = [
  { name: 'Compétitif FPS', games: ['valorant', 'overwatch-2', 'csgo'], accent: '#f44336', icon: '▸' },
  { name: 'Battle Royale & Monde ouvert', games: ['fortnite', 'apex-legends', 'pubg', 'gta-v'], accent: '#ff9800', icon: '▸' },
  { name: 'AAA & Simulation', games: ['cyberpunk', 'battlefield-6', 'fifa-26', 'minecraft', 'league-of-legends'], accent: '#4caf50', icon: '▸' },
]

export default function PCByGame() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.products.list()
      .then(data => setProducts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-16 text-text-dim text-sm">Chargement...</div>

  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">PC par jeu</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3 max-w-2xl">
            La config qu&rsquo;il faut pour le jeu que vous voulez
          </h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            Vous jouez à quoi ? On vous sort la config qui va avec.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 space-y-14">
        {gameCategories.map((cat) => {
          const catPCs = products.filter(pc =>
            pc.games?.some(g => cat.games.includes(g))
          ).slice(0, 4)

          if (catPCs.length === 0) return null

          return (
            <div key={cat.name} className="pt-8">
              <div className="flex items-center gap-4 mb-6">
                <hr className="rule-accent" />
                <span className="text-lg" style={{ color: cat.accent }}>{cat.icon}</span>
                <h2 className="heading-flat text-xl font-bold text-text">{cat.name}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {catPCs.map(pc => (
                  <ProductCard key={pc.id} product={pc} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section className="border-t border-border bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-text-muted text-sm max-w-md mx-auto mb-4">
            Pas votre jeu dans la liste ? Le configurateur permet de créer la config exacte qu&rsquo;il vous faut.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/configurator" className="btn btn-primary btn-sm">
              Configurer mon PC
            </Link>
            <span className="tag-api text-[0.5rem]">API</span>
          </div>
        </div>
      </section>
    </div>
  )
}
