import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Produits',
    links: [
      { name: 'PC Gamer', slug: '/pc-gamer' },
      { name: 'PC Portables', slug: '/laptops' },
      { name: 'Composants', slug: '/components' },
      { name: 'Moniteurs', slug: '/monitors' },
      { name: 'Périphériques', slug: '/peripherals' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Configurateur', slug: '/configurator' },
      { name: 'PC par Jeu', slug: '/pc-by-game' },
      { name: 'PC IA & Pro', slug: '/pc-ai' },
      { name: 'Setups Complets', slug: '/setup-complet' },
      { name: 'Chaises & Bureaux', slug: '/chairs-desks' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-bg-alt" aria-label="Pied de page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link to="/" className="text-lg font-semibold tracking-tight text-text">
              Snake<span className="text-accent">Gaming</span>
            </Link>
            <p className="text-sm text-text-muted mt-3 leading-relaxed max-w-xs">
              PC gamer sur mesure au Maroc. Monté, testé, livré.
            </p>
            <p className="text-xs text-text-dim mt-4">
              Tanger · Rabat · Casablanca · Marrakech
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-4">
                {section.title}
              </h4>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <Link
                    key={link.slug}
                    to={link.slug}
                    className="block text-sm text-text-muted hover:text-text transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h4 className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-text-muted">
              <Link to="/contact" className="block hover:text-text transition-colors">📞 05 30 24 55 55</Link>
              <Link to="/contact" className="block hover:text-text transition-colors">✉️ contact@snakegaming.ma</Link>
              <Link to="/cart" className="block text-accent hover:text-accent-hover transition-colors tag-api inline-block mt-2">Panier</Link>
            </div>
          </div>
        </div>

        <div className="rule mt-10 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-dim">
          <p>&copy; {new Date().getFullYear()} SnakeGaming</p>
          <div className="flex gap-4">
            <span>Termes</span>
            <span>Confidentialité</span>
            <span>Remboursement</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
