import { useState } from 'react'

const TABS = [
  {
    id: 'klasifikace',
    num: 1,
    title: 'Klasifikace rizika',
    body: 'Odpovíte na pár otázek o tom, co váš AI nástroj dělá a kdo se s ním setká. AktRadar okamžitě určí, do jaké rizikové kategorie podle AI Actu patří.',
  },
  {
    id: 'dokumentace',
    num: 2,
    title: 'Generovaná dokumentace',
    body: 'Podle kategorie dostanete konkrétní seznam povinností s odkazem na články zákona — ne obecné rady, ale přesně to, co u vašeho systému chybí.',
  },
  {
    id: 'log',
    num: 3,
    title: 'Audit log',
    body: 'Každé nasazení, změna nebo lidský zásah se zaznamená automaticky, takže při kontrole máte historii připravenou k exportu.',
  },
  {
    id: 'terminy',
    num: 4,
    title: 'Hlídání termínů',
    body: 'Legislativa se dál vyvíjí — dostanete upozornění, jakmile se něco změní u kategorie, do které váš systém patří.',
  },
]

export default function Features() {
  const [active, setActive] = useState(TABS[0].id)
  const current = TABS.find((t) => t.id === active)!

  return (
    <section id="jak-to-funguje">
      <div className="wrap">
        <span className="section-label">JAK TO FUNGUJE</span>
        <h2 className="section-head">Jedna platforma pro klasifikaci, dokumentaci i hlídání termínů.</h2>
        <p className="section-body">
          Nejde o právní poradenství na hodinovku — je to nástroj, co se
          aktualizuje s každým nasazením nové AI funkce ve firmě.
        </p>

        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${active === tab.id ? 'active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.num} · {tab.title}
            </button>
          ))}
        </div>

        <div className="tab-panel">
          <div>
            <h3>{current.title}</h3>
            <p>{current.body}</p>
          </div>
          <div className="float-card" style={{ position: 'static', width: '100%' }}>
            <div className="label">AKTUÁLNÍ KROK</div>
            <div className="value">{current.title}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
