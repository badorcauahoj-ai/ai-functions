export default function Nav() {
  return (
    <nav>
      <div className="nav-island">
        <div className="brand">
          Akt<span>Radar</span>
        </div>
        <div className="nav-links">
          <a href="#jak-to-funguje">Jak to funguje</a>
          <a href="#klasifikator">Klasifikátor</a>
          <a href="#cenik">Ceník</a>
          <a href="#kontakt">Kontakt</a>
        </div>
        <div className="nav-right">
          <a className="btn btn-secondary" href="#kontakt">
            Kontakt
          </a>
          <a className="btn btn-primary" href="#klasifikator">
            Zjistit riziko
          </a>
        </div>
      </div>
    </nav>
  )
}
