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
    <nav className="navbar" id='Inicio'>
      <div className="navbar-container">
        
      
        {/* Links del menú */}
        <ul className="nav-links">
          <li><a href="#Home">Inicio</a></li>
          <li><a href="#Reseñas">Reseñas</a></li>
          <li><a href="#services">Servicios</a></li>
<<<<<<< HEAD
          <li><a href="#contact">Registrate</a></li>
          <li><a href="/encuestas">Encuestas</a></li>
=======
          <li><button className='btn btn-secondary'  onClick={()=>{navigate("/register")}}>Registrate</button></li>
>>>>>>> 857bb732dff452a32123140dea2d989d1438ff17
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;