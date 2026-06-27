import { Link } from 'react-router-dom'

export default function Hero({ product }) {
  if (!product) return null

  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            {product.model && (
              <span className="tag-accent">{product.model}</span>
            )}
            <h1 className="heading text-4xl md:text-6xl font-black text-text mt-4 leading-[1.04]">
              {product.name}
            </h1>
            <div className="rule-accent mt-5" />
            <div className="mt-5 space-y-1.5 text-sm text-text-muted leading-relaxed max-w-md">
              {product.cpu && <p><span className="mono text-accent text-xs mr-2">CPU</span>{product.cpu}</p>}
              {product.gpu && <p><span className="mono text-accent text-xs mr-2">GPU</span>{product.gpu}</p>}
              {product.ram && <p><span className="mono text-accent text-xs mr-2">RAM</span>{product.ram}</p>}
              {product.storage && <p><span className="mono text-accent text-xs mr-2">STO</span>{product.storage}</p>}
            </div>
            {product.sale_price && (
              <div className="flex items-baseline gap-3 mt-6">
                <span className="text-3xl font-bold text-accent">
                  {Number(product.sale_price).toLocaleString()}{' '}
                  <span className="text-sm text-text-muted font-normal">MAD</span>
                </span>
                {Number(product.original_price) > Number(product.sale_price) && (
                  <span className="text-lg text-text-dim line-through">
                    {Number(product.original_price).toLocaleString()} MAD
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to={`/product/${product.id}`} className="btn btn-primary">
                Voir la fiche
              </Link>
              <Link to="/configurator" className="btn btn-outline">
                Configurer le mien
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            {product.image && (
              <div className="aspect-[4/3] bg-bg-card border border-border overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
