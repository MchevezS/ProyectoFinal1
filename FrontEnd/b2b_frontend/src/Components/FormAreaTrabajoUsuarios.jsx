import '../Style/FormAreaTrabajoUsuarios.css'
import { useState, useEffect } from 'react';
import { post, get } from '../Services/Crud';

const FormAreaTrabajoUsuarios = () => {
  // Estados para los datos del formulario
//   const [usuarios, setUsuarios] = useState([]);
  const [areasTrabajo, setAreasTrabajo] = useState([]);
  const [empresas, setEmpresas] = useState([]);
//   const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');
  
  // Cargar usuarios, áreas de trabajo y empresas
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const usuariosData = await get('usuarios');
        const areasData = await get('AreaTrabajo/');
        const empresasData = await get('empresas/');
        
        // setUsuarios(usuariosData);
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

    // if (!usuarioSeleccionado) {
    //   erroresTemp.push('El usuario es obligatorio');
    //   esValido = false;
    // }

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
        // usuario_id: usuarioSeleccionado,
        area_trabajo_id: areaSeleccionada,
        empresa_id: empresaSeleccionada
      };

      try {
        const response = await post(datosFormulario, 'asignar_usuario_area');
        if (response && response.success) {
        alert('Usuario asignado correctamente');
        } else {
            alert('Hubo un problema al asignar un usuario')
        }
      } catch (error) {
        console.error(error);
        alert('Error al asignar el usuario');
      }
    } else {
      setMensajeError('Por favor, completa todos los campos.');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>  
      {/* <div>
        <label>Usuario:</label>
        <select
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre} 
            </option>
          ))}
        </select>
      </div> */}

      <div>
        <label>Área de Trabajo:</label>
        <select
          value={areaSeleccionada}
          onChange={(e) => setAreaSeleccionada(e.target.value)}
        >
          <option value="">Seleccione un área de trabajo</option>
          {areasTrabajo.map((area) => (
            <option key={area.id} value={area.id}>
              {area.nombre_area} {/* Suponiendo que el modelo de AreaTrabajo tiene 'nombre_area' */}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Empresa:</label>
        <select
          value={empresaSeleccionada}
          onChange={(e) => setEmpresaSeleccionada(e.target.value)}
        >
          <option value="">Seleccione una empresas</option>
          {empresas.map((empresa) => (
            <option key={empresa.id} value={empresa.id}>
              {empresa.nombre_empresa} {/* Suponiendo que el modelo de Empresa tiene 'nombre_empresa' */}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Asignar</button>

      {/* Mostrar mensaje de error si existe */}
      {mensajeError && <div style={{ color: 'red' }}>{mensajeError}</div>}
      
      {/* Mostrar lista de errores */}
      {errores.length > 0 && (
        <div style={{ color: 'red' }}>
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

export default FormAreaTrabajoUsuarios;
