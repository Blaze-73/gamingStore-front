const API_BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Accept': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || res.statusText)
  }
  return res.json()
}

export const api = {
  products: {
    list(params = {}) {
      const q = new URLSearchParams()
      if (params.category) q.set('category', params.category)
      if (params.featured) q.set('featured', 'true')
      if (params.search) q.set('search', params.search)
      if (params.page) q.set('page', params.page)
      const qs = q.toString()
      return request(`/products${qs ? `?${qs}` : ''}`)
    },
    get(id) {
      return request(`/products/${id}`)
    },
  },
  categories: {
    list() {
      return request('/categories')
    },
    get(slug) {
      return request(`/categories/${slug}`)
    },
  },
  configurator() {
    return request('/configurator')
  },
  contact(data) {
    return request('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  },
}
