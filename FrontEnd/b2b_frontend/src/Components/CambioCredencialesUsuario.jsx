import { useState } from "react";
import { mostrarAlerta } from "./MostrarAlerta";
import { useCookies } from "react-cookie";
import { patch } from "../Services/Crud";
const CambioCredencialesUsuario = ({})=>{
    const [claveActual,setClaveActual] = useState('')
    const [nuevaClave,setNuevaClave] = useState('')
    const [confirmarClave,setConfirmarClave] = useState('')    
    const [cookies] = useCookies(['nombreUsuario'])
    
    const cambiarClave = async ()=>{
      if (nuevaClave !== confirmarClave){
        mostrarAlerta('warning','Las contraseñas no coinciden')
      }
      else{
        const credenciales = {
          username: cookies.nombreUsuario,
          password: claveActual,
          clave_nueva: nuevaClave
        }
        const peticion = await patch('cambio-clave','',credenciales)
        if (peticion.status === 200){
          mostrarAlerta('success','Contraseña cambiada correctamente')
        }
        else{
          mostrarAlerta('error','Contraseña actual incorrecta')
        }
        console.log(peticion)
      }

    
      return (
        <>
            <div className='d-flex flex-column gap-3'>
              <label className='mt-3'>Cambio de credenciales</label>
              <input placeholder={"Contraseña actual"} onChange={(e)=>setClaveActual(e.target.value)}/>
              <input placeholder={"Nueva contraseña"} onChange={(e)=>setNuevaClave(e.target.value)}/>
              <input placeholder={"Confirmar nueva contraseña"} onChange={(e)=>setConfirmarClave(e.target.value)}/>
              <button className='btn btn-primary'>Confirmar Cambio</button>
            </div>
        </>
      );
    };
}
export default CambioCredencialesUsuario