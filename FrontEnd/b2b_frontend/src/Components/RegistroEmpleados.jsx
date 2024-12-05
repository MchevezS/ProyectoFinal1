import React, { useState } from 'react';
import { mostrarAlerta } from './MostrarAlerta';
import { post } from '../Services/Crud';
import '../Style/RegistroEmpleados.css';
import { useCookies } from 'react-cookie';


function RegistroEmpleados() {

  //HOOK (creacion de cookies) recibe el nombre de la cookie que va a tener 
  const [cookies,setCookies]=useCookies(["empresaId"])

  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [cedulaEmpleado, setCedulaEmpleado] = useState('');
  const [correoEmpleado, setCorreoEmpleado] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState ('');
  //const [claveEmpleado, setClaveEmpleado] = useState('');       (La clave se genera directamente desde el backend)

  const [formVisible, setFormVisible] = useState(true); // Estado para controlar la visibilidad del formulario

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
      rol: rolEmpleado
      //password: claveEmpleado   (LA CLAVE SE GENERA DESDE EL BACKEND)
    };
    console.log(rolEmpleado);
    

    try {
      const response = await post(dataEmpleados, 'crear-empleado/');
      console.log(response);
      if (response && response.success) {
        mostrarAlerta("success", "Registrado exitosamente");

const asignar = {
  empresa:cookies.empresaId,
  trabajador:response.id
}
        const responseEmpleados = await post(asignar,"asignar-empleados/")
        console.log(responseEmpleados);
        
      };
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      mostrarAlerta("error", "Hubo un error al registrar al usuario. Intenta nuevamente.");
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); // Alternar visibilidad del formulario
  };

  return (
    <div className="development-table-container">
      <div className="form-title1">
        <h2>Registrar Empleado</h2>
        {/* Flecha para mostrar/ocultar el formulario */}
        <span className="toggle-arrow" onClick={toggleFormVisibility}>
          {formVisible ? '↓' : '↑'}
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
              <select onChange={(e)=>setRolEmpleado(e.target.value)}> 
              <option value=""selected disabled> Seleccione el rol</option>
              <option value="recursos_humanos">Recursos humanos</option>
              <option value="trabajador">Trabajador</option>

              </select>
            </td>
          </tr>
          {/* /<tr>
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
          </tr> */}
        </tbody>
      </table>
          <button type="button" className="btnRegistarEmpleado" onClick={espaciosVacios}>Registrar Empleado</button>
        </>
      )}
    </div>
  );
}

export default RegistroEmpleados;
