import { useState } from 'react';
import { post } from '../Services/Crud';
import '../Style/FormAreaTrabajo.css';
import { useCookies } from 'react-cookie';
import { mostrarAlerta } from './MostrarAlerta';
import LoadingSpinner from './LoadingSpinner'; // Asegúrate de importar el componente Spinner

const FormAreaTrabajo = () => {
  const [cookies] = useCookies(["empresaId", "nombreEmpresa", 'token']);
  const token = cookies.token;
  const [nombreArea, setNombreArea] = useState('');
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga del spinner

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

      setIsLoading(true); // Mostrar spinner antes de hacer la solicitud

      try {
        if(nombreArea === '') {
          mostrarAlerta("error", 'Por favor, completa todos los campos correctamente.');
          setIsLoading(false); // Ocultar el spinner después de la carga
          return;
        }
        const response = await post(datosFormulario, 'AreaTrabajo/', token);
        if (response.id) {
          mostrarAlerta("success", 'Área de trabajo registrada con éxito');
        } else {
          mostrarAlerta("error", 'Hubo un problema al registrar el área de trabajo');
        }
      } catch (error) {
        mostrarAlerta("error", 'Error al enviar el formulario');
        console.error(error);
      } finally {
        setIsLoading(false); // Ocultar el spinner después de la carga
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
          {formVisible ? '↑' : '↓'}
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
                    <option value="Marketing">Marketing</option>
                    <option value="TI">TI</option>
                    <option value="Atencion al cliente">Atención al cliente</option>
                    <option value="Recursos humanos">Recursos Humanos</option>
                    <option value="Finanzas">Finanzas</option>
                  </select>
                </td>
              </tr>

            </tbody>
          </table>

          <button className="btnRegistrarArea" type="submit" disabled={cookies.empresaId != 0 ? false : true }>Registrar Área de Trabajo</button>

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

      {/* Mostrar el spinner mientras isLoading es verdadero */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default FormAreaTrabajo;
