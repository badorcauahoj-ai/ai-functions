export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              VYSOCE RIZIKOVÉ POVINNOSTI PLATÍ OD 2. SRPNA 2026
            </div>
            <h1>Zjistěte za 2 minuty, kam vaše AI patří.</h1>
            <p className="hero-sub">
              Odpovíte na pár otázek o tom, co vaše AI nástroje dělají.
              AktRadar určí rizikovou kategorii podle AI Actu a rovnou vám dá
              seznam povinností s odkazem na konkrétní články.
            </p>
            <div className="hero-ctas">
              <a className="btn btn-primary" href="#klasifikator">
                Spustit klasifikátor zdarma
              </a>
              <a className="btn btn-secondary" href="#jak-to-funguje">
                Jak to funguje
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-panel">
              <div className="visual-grid" />
            </div>
            <div className="float-card mint fc-1">
              <div className="label">STAV SYSTÉMU</div>
              <div className="value">Připraveno</div>
            </div>
            <div className="float-card pink fc-2">
              <div className="label">OTEVŘENÉ POVINNOSTI</div>
              <div className="value">2 zbývají</div>
            </div>
          </div>
        </div>
      </div>

      <div className="proof-strip">
        <div className="wrap proof-inner">
          <span className="proof-label">PRO KOHO TO ŘEŠÍME</span>
          <div className="proof-tags">
            <span>HR týmy</span>
            <span>Finanční instituce</span>
            <span>Zdravotnická zařízení</span>
            <span>Zákaznická podpora</span>
            <span>E-commerce</span>
          </div>
        </div>
      </div>
    </header>
  )
}
