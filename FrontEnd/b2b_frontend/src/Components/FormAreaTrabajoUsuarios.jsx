import '../Style/FormAreaTrabajoUsuarios.css';
import { useState, useEffect } from 'react';
import { post, get, getFilter } from '../Services/Crud';
import { useCookies } from 'react-cookie';
import { mostrarAlerta } from './MostrarAlerta';
import LoadingSpinner from './LoadingSpinner'; // Asegúrate de importar el componente Spinner

const FormAreaTrabajoUsuarios = () => {
  const [cookies] = useCookies(['empresaId', 'nombreEmpresa', 'token']);
  const [areasTrabajo, setAreasTrabajo] = useState([]);
  const token = cookies.token;
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [empleado, setEmpleado] = useState('');
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga del spinner

  // Cargar áreas de trabajo, empresas y empleados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasData = await get('AreaTrabajo');
        setAreasTrabajo(areasData);
      } catch (error) {
        console.error(error);
        setMensajeError('Error al cargar los datos');
      }
    };

    const traerEmpleados = async () => {
      try {
        const empleadosEmpresa = await getFilter('traer-empleados', cookies.empresaId || 0, 'empresa_id');
        setListaEmpleados(empleadosEmpresa);
      } catch (error) {
        console.error(error);
        setMensajeError('Error al cargar los empleados');
      }
    };

    const traerAreas = async () => {
      try {
        const areasEmpresa = await getFilter('areas-trabajo', cookies.empresaId || 0, 'empresa_id');
        setAreasTrabajo(areasEmpresa);
      } catch (error) {
        console.error(error);
        setMensajeError('Error al cargar las áreas de trabajo');
      }
    };

    fetchData();
    traerEmpleados();
    traerAreas();
  }, [cookies.empresaId]);

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = [];

    if (!areaSeleccionada) erroresTemp.push('El área de trabajo es obligatoria');
    if (!empleado) erroresTemp.push('Debe seleccionar un empleado');

    setErrores(erroresTemp);
    return erroresTemp.length === 0;
  };

  // Manejo del envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const datosFormulario = {
        usuario: empleado,
        area_trabajo: areaSeleccionada,
        empresa: cookies.empresaId,
      };

      setIsLoading(true); // Mostrar spinner antes de hacer la solicitud

      try {
        const response = await post(datosFormulario, 'asignar_usuario/', token);
        if (response.id) {
          mostrarAlerta('success', 'Usuario asignado correctamente');
        } else {
          mostrarAlerta('error', 'Hubo un problema al asignar el usuario');
        }
      } catch (error) {
        console.error(error);
        mostrarAlerta('error', 'Error al asignar el usuario');
      } finally {
        setIsLoading(false); // Ocultar el spinner después de la carga
      }
    } else {
      setMensajeError('Por favor, completa todos los campos.');
    }
  };

  // Alternar visibilidad del formulario
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="development-table-container">
      <div className="form-title1">
        <h2>Asignar Usuario a Área de Trabajo</h2>
        <span className="toggle-arrow" onClick={toggleFormVisibility}>
          {formVisible ? '↑' : '↓'}
        </span>
      </div>

      {formVisible && (
        <form onSubmit={manejarEnvio}>
          <table className="table">
            <tbody>
              <tr>
                <td><label className="labelAreaU">Área de Trabajo:</label></td>
                <td>
                  <select
                    className="areaSelect"
                    value={areaSeleccionada}
                    onChange={(e) => setAreaSeleccionada(e.target.value)}
                  >
                    <option value="" disabled>Seleccione un área de trabajo</option>
                    {areasTrabajo.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.nombre_area}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label className="labelEmpleado">Seleccione el empleado:</label></td>
                <td>
                  <select
                    className="empleadoSelect"
                    value={empleado}
                    onChange={(e) => setEmpleado(e.target.value)}
                  >
                    <option value="" disabled>Lista de empleados</option>
                    {listaEmpleados.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.username}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label className="labelEmpleado">Empresa</label></td>
                <td>
                  <input value={cookies.nombreEmpresa} disabled />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btnAsignar" disabled={cookies.empresaId != 0 ? false : true} type="submit">Asignar</button>

          {/* Mostrar mensaje de error si existe */}
          {mensajeError && <div className="error-text">{mensajeError}</div>}

          {/* Mostrar lista de errores */}
          {errores.length > 0 && (
            <div className="error-text">
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

export default FormAreaTrabajoUsuarios;
