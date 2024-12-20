import AdministradorEmpresas from "../Components/AdministradorEmpresas";
import AdministradorUsuarios from "../Components/AdministradorUsuarios";
import AdministradorEncuestas from "../Components/AdministradorEncuestas";
import { useNavigate } from "react-router-dom";
function AdministradorGeneral() {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    const cookies = document.cookie.split(";"); // Trae todas las cookies que estén guardadas en la página
    
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost;`; 
    }); 
    navigate('/registroLogin') 

  }
  return (
    <>
      <div>
        <ul
          className="nav nav-tabs"
          style={{
            backgroundImage:
              "url('https://www.betterup.com/hubfs/Global%20Hero/0_Hero.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#empresas" onClick={cerrarSesion} >
              Cerrar sesion
            </a>
          </li>
        </ul>
      </div>
      <div className="container">
        <AdministradorEmpresas />
      </div>
      <br />
      <div className="container">
        <AdministradorUsuarios />
      </div>
      <br />
      <div className="container">
        <AdministradorEncuestas />
      </div>
    </>
  );
}

export default AdministradorGeneral;
