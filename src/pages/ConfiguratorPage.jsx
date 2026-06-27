import { useState, useEffect } from 'react'
import { api } from '../services/api'

const stepIcons = {
  welcome: '🖥️', cpu: '🧠', motherboard: '📋', gpu: '🎮', ram: '💾',
  ssd: '⚡', hdd: '💽', psu: '🔌', cooler: '❄️', case: '📦', total: '💰',
}

export default function ConfiguratorPage() {
  const [configuratorSteps, setConfiguratorSteps] = useState([])
  const [configuratorOptions, setConfiguratorOptions] = useState({})
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState({
    cpu: '', motherboard: '', gpu: '', ram: '', ssd: '', hdd: 'Aucun', psu: '', cooler: 'Stock Cooler (Inclus)', case: '',
  })

  useEffect(() => {
    api.configurator()
      .then(data => {
        const steps = data.steps || []
        setConfiguratorSteps([
          { id: 'welcome', name: 'Bienvenue' },
          ...steps,
          { id: 'total', name: 'Total' },
        ])
        setConfiguratorOptions(data.options || {})
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const currentStep = configuratorSteps[step]

  const handleSelect = (category, value) => {
    setSelections(prev => ({ ...prev, [category]: value }))
    if (step < configuratorSteps.length - 1) setStep(s => s + 1)
  }

  const total = Object.entries(selections).reduce((sum, [key, val]) => {
    if (!val) return sum
    const found = configuratorOptions[key]?.find(o => o.name === val)
    return sum + (found?.price || 0)
  }, 0)

  if (loading) {
    return (
      <div className="text-center py-20 text-text-dim text-sm">Chargement du configurateur...</div>
    )
  }

  return (
    <div>
      <section className="border-b border-border bg-bg-alt">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <span className="tag-accent">Configurateur</span>
          <h1 className="heading text-4xl md:text-5xl font-black text-text mt-3">
            Construisez votre PC
          </h1>
          <p className="text-text-muted mt-3 text-sm">
            Choisissez chaque composant. On assemble et on livre.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {configuratorSteps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap border transition-colors ${
                i === step
                  ? 'bg-accent text-bg border-accent'
                  : i < step
                    ? 'bg-accent/10 text-accent border-accent/30'
                    : 'border-border text-text-muted'
              }`}
            >
              <span>{stepIcons[s.id]}</span>
              <span className="hidden sm:inline">{s.name}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="card card-border p-8 text-center">
                <span className="text-5xl block mb-4">🖥️</span>
                <h2 className="heading-flat text-xl font-bold text-text mb-2">
                  Bienvenue dans le configurateur
                </h2>
                <p className="text-text-muted text-sm max-w-md mx-auto mb-6">
                  Sélectionnez chaque composant un par un pour construire le PC parfait. On commence par le processeur.
                </p>
                <button onClick={() => setStep(1)} className="btn btn-primary btn-sm">
                  Commencer →
                </button>
              </div>
            )}

            {step > 0 && step < configuratorSteps.length - 1 && (
              <div>
                <h2 className="heading-flat text-lg font-bold text-text mb-1 flex items-center gap-2">
                  <span>{stepIcons[currentStep.id]}</span>
                  <span>Choisissez votre {currentStep.name.toLowerCase()}</span>
                </h2>
                {currentStep.id === 'hdd' && <p className="text-xs text-text-dim mb-4">Optionnel — choisissez "Aucun" si pas besoin.</p>}
                {currentStep.id === 'cooler' && <p className="text-xs text-text-dim mb-4">Ventirad stock inclus avec le processeur.</p>}
                <div className="space-y-1.5 mt-4">
                  {configuratorOptions[currentStep.id]?.map(option => (
                    <button
                      key={option.name}
                      onClick={() => handleSelect(currentStep.id, option.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left border transition-colors ${
                        selections[currentStep.id] === option.name
                          ? 'bg-accent/10 border-accent text-text'
                          : 'border-border text-text-muted hover:border-text-dim bg-bg-card'
                      }`}
                    >
                      <span className="text-sm font-medium">{option.name}</span>
                      <span className="text-sm font-semibold">
                        {option.price === 0 ? 'Inclus' : `${option.price.toLocaleString()} MAD`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step > 0 && step === configuratorSteps.length - 1 && (
              <div className="card card-border p-6 md:p-8">
                <h2 className="heading-flat text-xl font-bold text-text mb-6 flex items-center gap-2">
                  <span>💰</span>
                  Récapitulatif
                </h2>
                <div className="space-y-2 mb-8">
                  {Object.entries(selections).map(([key, val]) => {
                    if (!val) return null
                    const found = configuratorOptions[key]?.find(o => o.name === val)
                    return (
                      <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span>{stepIcons[key]}</span>
                          <span className="text-sm text-text-muted truncate">{val}</span>
                        </div>
                        <span className="text-sm font-medium text-text ml-2">
                          {found?.price ? `${found.price.toLocaleString()} MAD` : '—'}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="text-center py-4 border-t border-border">
                  <p className="text-xs text-text-dim mb-1">Total estimé</p>
                  <p className="text-3xl font-bold text-accent">
                    {total.toLocaleString()} <span className="text-sm text-text-muted font-normal">MAD</span>
                  </p>
                  <button className="btn btn-primary mt-5 btn-sm">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="card card-border p-5 sticky top-20">
              <p className="mono text-[10px] font-bold text-accent uppercase tracking-widest mb-3">Total</p>
              <p className="text-2xl font-bold text-text mb-5">
                {total.toLocaleString()} <span className="text-xs text-text-muted font-normal">MAD</span>
              </p>
              <div className="space-y-1">
                {configuratorSteps.slice(1, -1).map(s => {
                  const val = selections[s.id]
                  return (
                    <div key={s.id} className={`flex items-center gap-2 text-xs p-1.5 ${val ? 'text-text bg-bg-alt' : 'text-text-dim'}`}>
                      <span>{stepIcons[s.id]}</span>
                      <span className="truncate">{val || s.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
