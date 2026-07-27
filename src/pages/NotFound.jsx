import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
      <span className="text-7xl font-black text-text-dim block mb-4">404</span>
      <h1 className="heading text-3xl font-black text-text mb-3">Page introuvable</h1>
      <p className="text-text-muted text-sm mb-8 max-w-md mx-auto">
        On dirait que cette page a été dévorée par un dragon. Retournez à l'accueil.
      </p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  )
}
