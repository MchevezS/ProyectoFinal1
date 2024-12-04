import '../Style/FormAreaTrabajoUsuarios.css';
import { useState, useEffect } from 'react';
import { post, get } from '../Services/Crud';
import { mostrarAlerta } from './MostrarAlerta';

const FormAreaTrabajoUsuarios = () => {
  const [areasTrabajo, setAreasTrabajo] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Estado para controlar la visibilidad del formulario

  // Cargar áreas de trabajo y empresas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasData = await get('AreaTrabajo');
        const empresasData = await get('empresas');
        setAreasTrabajo(areasData);
        setEmpresas(empresasData);
      } catch (error) {
        console.error(error);
        setMensajeError('Error al cargar los datos');
      }
    };
    fetchData();
  }, []);

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = [];

    if (!areaSeleccionada) {
      erroresTemp.push('El área de trabajo es obligatoria');
      esValido = false;
    }

    if (!empresaSeleccionada) {
      erroresTemp.push('La empresa es obligatoria');
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  // Manejo del envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const datosFormulario = {
        area_trabajo_id: areaSeleccionada,
        empresa_id: empresaSeleccionada
      };

      try {
        const response = await post(datosFormulario, 'asignar_usuario_area');
        if (response && response.success) {
          mostrarAlerta("success",'Usuario asignado correctamente');
        } else {
          mostrarAlerta("error",'Hubo un problema al asignar el usuario');
        }
      } catch (error) {
        console.error(error);
        mostrarAlerta("error",'Error al asignar el usuario');
      }
    } else {
      setMensajeError('Por favor, completa todos los campos.');
    }
  };

  // Función para alternar la visibilidad del formulario
  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); // Alterna la visibilidad del formulario
  };

  return (
    <div className="development-table-container">
      <div className="form-title1">
        <h2>Asignar Usuario a Área de Trabajo</h2>
        {/* Flecha para mostrar/ocultar el formulario */}
        <span className="toggle-arrow" onClick={toggleFormVisibility}>
          {formVisible ? '↓' : '↑'}
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
                    <option className="optionArea" value="">Seleccione un área de trabajo</option>
                    {areasTrabajo.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.nombre_area}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td><label className="labelEmpresaU">Empresa:</label></td>
                <td>
                  <select
                    className="selectE"
                    value={empresaSeleccionada}
                    onChange={(e) => setEmpresaSeleccionada(e.target.value)}
                  >
                    <option className="selectEmpresa" value="">Seleccione una empresa</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nombre_empresa}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btnAsignar" type="submit">Asignar</button>

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
    </div>
  );
};

export default FormAreaTrabajoUsuarios;
