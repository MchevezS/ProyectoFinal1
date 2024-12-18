import { MdDashboard } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { CiMenuBurger } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
const BarraLateralNuevo = () => {
    const [cookies] = useCookies(['rolUsuario','token','nombreEmpresa'])
    const navigate = useNavigate()
  
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
            <div className="barra-lateral">
                <div className="barra-lateral-logo">
                    <h2>B2B</h2>
                </div>
                <div className="barra-lateral-menu">
                    <ul className="barra-lateral-menu-lista">
                        <li  onClick={()=>{navigate("/dashboard")}}    className="barra-lateral-menu-icono"><MdDashboard className="me-3" size={25} /></li>
                        <li  onClick={()=>{navigate("/CrearEncuestas")}}   className="barra-lateral-menu-icono"><RiSurveyFill className="me-3" size={25} /></li>
                        <li  onClick={()=>{navigate("/empresas")}}  className="barra-lateral-menu-icono"><IoMdBusiness className="me-3" size={25} /></li>
                        <li  onClick={()=>{navigate("/perfil")}} className="barra-lateral-menu-icono"><ImProfile className="me-3" size={25}/></li>
                        <li  onClick={cerrarSesion} className="barra-lateral-menu-icono"><TbLogout2  className="me-3" size={25}/></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default BarraLateralNuevo;