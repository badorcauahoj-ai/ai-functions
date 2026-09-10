export default function Pricing() {
  return (
    <section className="section-alt" id="cenik">
      <div className="wrap">
        <span className="section-label">CENÍK</span>
        <h2 className="section-head">Cena podle počtu AI nástrojů, ne podle strachu.</h2>

        <div className="price-grid">
          <div className="price-card">
            <div className="price-tier">ZÁKLAD</div>
            <div className="price-name">Přehled</div>
            <div className="price-amount">
              990 Kč <span>/ měsíc</span>
            </div>
            <p className="price-desc">
              Pro firmu s jedním AI nástrojem, co potřebuje mít jistotu, kam patří.
            </p>
            <ul className="price-feats">
              <li>1 klasifikovaný AI systém</li>
              <li>Generovaný checklist povinností</li>
              <li>E-mail při změně legislativy</li>
            </ul>
            <a className="btn btn-ghost btn-block" href="#kontakt">
              Vyzkoušet
            </a>
          </div>

          <div className="price-card featured">
            <div className="price-tier">STANDARD</div>
            <div className="price-name">Provoz</div>
            <div className="price-amount">
              2 490 Kč <span>/ měsíc</span>
            </div>
            <p className="price-desc">
              Pro firmy s víc AI nástroji napříč odděleními, co potřebují audit log.
            </p>
            <ul className="price-feats">
              <li>Až 5 klasifikovaných systémů</li>
              <li>Automatický audit log</li>
              <li>Export k inspekci jedním klikem</li>
              <li>Upozornění na termíny</li>
            </ul>
            <a className="btn btn-primary btn-block" href="#kontakt">
              Vyzkoušet
            </a>
          </div>

          <div className="price-card">
            <div className="price-tier">ENTERPRISE</div>
            <div className="price-name">Na míru</div>
            <div className="price-amount">Dle rozsahu</div>
            <p className="price-desc">
              Pro firmy s vlastním compliance týmem a potřebou integrace na interní systémy.
            </p>
            <ul className="price-feats">
              <li>Neomezený počet systémů</li>
              <li>API a SSO integrace</li>
              <li>Dedikovaný konzultant</li>
            </ul>
            <a className="btn btn-ghost btn-block" href="#kontakt">
              Domluvit hovor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
