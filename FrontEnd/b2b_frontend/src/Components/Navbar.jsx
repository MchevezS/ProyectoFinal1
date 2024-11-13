import '../Style/Navbar.css'
import { useState } from 'react';


const Navbar = () => {
  // Estado para controlar el menú hamburguesa
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="#home" className="logo">Mi Sitio</a>

        {/* Icono de menú (hamburguesa) */}
        <div className="menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Links del menú */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#home">Inicio</a></li>
          <li><a href="#Testimonios">Testimonios</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;