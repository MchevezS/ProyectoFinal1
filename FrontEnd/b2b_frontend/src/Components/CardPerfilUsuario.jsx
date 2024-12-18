import '../Style/CardPerfilUsuario.css';
import { useState, useEffect } from 'react';
import CambioCredencialesUsuario from "../Components/CambioCredencialesUsuario";
import { useCookies } from "react-cookie";
import { mostrarAlerta } from "./MostrarAlerta";
import { getFilter, patch } from "../Services/Crud";
import LoadingSpinner from "../Components/LoadingSpinner"; // Importar el spinner

const CardPerfilUsuario = () => {
  const [mostrarCambio, setMostrarCambio] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el spinner
  const [cookie] = useCookies(["nombreUsuario", 'areaUsuario', 'empresaId', 'token']);
  const [claveActual, setClaveActual] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [fechaContratacion, setFechaContratacion] = useState('');
  const token = cookie.token;

  useEffect(() => {
    async function TraerDatos() {
      setIsLoading(true); // Activar el spinner al iniciar la solicitud
      try {
        const peticion = await getFilter("traer-empleados/", cookie.empresaId, "empresa_id");
        console.log(peticion);
        setFechaContratacion(peticion.date_joined);
      } catch (error) {
        mostrarAlerta('error', 'Error al cargar los datos');
        console.error(error);
      } finally {
        setIsLoading(false); // Desactivar el spinner al finalizar la solicitud
      }
    }
    TraerDatos();
  }, [cookie.empresaId]);

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
      console.error(error);
    } finally {
      setIsLoading(false); // Desactivar el spinner al finalizar la solicitud
    }
  };

  return (
    <div className="card mx-auto mt-4" style={{ width: "25rem", height: "auto", borderRadius: "15px", overflow: "hidden" }}>
      {/* Spinner mientras se cargan los datos */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
                <h6 className="mb-0">{fechaContratacion}</h6>
                <small className="text-muted">Fecha de Contratación</small>
              </div>
              <div>
                <h6 className="mb-0">2</h6>
                <small className="text-muted">Tiempo trabajando</small>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" onClick={() => setMostrarCambio(!mostrarCambio)}>Cambiar contraseña</button>
          </div>
          {mostrarCambio && (
            <div className="d-flex flex-column gap-3">
              <label className="mt-3">Cambio de credenciales</label>
              <input placeholder={"Contraseña actual"} onChange={(e) => setClaveActual(e.target.value)} />
              <input placeholder={"Nueva contraseña"} onChange={(e) => setNuevaClave(e.target.value)} />
              <input placeholder={"Confirmar nueva contraseña"} onChange={(e) => setConfirmarClave(e.target.value)} />
              <button className="btn btn-primary" onClick={cambiarClave}>
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
