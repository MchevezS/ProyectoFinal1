import '../Style/CardPerfilUsuario.css';
import { useState } from 'react';
import CambioCredencialesUsuario from "../Components/CambioCredencialesUsuario";
import { useCookies } from "react-cookie";

const CardPerfilUsuario= ({})=>{
    const [mostrarCambio,setMostrarCambio]=useState(false);
  const [cookie] = useCookies(["nombreUsuario",'areaUsuario'])

    return (
        <div className="card mx-auto mt-4" style={{ width: "25rem",height:"auto" ,borderRadius: "15px", overflow: "hidden" }}>
          {/* Imagen de fondo */}
          <div className="bg-image" style={{ height: "100px", backgroundColor: "#001F54" }}></div>
          
          {/* Contenido del perfil */}
          <div className="text-center p-3">
            {/* Imagen de perfil */}
            <div className="profile-pic mx-auto" style={{ marginTop: "-40px" }}>
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                className="rounded-circle border border-3 border-white"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            </div>
            {/* Nombre y descripción */}
            <h5 className="mt-3 mb-1">{cookie.nombreUsuario}</h5>
            <p className="text-muted mb-3">{cookie.areaUsuario}</p>
            
            <div className="d-flex justify-content-between px-3">
              <div>
                <h6 className="mb-0">1</h6>
                <small className="text-muted">Encuestas Respondidas</small>
              </div>
              <div>
                <h6 className="mb-0">2024-06-03</h6>
                <small className="text-muted">Fecha de Contratación</small>
              </div>
              <div>
                <h6 className="mb-0">2</h6>
                <small className="text-muted">Tiempo trabajando</small>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={()=>setMostrarCambio(!mostrarCambio)}>Cambiar contraseña</button>
          </div>
          {mostrarCambio && <CambioCredencialesUsuario/>}
         
        </div>
      );
}
export default CardPerfilUsuario;