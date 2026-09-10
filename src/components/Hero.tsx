export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-streak" />
      <div className="hero-glow" />
      <div className="wrap hero-inner">
        <div className="eyebrow">
          <span className="dot" />
          VYSOCE RIZIKOVÉ POVINNOSTI PLATÍ OD 2. SRPNA 2026
        </div>
        <h1>
          Zjistěte za 2 minuty,{' '}
          <span className="grad-text">kam vaše AI patří.</span>
        </h1>
        <p className="hero-sub">
          Odpovíte na pár otázek o tom, co vaše AI nástroje dělají. AktRadar
          určí rizikovou kategorii podle AI Actu a rovnou vám dá seznam
          povinností s odkazem na konkrétní články.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#klasifikator">
            Spustit klasifikátor zdarma
          </a>
          <a className="btn btn-ghost" href="#jak-to-funguje">
            Jak to funguje
          </a>
        </div>

        <div className="float-stage">
          <div className="float-card green fc-1">
            <div className="label">STAV SYSTÉMU</div>
            <div className="value">Připraveno</div>
          </div>
          <div className="float-card red fc-2">
            <div className="label">OTEVŘENÉ POVINNOSTI</div>
            <div className="value">2 zbývají</div>
          </div>
          <div className="float-card fc-3">
            <div className="label">POSLEDNÍ KONTROLA</div>
            <div className="value">dnes, 09:14</div>
          </div>
        </div>
      </div>
    </header>
  )
}
