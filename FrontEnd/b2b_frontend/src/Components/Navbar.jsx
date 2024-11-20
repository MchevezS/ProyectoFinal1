import '../Style/Navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  // Estado para controlar el menú hamburguesa
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        
        {/* Links del menú */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#Home">Inicio</a></li>
          <li><a href="#Reseñas">Reseñas</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><button onClick={()=>{navigate("/register")}}>Registrate</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;