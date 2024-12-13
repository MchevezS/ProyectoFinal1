import { Link } from 'react-router-dom';
import '../Style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Aquí puedes agregar enlaces a los componentes */}
        <ul className="nav-list">
          {/* <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/sobreNosotros" className="nav-link">Sobre Nosotros</Link>
          </li>
          <li className="nav-item">
            <Link to="/contactenos" className="nav-link">Contactenos</Link>
          </li>
          <li className="nav-item">
            <Link to="/formularioEmailJS" className="nav-link">Formulario EmailJS</Link>
          </li>
          <li className="nav-item">
            <Link to="/politica-privacidad" className="nav-link">Política de Privacidad</Link>
          </li>
        </ul>
        {/* Puedes agregar texto de derechos de autor */}
        <p className="copyright">© 2024 Mi Sitio Web B2B. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
