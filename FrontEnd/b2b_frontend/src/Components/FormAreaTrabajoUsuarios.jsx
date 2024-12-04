import '../Style/FormAreaTrabajoUsuarios.css';
import { useState, useEffect } from 'react';
import { post, get,getEmpleados } from '../Services/Crud';
import { useCookies } from 'react-cookie';
import { mostrarAlerta } from './MostrarAlerta';
const FormAreaTrabajoUsuarios = () => {
  const [cookies,setCookies] = useCookies(['empresaId']);
  const [areasTrabajo, setAreasTrabajo] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');
  const [errores, setErrores] = useState([]);
  const [mensajeError, setMensajeError] = useState('');

  const [empleado, setEmpleado] = useState('');


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

    const traerEmpleados = async () =>{
      const empleadosEmpresa = await getEmpleados('traer-empleados',cookies.empresaId);
      setListaEmpleados(empleadosEmpresa);
      console.log(empleadosEmpresa);
    }
    fetchData();
    traerEmpleados();
  }, []);

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = [];

    if (!areaSeleccionada) {
      erroresTemp.push('El área de trabajo es obligatoria');
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
        usuario: empleado,
        area_trabajo: areaSeleccionada,
        empresa: cookies.empresaId
      };

      try {
        const response = await post(datosFormulario, 'asignar_usuario/');
        if (response.id) {
          mostrarAlerta("success",'Usuario asignado correctamente');
        } else {
          mostrarAlerta("success",'Hubo un problema al asignar el usuario');
        }
      } catch (error) {
        console.error(error);
        console.log ('Error al asignar el usuario');
      }
    } else {
      setMensajeError('Por favor, completa todos los campos.');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>  
      <div className="development-table-container">
        <h2 className="form-title1">Asignar Usuario a Área de Trabajo</h2>

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
              <td>
                <label htmlFor="">Seleccione el empleado</label>
              </td>
              <td>
                <select onChange={(e)=>setEmpleado(e.target.value)}>
                  <option  disabled selected>Lista de empledos</option>
                  {listaEmpleados.map((empleado)=>{
                    return(
                      <option key={empleado.id} value={empleado.id} >{empleado.username}</option>
                    )
                  })}
                </select>
                </td>
              </tr>
          </tbody>
        </table>

        <button className="btnAsignar" type="submit">Asignar</button>

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
      </div>
    </form>
  );
};

export default FormAreaTrabajoUsuarios;
