export default function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null

  const pages = []
  for (let i = 1; i <= lastPage; i++) {
    if (i === 1 || i === lastPage || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-xs font-medium border border-border text-text-muted hover:text-text hover:border-text-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Précédent
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-text-dim text-xs">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
              p === currentPage
                ? 'bg-accent text-bg border-accent'
                : 'border-border text-text-muted hover:text-text hover:border-text-dim'
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-3 py-1.5 text-xs font-medium border border-border text-text-muted hover:text-text hover:border-text-dim transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Suivant →
      </button>
    </div>
  )
}
