import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, total, count } = useCart()

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpen(false)} />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-bg-alt border-l border-border z-50 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold text-text">Panier ({count})</span>
          <button onClick={() => setOpen(false)} className="text-text-muted hover:text-text p-1" aria-label="Fermer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-8">Votre panier est ok</p>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-3 items-start">
              <Link to={`/product/${item.id}`} onClick={() => setOpen(false)}
                className="w-14 h-12 flex-shrink-0 bg-bg border border-border overflow-hidden">
                {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} onClick={() => setOpen(false)}
                  className="text-sm text-text hover:text-accent transition-colors block truncate">
                  {item.name}
                </Link>
                <p className="text-xs text-text-muted mt-0.5">
                  {item.quantity} × {Number(item.sale_price).toLocaleString()} MAD
                </p>
              </div>
              <button onClick={() => removeItem(item.id)}
                className="text-text-dim hover:text-accent transition-colors p-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-4 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Total</span>
              <span className="font-bold text-accent">{total.toLocaleString()} MAD</span>
            </div>
            <Link to="/cart" onClick={() => setOpen(false)}
              className="btn btn-primary w-full justify-center text-xs">
              Voir le panier
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
