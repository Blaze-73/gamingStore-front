import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, removeItem, updateQuantity, total, count, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <span className="text-5xl block mb-4">🛒</span>
        <h1 className="heading text-3xl font-black text-text mb-3">Votre panier est vide</h1>
        <p className="text-text-muted text-sm mb-6">Ajoutez des produits depuis notre catalogue.</p>
        <Link to="/pc-gamer" className="btn btn-primary btn-sm">Voir les PC Gamer</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="tag-accent">Panier</span>
          <h1 className="heading text-3xl md:text-4xl font-black text-text mt-3">
            {count} article{count > 1 ? 's' : ''}
          </h1>
        </div>
        <button onClick={clearCart} className="btn btn-ghost btn-sm text-text-dim hover:text-accent">
          Vider
        </button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="card card-border p-4 flex gap-4 items-center">
            <Link to={`/product/${item.id}`} className="w-20 h-16 flex-shrink-0 bg-bg border border-border overflow-hidden">
              {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/product/${item.id}`} className="text-sm font-semibold text-text hover:text-accent transition-colors">
                {item.name}
              </Link>
              <p className="text-xs text-text-muted mt-0.5">
                {Number(item.sale_price).toLocaleString()} MAD
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 flex items-center justify-center border border-border text-text-muted hover:text-text hover:border-text-dim transition-colors text-sm"
              >−</button>
              <span className="w-8 text-center text-sm font-medium text-text">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 flex items-center justify-center border border-border text-text-muted hover:text-text hover:border-text-dim transition-colors text-sm"
              >+</button>
            </div>
            <div className="text-right min-w-[100px]">
              <p className="text-sm font-semibold text-text">
                {(Number(item.sale_price) * item.quantity).toLocaleString()} MAD
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-text-dim hover:text-accent transition-colors p-1"
              aria-label="Supprimer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="card card-border p-6 mt-8 max-w-sm ml-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-muted">Sous-total</span>
          <span className="text-sm text-text">{total.toLocaleString()} MAD</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-text-muted">Livraison</span>
          <span className="text-sm text-text">À calculer</span>
        </div>
        <div className="rule mb-4" />
        <div className="flex items-center justify-between mb-6">
          <span className="text-base font-bold text-text">Total</span>
          <span className="text-xl font-bold text-accent">{total.toLocaleString()} MAD</span>
        </div>
        <button className="btn btn-primary w-full justify-center">
          Commander
        </button>
        <p className="text-xs text-text-dim text-center mt-3">Paiement à la livraison</p>
      </div>
    </div>
  )
}
