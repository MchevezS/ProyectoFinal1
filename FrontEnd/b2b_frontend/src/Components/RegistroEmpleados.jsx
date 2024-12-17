import React, { useState } from 'react';
import { mostrarAlerta } from './MostrarAlerta';
import { post } from '../Services/Crud';
import '../Style/RegistroEmpleados.css';
import { useCookies } from 'react-cookie';
import LoadingSpinner from './LoadingSpinner'; // Asegúrate de importar el componente Spinner

function RegistroEmpleados() {
  const [cookies, setCookies] = useCookies(["empresaId", 'token']);
  const token = cookies.token;
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [cedulaEmpleado, setCedulaEmpleado] = useState('');
  const [correoEmpleado, setCorreoEmpleado] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');
  const [formVisible, setFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga del spinner

  const formatoNombre = () => {
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(nombreEmpleado)) {
      mostrarAlerta("error", "El nombre solo puede tener letras");
      return false;
    }
    if (nombreEmpleado.length < 2) {
      mostrarAlerta("error", "El nombre debe tener al menos 2 caracteres");
      return false;
    }
    return true;
  };

  const validarCedulaEmpleado = (cedulaEmpleado) => {
    cedulaEmpleado = cedulaEmpleado.replace(/[^0-9]/g, "");
    if (cedulaEmpleado.length === 9 && !isNaN(cedulaEmpleado)) {
      return true;
    } else {
      mostrarAlerta("error", "La cédula no es válida");
      return false;
    }
  };

  const espaciosVacios = () => {
    if (nombreEmpleado.trim() === "" || cedulaEmpleado.trim() === "" || correoEmpleado.trim() === "") {
      mostrarAlerta("error", "Llenar espacios vacíos");
      return;
    }
    if (!formatoNombre()) return;
    if (!validarCedulaEmpleado(cedulaEmpleado)) return;

    registroUsuarios();
  };

  const registroUsuarios = async () => {
    const dataEmpleados = {
      username: nombreEmpleado,
      cedula: cedulaEmpleado,
      email: correoEmpleado,
      rol: rolEmpleado,
    };

    setIsLoading(true); // Mostrar spinner antes de hacer la solicitud

    try {
      const response = await post(dataEmpleados, 'crear-empleado/', token);
      console.log(response);
      if (response && response.success) {
        mostrarAlerta("success", "Registrado exitosamente");

        const asignar = {
          empresa: cookies.empresaId,
          trabajador: response.id
        };

        const responseEmpleados = await post(asignar, "asignar-empleados/", token);
        console.log(responseEmpleados);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      mostrarAlerta("error", "Hubo un error al registrar al usuario. Intenta nuevamente.");
    } finally {
      setIsLoading(false); // Ocultar el spinner después de la carga
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); // Alternar visibilidad del formulario
  };

  return (
    <div className="development-table-container">
      <div className="form-title1">
        <h2>Registrar Empleado</h2>
        <span className="toggle-arrow" onClick={toggleFormVisibility}>
          {formVisible ? '↑' : '↓'}
        </span>
      </div>

      {formVisible && (
        <>
          <table className="table">
            <tbody>
              <tr>
                <td><label htmlFor="nombreEmpleado">Nombre de usuario</label></td>
                <td>
                  <input
                    type="text"
                    id="nombreEmpleado"
                    className="nombreEmpleado"
                    placeholder="Nombre de usuario"
                    value={nombreEmpleado}
                    onChange={(e) => setNombreEmpleado(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="cedulaEmpleado">Cédula de Identidad</label></td>
                <td>
                  <input
                    type="text"
                    id="cedulaEmpleado"
                    className="cedulaEmpleado"
                    placeholder="Cédula de identidad"
                    value={cedulaEmpleado}
                    onChange={(e) => setCedulaEmpleado(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="correoEmpleado">Correo Electrónico</label></td>
                <td>
                  <input
                    type="email"
                    id="correoEmpleado"
                    className="correoEmpleado"
                    placeholder="Correo Electrónico"
                    value={correoEmpleado}
                    onChange={(e) => setCorreoEmpleado(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor=""> Rol del empleado</label>
                </td>
                <td>
                  <select onChange={(e) => setRolEmpleado(e.target.value)}>
                    <option value="" selected disabled> Seleccione el rol</option>
                    <option value="recursos_humanos">Recursos humanos</option>
                    <option value="trabajador">Trabajador</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="btnRegistarEmpleado" onClick={espaciosVacios}>Registrar Empleado</button>
        </>
      )}

      {/* Mostrar el spinner mientras isLoading es verdadero */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default RegistroEmpleados;
