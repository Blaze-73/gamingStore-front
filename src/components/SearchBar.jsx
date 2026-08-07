import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const debounce = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleChange(value) {
    setQuery(value)
    clearTimeout(debounce.current)
    if (value.length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    setLoading(true)
    debounce.current = setTimeout(async () => {
      try {
        const data = await api.products.list({ search: value })
        setResults(data.data || [])
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center border border-border bg-bg focus-within:border-accent transition-colors">
        <svg className="w-4 h-4 ml-3 text-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => handleChange(e.target.value)}
          placeholder="Rechercher..."
          aria-label="Rechercher un produit"
          className="w-40 lg:w-56 px-2 py-2 text-sm text-text bg-transparent outline-none placeholder:text-text-dim"
        />
        {loading && <span className="text-xs text-text-dim mr-3">...</span>}
        {query && !loading && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }}
            className="mr-2 text-text-dim hover:text-text p-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-border bg-bg-card z-50 max-h-80 overflow-y-auto">
          {results.map(p => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              onClick={() => { setOpen(false); setQuery('') }}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-surface transition-colors border-b border-border last:border-0"
            >
              {p.image && (
                <div className="w-10 h-8 flex-shrink-0 bg-bg border border-border overflow-hidden">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text truncate">{p.name}</p>
                <p className="text-xs text-text-muted">{Number(p.sale_price).toLocaleString()} MAD</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-border bg-bg-card z-50 p-4 text-center text-sm text-text-muted">
          Aucun résultat pour "{query}"
        </div>
      )}
    </div>
  )
}
