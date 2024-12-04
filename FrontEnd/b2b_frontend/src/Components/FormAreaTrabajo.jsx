import { useState, useEffect } from 'react';
import { post, get } from '../Services/Crud';
import '../Style/FormAreaTrabajo.css';
import { mostrarAlerta } from './MostrarAlerta';

const FormAreaTrabajo = () => {
  const [nombreArea, setNombreArea] = useState('');
  const [responsable, setResponsable] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  const [formVisible, setFormVisible] = useState(true); // Estado para controlar la visibilidad del formulario

  // Obtiene la lista de empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await get('empresas'); // El endpoint 'empresas' para obtener la lista
        setEmpresas(response);
      } catch (error) {
        console.error('Error al obtener empresas:', error);
        mostrarAlerta("error",'Hubo un problema al cargar las empresas');
      }
    };
    fetchEmpresas();
  }, []);

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = [];

    if (!nombreArea) {
      erroresTemp.push('El nombre del área de trabajo es obligatorio');
      esValido = false;
    }

    if (!responsable) {
      erroresTemp.push('El responsable es obligatorio');
      esValido = false;
    }

    if (!empresaSeleccionada) {
      erroresTemp.push('Debes seleccionar una empresa');
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
        responsable_del_area: responsable,
        empresa: empresaSeleccionada,
      };

      try {
        const response = await post(datosFormulario, 'AreaTrabajo/');
        if (response && response.success) {
          mostrarAlerta("success",'Área de trabajo registrada con éxito');
        } else {
          mostrarAlerta("error",'Hubo un problema al registrar el área de trabajo');
        }
      } catch (error) {
        mostrarAlerta("error",'Error al enviar el formulario');
        console.error(error);
      }
    } else {
      setMensajeError('Por favor, completa todos los campos correctamente.');  // Mensaje de alerta
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible); // Alternar visibilidad del formulario
  };

  return (
    <div className="development-table-container">
      <div className="form-title1">
        <h2>Registrar Área de Trabajo</h2>
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
                <td><label className="labelNombreArea">Nombre del área de trabajo:</label></td>
                <td>
                  <input
                    placeholder="Nombre del área de trabajo"
                    className="nombreAreaTrabajo"
                    type="text"
                    value={nombreArea}
                    onChange={(e) => setNombreArea(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td><label className="labelResponsableArea">Responsable del área:</label></td>
                <td>
                  <input
                    placeholder="Responsable del área"
                    className="inputResponsableArea"
                    type="text"
                    value={responsable}
                    onChange={(e) => setResponsable(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td><label className="labelEmpresa">Empresa:</label></td>
                <td>
                  <select
                    className="selectEmpresa"
                    value={empresaSeleccionada}
                    onChange={(e) => setEmpresaSeleccionada(e.target.value)}
                  >
                    <option className="seleccionarEmpresa" value="">Seleccione una empresa</option>
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

          <button className="btnRegistrarArea" type="submit">Registrar Área de Trabajo</button>

          {/* Muestra errores de validación */}
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
