import '../Style/CardPerfilUsuario.css';
import { useState, useEffect } from 'react';
import CambioCredencialesUsuario from "../Components/CambioCredencialesUsuario";
import { useCookies } from "react-cookie";
import { mostrarAlerta } from "./MostrarAlerta";
import { getFilter, patch,subirImagenPerfil } from "../Services/Crud";
import LoadingSpinner from "../Components/LoadingSpinner"; // Importar el spinner

const CardPerfilUsuario = () => {
  const [mostrarCambio, setMostrarCambio] = useState(false);
  const [mostrarCambioFoto, setMostrarCambioFoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el spinner
  const [cookie,setCookie] = useCookies(["nombreUsuario", 'areaUsuario', 'empresaId', 'token','foto']);
  const [imagen, setImagen] = useState(null);
  const [claveActual, setClaveActual] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const token = cookie.token;


  const cambiarClave = async () => {
    if (nuevaClave !== confirmarClave) {
      mostrarAlerta('warning', 'Las contraseñas no coinciden');
      return;
    }
 
    const credenciales = {
      username: cookie.nombreUsuario,
      password: claveActual,
      clave_nueva: nuevaClave,
    };

    setIsLoading(true); // Activar el spinner mientras se realiza el cambio de contraseña

    try {
      const peticion = await patch('cambio-clave', '', credenciales, token);
      if (peticion.status === 200) {
        mostrarAlerta('success', 'Contraseña cambiada correctamente');
      } else if (peticion.status === 400) {
        mostrarAlerta('error', 'Contraseña actual incorrecta');
      }
    } catch (error) {
      mostrarAlerta('error', 'Error al cambiar la contraseña');
    } finally {
      setIsLoading(false); // Desactivar el spinner al finalizar la solicitud
    }
  };

  const cambioPerfilImagen = async (username) => {
    const peticion = await subirImagenPerfil(imagen, 'upload-image');
    
    const actualizarImagen = await fetch(`http://127.0.0.1:8000/api/cambio-imagen/`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username: username,
        imagen_perfil: peticion.url
      })
    })
    setCookie('foto', peticion.url);
    setMostrarCambioFoto(!mostrarCambioFoto);
  }

  return (
    <div className="card mx-auto mt-4" style={{ width: "25rem", height: "auto", borderRadius: "15px", overflow: "hidden"}}>
      {/* Spinner mientras se cargan los datos */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Imagen de fondo */}
          <div style={{ height: "150px", backgroundColor: "#021321" }}></div>

          {/* Contenido del perfil */}
          <div className="text-center p-3">
            {/* Imagen de perfil */}
            <div className="profile-pic mx-auto" style={{ marginTop: "-40px" }}>
              <img
                src={cookie.foto}
                alt="Profile"
                className="rounded-circle  border-3"
                style={{ maxHeight: "150px", maxWidth: "150px", objectFit: "contain", border:"4px solid #021321" }}
              />
            </div>
            {/* Nombre y descripción */}
            <h5 className="mt-3 mb-1">{cookie.nombreUsuario}</h5>
            <p className="text-muted mb-3">{cookie.areaUsuario}</p>
          </div>

          <div className="d-flex justify-content-center">
            <button className="btn" style={{border:"2px solid #c91459",color:"#c91459"}} onClick={() => {
              setMostrarCambio(!mostrarCambio)
              setMostrarCambioFoto(false)
            }}>Cambiar contraseña</button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button className="btn" style={{border:"2px solid #c91459",color:"#c91459"}} onClick={() => {
              setMostrarCambioFoto(!mostrarCambioFoto)
              setMostrarCambio(false)
            }}>Cambiar foto</button>
          </div>
          {mostrarCambio && (
            <div className="d-flex flex-column gap-3">
              <label className="mt-3">Cambio de credenciales</label>
              <input placeholder={"Contraseña actual"} onChange={(e) => setClaveActual(e.target.value)} />
              <input placeholder={"Nueva contraseña"} onChange={(e) => setNuevaClave(e.target.value)} />
              <input placeholder={"Confirmar nueva contraseña"} onChange={(e) => setConfirmarClave(e.target.value)} />
              <button className="btn" style={{border:"2px solid #c91459",color:"#c91459"}} onClick={cambiarClave}>
                {isLoading ? <LoadingSpinner /> : "Confirmar Cambio"}
              </button>
            </div>
          )}
          {mostrarCambioFoto && (
             <div className="d-flex flex-column gap-3">
             <label className="mt-3">Cambio de Foto</label>
             <input type='file' placeholder={"Cambio foto"}  onChange={(e) => setImagen(e.target.files[0])} />
             <button className="btn" style={{border:"2px solid #c91459",color:"#c91459"}} onClick={()=>{cambioPerfilImagen(cookie.nombreUsuario)}}>
               {isLoading ? <LoadingSpinner /> : "Confirmar Cambio"}
             </button>
           </div>
          )}
        </>
      )}
    </div>
  );
};

export default CardPerfilUsuario;
