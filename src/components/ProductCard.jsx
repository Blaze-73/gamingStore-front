import { Link } from 'react-router-dom'

export default function ProductCard({ product, variant = 'default' }) {
  const {
    id, model, name, description, cpu, gpu, ram, storage,
    original_price, sale_price, discount, badge, image,
    games, software, screen_size, resolution,
    refresh_rate, panel, includes, type,
  } = product
  const descSnippet = description?.length > 90
    ? description.slice(0, 90) + '…'
    : description

  const hasSpecs = cpu || gpu
  const isMonitor = screen_size || resolution
  const isSetup = includes

  if (variant === 'compact') {
    return (
      <div className="card card-border group">
        <Link to={`/product/${id}`} className="flex gap-4 p-3">
          <div className="w-24 h-20 flex-shrink-0 bg-bg overflow-hidden border border-border">
            {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
          </div>
          <div className="min-w-0 flex-1">
            {model && <span className="tag">{model}</span>}
            <h3 className="text-sm font-medium text-text mt-1 truncate">{name}</h3>
            <span className="text-sm font-semibold text-accent">
              {Number(sale_price).toLocaleString()} <span className="text-xs text-text-muted font-normal">MAD</span>
            </span>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="card card-border group flex flex-col">
      <Link to={`/product/${id}`} className="aspect-[4/3] overflow-hidden border-b border-border bg-bg block">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          {model && <span className="tag">{model}</span>}
          {type && !model && <span className="tag">{type}</span>}
          {badge && !model && <span className="tag-accent">{badge}</span>}
          <span className="tag-api">API</span>
        </div>

        <Link to={`/product/${id}`} className="text-sm font-semibold text-text leading-snug mb-2 block hover:text-accent transition-colors">
          {name}
        </Link>

        {descSnippet && (
          <p className="text-xs text-text-muted leading-relaxed mb-3">{descSnippet}</p>
        )}

        {hasSpecs && (
          <div className="text-xs text-text-muted space-y-0.5 mb-3 leading-relaxed">
            {cpu && <p className="mono"><span className="text-accent">CPU</span> {cpu}</p>}
            {gpu && <p className="mono"><span className="text-accent">GPU</span> {gpu}</p>}
            {ram && <p className="mono"><span className="text-accent">RAM</span> {ram}</p>}
            {storage && <p className="mono"><span className="text-accent">STO</span> {storage}</p>}
          </div>
        )}

        {isMonitor && (
          <div className="text-xs text-text-muted mb-3 mono space-y-0.5">
            <p>{screen_size} · {resolution}</p>
            <p>{refresh_rate} · {panel}</p>
          </div>
        )}

        {isSetup && (
          <ul className="text-xs text-text-muted mb-3 space-y-0.5">
            {includes.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <span className="text-accent">+</span> {item}
              </li>
            ))}
          </ul>
        )}

        {games?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {games.slice(0, 3).map((g) => (
              <span key={g} className="tag">{g}</span>
            ))}
          </div>
        )}

        {software?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {software.slice(0, 3).map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-bold text-accent">
              {Number(sale_price).toLocaleString()} <span className="text-xs text-text-muted font-normal">MAD</span>
            </span>
            {Number(original_price) > Number(sale_price) && (
              <span className="text-xs text-text-dim line-through">
                {Number(original_price).toLocaleString()} MAD
              </span>
            )}
            {Number(discount) > 0 && (
              <span className="text-[10px] font-bold text-accent ml-auto mono">-{discount}%</span>
            )}
          </div>

          <Link
            to={`/product/${id}`}
            className="block w-full py-2 text-xs font-semibold text-center text-accent border border-accent hover:bg-accent hover:text-bg transition-colors"
          >
            Voir le produit
          </Link>
        </div>
      </div>
    </div>
  )
}
