export default function Footer() {
  return (
    <>
      <div className="cta-band" id="kontakt">
        <div className="wrap">
          <h2>
            Zjistěte, do jaké kategorie vaše AI patří,{' '}
            <span className="grad-text">dřív než se zeptá kontrola.</span>
          </h2>
          <a className="btn btn-primary" href="mailto:ahoj@aktradar.cz">
            Napsat na ahoj@aktradar.cz
          </a>
        </div>
      </div>
      <footer>
        <div className="wrap footer-inner">
          <p>AktRadar — nejde o právní poradenství, jde o přehled a dokumentaci.</p>
          <div className="footer-links">
            <a href="#jak-to-funguje">Jak to funguje</a>
            <a href="#cenik">Ceník</a>
            <a href="#kontakt">Kontakt</a>
          </div>
        </div>
      </footer>
    </>
  )
}
