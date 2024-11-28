import '../Style/NavContactenos.css'; // Asegúrate de tener el estilo adecuado

function NavContactenos() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Contáctanos</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Usamos href para el scroll dentro de la misma página */}
            <li className="nav-item">
              <a className="nav-link" href="#preguntas-frecuentes">Preguntas frecuentes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#servicio-al-cliente">Servicio al cliente</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#llamar">Llamar</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavContactenos;
