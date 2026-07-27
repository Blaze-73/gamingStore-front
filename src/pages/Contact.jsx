import { useState } from 'react'
import { api } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', message: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await api.contact(form)
      setDone(true)
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'envoi')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <span className="text-5xl block mb-4">✓</span>
        <h1 className="heading text-3xl font-black text-text mb-3">Message envoyé</h1>
        <p className="text-text-muted text-sm mb-6">On vous répond sous 24h.</p>
        <button onClick={() => { setDone(false); setForm({ name: '', email: '', phone: '', city: '', message: '' }) }}
          className="btn btn-outline btn-sm">Nouveau message</button>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">Contact</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3">On reste en contact</h1>
          <p className="text-text-muted mt-3 max-w-xl text-sm leading-relaxed">
            Une question, un devis sur mesure, un souci avec votre commande ? On est là.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-1.5 block">Nom complet *</label>
                <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-bg border border-border text-text text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-1.5 block">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-bg border border-border text-text text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-1.5 block">Téléphone</label>
                <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-bg border border-border text-text text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-1.5 block">Ville</label>
                <input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-bg border border-border text-text text-sm focus:border-accent outline-none transition-colors" />
              </div>
              <div>
                <label className="mono text-[10px] font-semibold text-accent uppercase tracking-widest mb-1.5 block">Message *</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-bg border border-border text-text text-sm focus:border-accent outline-none transition-colors resize-y" />
              </div>
              {error && <p className="text-xs text-accent">{error}</p>}
              <button type="submit" disabled={sending}
                className="btn btn-primary w-full justify-center">
                {sending ? 'Envoi...' : 'Envoyer'}
              </button>
            </form>
          </div>
          <div>
            <div className="card card-border p-6 space-y-5">
              <div>
                <h3 className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-2">Téléphone</h3>
                <p className="text-sm text-text">05 30 24 55 55</p>
              </div>
              <div className="rule" />
              <div>
                <h3 className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-2">Email</h3>
                <p className="text-sm text-text">contact@snakegaming.ma</p>
              </div>
              <div className="rule" />
              <div>
                <h3 className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-2">Villes</h3>
                <p className="text-sm text-text-muted">Tanger · Rabat · Casablanca · Marrakech</p>
              </div>
              <div className="rule" />
              <div>
                <h3 className="text-xs font-semibold text-text-dim uppercase tracking-widest mb-2">Horaires</h3>
                <p className="text-sm text-text-muted">Lun–Ven 9h–18h · Sam 10h–14h</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
