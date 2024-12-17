import { useState } from "react";
import { mostrarAlerta } from "./MostrarAlerta";
import { useCookies } from "react-cookie";
import { patch } from "../Services/Crud";
import LoadingSpinner from "../Components/LoadingSpinner"; 

const CambioCredencialesUsuario = () => {
  const [claveActual, setClaveActual] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el spinner en el botón
  const [cookies] = useCookies(['nombreUsuario', 'token']);
  const token = cookies.token;

  // Función para cambiar la contraseña
  const cambiarClave = async () => {
    if (nuevaClave !== confirmarClave) {
      mostrarAlerta('warning', 'Las contraseñas no coinciden');
    } else {
      const credenciales = {
        username: cookies.nombreUsuario,
        password: claveActual,
        clave_nueva: nuevaClave,
      };

      try {
        setLoading(true); // Se Activa el spinner mientras se realiza la petición

        const peticion = await patch('cambio-clave', '', credenciales, token);

        if (peticion.status === 200) {
          mostrarAlerta('success', 'Contraseña cambiada correctamente');
        } else {
          mostrarAlerta('error', 'Contraseña actual incorrecta');
        }

        console.log(peticion);
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        mostrarAlerta('error', 'Error al realizar la petición');
      } finally {
        setLoading(false); // Desactivar el spinner después de la petición
      }
    }
  };

  return (
    <>
      <div className='d-flex flex-column gap-3'>
        <label className='mt-3'>Cambio de credenciales</label>
        <input
          placeholder={"Contraseña actual"}
          onChange={(e) => setClaveActual(e.target.value)}
        />
        <input
          placeholder={"Nueva contraseña"}
          onChange={(e) => setNuevaClave(e.target.value)}
        />
        <input
          placeholder={"Confirmar nueva contraseña"}
          onChange={(e) => setConfirmarClave(e.target.value)}
        />
        
        <button
          className='btn btn-primary'
          onClick={cambiarClave}
          disabled={loading} // Deshabilitar botón mientras está cargando
        >
          {loading ? <LoadingSpinner small /> : "Confirmar Cambio"}
        </button>
      </div>
    </>
  );
};

export default CambioCredencialesUsuario;
