import "../Style/NavbarNuevo.css"
import { useNavigate } from 'react-router-dom';

const NavbarNuevo = ({})=>{
    const navigate = useNavigate()
    return(
            <>
             <nav className="encabezado-nav">
                <div className="nav-wrapper">
                    <h1 className="brand-logo">B2B</h1>
                </div>

                <div className="cont-nav-ul">
                    <ul className="d-flex justify-content-center mx-auto encabezado-nav-ul">
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#comentarios">Reseñas</a></li>
                        <li onClick={()=>{navigate("/contactenos")}}><a>Contáctenos</a></li>
                    </ul>
                </div>
                <div className="cont-nav-login">
                    <ul className="d-flex justify-content-center">
                        <a onClick={()=>{navigate("/registroLogin")}}>Registrarse</a>
                    </ul>
                </div>       



            </nav>

            </>
    )
}
export default NavbarNuevo;