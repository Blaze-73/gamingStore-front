import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useCart } from '../context/CartContext'

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
  const { count, setOpen: setCartOpen } = useCart()

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
            <SearchBar />
            <Link
              to="/contact"
              className="hidden lg:inline-flex px-2.5 py-1.5 text-sm font-medium text-text-muted hover:text-text transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-text-muted hover:text-text transition-colors"
              aria-label="Panier"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-accent text-bg text-[9px] font-bold rounded-full">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
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
              to="/contact"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-text-muted hover:text-text"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-text-muted hover:text-text"
            >
              Panier{count > 0 ? ` (${count})` : ''}
            </Link>
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
