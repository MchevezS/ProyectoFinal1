import '../Style/Navbar.css';
import { useNavigate } from 'react-router-dom';
import Encuestas from '../Pages/CrearEncuestas';
const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="navbar" id='Inicio'>
      <div className="navbar-container">
        
      
        {/* Links del menú */}
        <ul className="nav-links">
          <li><a onClick={()=>{navigate("/")}} href="#Home">Inicio</a></li>
          <li><a onClick={()=>{navigate("/")}} href="#Reseñas">Reseñas</a></li>
          <li><a  href="#services">Servicios</a></li>
          <li><button className='btn btn-secondary'  onClick={()=>{navigate("/registroLogin")}}>Registrate</button></li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;