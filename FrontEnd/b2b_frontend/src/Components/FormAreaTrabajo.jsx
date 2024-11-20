import { useState, useEffect } from 'react';
import { post, get } from '../Services/Crud';

const FormAreaTrabajo = () => {
  const [nombreArea, setNombreArea] = useState('');
  const [responsable, setResponsable] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');  // Muestra las alertas

  // Obtine la lista de empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await get('empresas/'); // El endpoint 'empresas' para obtener la lista
        setEmpresas(response);
      } catch (error) {
        console.error(error);
        alert('Hubo un problema al cargar las empresas');
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
      }
      try {
        const response = await post(datosFormulario, 'AreaTrabajo');
        if (response && response.success) {
          alert('Área de trabajo registrada con éxito');
        } else {
          alert('Hubo un problema al registrar el área de trabajo');
        }
      } catch (error) {
        alert('Error al enviar el formulario');
        console.error(error);
      }
    } else {
      setMensajeError('Por favor, completa todos los campos correctamente.');  // Mensaje de alerta
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div>
        <label>Nombre del área de trabajo:</label>
        <input type="text" value={nombreArea} onChange={(e) => setNombreArea(e.target.value)}/>
      </div>

      <div>
        <label>Responsable del área:</label>
        <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)}/>
      </div>

      <div>
        <label>Empresa:</label>
        <select value={empresaSeleccionada} onChange={(e) => setEmpresaSeleccionada(e.target.value)}>
          <option value="">Seleccione una empresa</option>
          {empresas.map((empresa) => (
            <option key={empresa.id} value={empresa.id}>
              {empresa.nombre_empresa}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Registrar Área de Trabajo</button>

      {/* Muestra errores que se van creando durante la validación de los campos */}
      {mensajeError && <div className="alerta-error">{mensajeError}</div>}

      {/* Muestra los errores de la validación, si existen */}
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
  );
};

export default FormAreaTrabajo;
