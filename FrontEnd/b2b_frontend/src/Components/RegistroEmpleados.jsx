import React, { useState } from 'react';
import { mostrarAlerta } from './MostrarAlerta';
import { post } from '../Services/Crud';
import '../Style/RegistroEmpleados.css';

function RegistroEmpleados() {
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [cedulaEmpleado, setCedulaEmpleado] = useState('');
  const [correoEmpleado, setCorreoEmpleado] = useState('');
  const [claveEmpleado, setClaveEmpleado] = useState('');

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
      mostrarAlerta("success", "Cédula ingresada correctamente");
      return true;
    } else {
      mostrarAlerta("error", "La cédula no es válida");
      return false;
    }
  };

  const espaciosVacios = () => {
    if (nombreEmpleado.trim() === "" || cedulaEmpleado.trim() === "" || correoEmpleado.trim() === "" || claveEmpleado.trim() === "") {
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
      password: claveEmpleado
    };

    try {
      const response = await post(dataEmpleados, 'crear-usuario/');
      console.log(response);
      if (response && response.success) {
        mostrarAlerta("success", "Registrado exitosamente");
      };
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      mostrarAlerta("error", "Hubo un error al registrar al usuario. Intenta nuevamente.");
    }
  };

  return (
    <div className="development-table-container">
      <h2 className="form-title1">Registrar Empleado</h2>
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
            <td><label htmlFor="claveEmpleado">Contraseña</label></td>
            <td>
              <input
                type="password"
                id="claveEmpleado"
                className="claveEmpleado"
                placeholder="•••••"
                value={claveEmpleado}
                onChange={(e) => setClaveEmpleado(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button" className="btnRegistarEmpleado" onClick={espaciosVacios}>Registrar Empleado</button>
    </div>
  );
}

export default RegistroEmpleados;
