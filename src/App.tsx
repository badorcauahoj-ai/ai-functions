import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import RiskClassifier from './components/RiskClassifier'
import History from './components/History'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  // Bumped every time the classifier successfully saves a result,
  // so <History> knows to refetch from the backend.
  const [historyRefresh, setHistoryRefresh] = useState(0)

  return (
    <>
      <Nav />
      <Hero />
      <Features />

      <section id="klasifikator">
        <div className="wrap" style={{ maxWidth: 680 }}>
          <span className="section-label">KLASIFIKÁTOR</span>
          <h2 className="section-head">Vyzkoušejte to rovnou na vlastním AI nástroji.</h2>
          <p className="section-body" style={{ marginBottom: 40 }}>
            Tři otázky, žádná registrace. Výsledek je orientační — pro
            závaznou klasifikaci doporučujeme konzultaci, ale tohle vám řekne,
            kam se dívat jako první.
          </p>
          <RiskClassifier onSaved={() => setHistoryRefresh((k) => k + 1)} />
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap" style={{ maxWidth: 680 }}>
          <span className="section-label">HISTORIE</span>
          <h2 className="section-head">Poslední klasifikace uložené na backendu.</h2>
          <p className="section-body">
            Ne mockup — tohle je opravdu uložené v SQLite databázi přes
            FastAPI. Spusť backend podle README a výsledky se sem propíšou.
          </p>
          <History refreshKey={historyRefresh} />
        </div>
      </section>

      <Pricing />
      <Footer />
    </>
  )
}
