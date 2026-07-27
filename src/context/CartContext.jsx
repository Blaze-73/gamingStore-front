import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'snakegaming_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product, quantity = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setOpen(true)
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) return removeItem(id)
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, quantity } : i
    ))
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + Number(i.sale_price) * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      total, count, open, setOpen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)
