import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { name: 'PC Gamer', slug: '/pc-gamer' },
  { name: 'Par Jeu', slug: '/pc-by-game' },
  { name: 'IA & Pro', slug: '/pc-ai' },
  { name: 'Setups', slug: '/setup-complet' },
  { name: 'Portables', slug: '/laptops' },
  { name: 'Composants', slug: '/components' },
  { name: 'Moniteurs', slug: '/monitors' },
  { name: 'Périphériques', slug: '/peripherals' },
  { name: 'Chaises', slug: '/chairs-desks' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">S</span>
            <span className="text-base font-semibold tracking-tight text-text">
              Snake<span className="text-accent">Gaming</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.slug
              return (
                <Link
                  key={item.slug}
                  to={item.slug}
                  className={`px-2.5 py-1.5 text-sm font-medium transition-colors rounded-sm ${
                    isActive
                      ? 'text-accent bg-accent/5'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/configurator"
              className="hidden sm:inline-flex items-center btn btn-primary btn-sm"
            >
              Configurer
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-text-muted hover:text-text"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-bg-alt">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.slug
              return (
                <Link
                  key={item.slug}
                  to={item.slug}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-sm ${
                    isActive ? 'text-accent bg-accent/5' : 'text-text-muted hover:text-text hover:bg-bg-card'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link
              to="/configurator"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 mt-3 text-sm font-semibold text-center text-bg bg-accent rounded-sm"
            >
              Configurer votre PC
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
