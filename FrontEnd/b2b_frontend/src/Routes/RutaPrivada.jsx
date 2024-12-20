import { useCookies } from "react-cookie"
import AccesoDenegado from "../Components/AccesoDenegado"

const tipoUsuario = ()=>{
    const [cookie] = useCookies(['rolUsuario'])
    return cookie.rolUsuario
}
const RutaPrivada = ({ children, rol }) => {
    const usuarioRol = tipoUsuario();
  
    const tieneAcceso = Array.isArray(rol) ? rol.includes(usuarioRol) : usuarioRol === rol;
  
    return tieneAcceso ? children : <AccesoDenegado/>
  };
  
  export default RutaPrivada;