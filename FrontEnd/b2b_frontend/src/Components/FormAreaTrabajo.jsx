import { useState } from 'react';
import { post } from '../Services/Crud';
import '../Style/FormAreaTrabajo.css';
import { useCookies } from 'react-cookie';
import { mostrarAlerta } from './MostrarAlerta';

const FormAreaTrabajo = () => {
  const [cookies] = useCookies(["empresaId"]);
  const [nombreArea, setNombreArea] = useState('');
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [formVisible, setFormVisible] = useState(true);

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = [];

    if (!nombreArea) {
      erroresTemp.push('El nombre del área de trabajo es obligatorio');
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  // Manejar el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const datosFormulario = {
        nombre_area: nombreArea,
        empresa: cookies.empresaId
      };

      try {
        const response = await post(datosFormulario, 'AreaTrabajo/');
        if (response.id) {
          mostrarAlerta("success", 'Área de trabajo registrada con éxito');
        } else {
          mostrarAlerta("error", 'Hubo un problema al registrar el área de trabajo');
        }
      } catch (error) {
        mostrarAlerta("error", 'Error al enviar el formulario');
        console.error(error);
      }
    } else {
      setMensajeError('Por favor, completa todos los campos correctamente.');
    }
  };

  // Alternar visibilidad del formulario
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="development-table-container">
      <div className="form-title1">
        <h2>Registrar Área de Trabajo</h2>
        <span className="toggle-arrow" onClick={toggleFormVisibility}>
          {formVisible ? '↓' : '↑'}
        </span>
      </div>

      {formVisible && (
        <form onSubmit={manejarEnvio}>
          <table className="table">
            <tbody>
              <tr>
                <td><label className="labelNombreArea">Nombre del área de trabajo:</label></td>
                <td>
                  <select onChange={(e) => setNombreArea(e.target.value)}>
                    <option value="" disabled selected>Seleccione el área</option>
                    <option value="marketing">Marketing</option>
                    <option value="ti">TI</option>
                    <option value="atencion_cliente">Atención al cliente</option>
                    <option value="recursos_humanos">Recursos Humanos</option>
                    <option value="finanzas">Finanzas</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label className="labelEmpresa">Empresa:</label></td>
                <td>
                  <input type="text" value={cookies.empresaId || ''} disabled />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btnRegistrarArea" type="submit">Registrar Área de Trabajo</button>

          {/* Mostrar errores */}
          {mensajeError && <div className="alerta-error">{mensajeError}</div>}

          {errores.length > 0 && (
            <div className="alerta-error">
              <ul>
                {errores.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default FormAreaTrabajo;
