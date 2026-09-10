import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import RiskClassifier from './components/RiskClassifier'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
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
          <RiskClassifier />
        </div>
      </section>

      <Pricing />
      <Footer />
    </>
  )
}
