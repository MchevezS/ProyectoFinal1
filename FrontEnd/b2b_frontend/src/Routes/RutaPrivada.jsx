import { useCookies } from "react-cookie"
const tipoUsuario = ()=>{
    const [cookie] = useCookies(['rolUsuario'])
    return cookie.rolUsuario
}
const RutaPrivada = ({ children, rol }) => {
    const usuarioRol = tipoUsuario();
  
    const tieneAcceso = Array.isArray(rol) ? rol.includes(usuarioRol) : usuarioRol === rol;
  
    return tieneAcceso ? children : <h1>VA JALANDO</h1>;
  };
  
  export default RutaPrivada;