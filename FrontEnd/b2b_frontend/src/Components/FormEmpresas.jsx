import { useState } from 'react';
import { post } from '../Services/Crud';
import { useCookies } from 'react-cookie';
import '../Style/FormEmpresas.css';
import { mostrarAlerta } from './MostrarAlerta';
import { patch,get } from '../Services/Crud';
import LoadingSpinner from '../Components/LoadingSpinner'; 

const FormEmpresas = () => {
  const [cookies, setCookies] = useCookies(["usuarioID", "nombreUsuario", "empresaId", "nombreEmpresa", 'rolUsuario', 'token']);
  const token = cookies.token;
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [cedulaJuridica, setCedulaJuridica] = useState('');
  const [correo, setCorreo] = useState('');
  const [errores, setErrores] = useState({
    nombreEmpresa: '',
    cedulaJuridica: '',
    correo: '',
  });

  // Estado para controlar la visibilidad del formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estado para el spinner de carga
  const [isLoading, setIsLoading] = useState(false);

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = { nombreEmpresa: '', cedulaJuridica: '', correo: '' };

    if (!nombreEmpresa) {
      erroresTemp.nombreEmpresa = 'El nombre de la empresa es obligatorio';
      esValido = false;
    }

    if (!cedulaJuridica) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica es obligatoria';
      esValido = false;
    } else if (!/^\d{10}$/.test(cedulaJuridica)) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica debe tener 10 dígitos';
      esValido = false;
    }

    if (!correo) {
      erroresTemp.correo = 'El correo es obligatorio';
      esValido = false;
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      erroresTemp.correo = 'El correo no es válido';
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const datosFormulario = {
        nombre_empresa: nombreEmpresa,
        cedula_juridica: cedulaJuridica,
        correo: correo,
        propietario: cookies.usuarioID,
      };

      console.log("Datos enviados al servidor:", datosFormulario);
      setIsLoading(true); // Activar el spinner de carga

      try {
        const empresasCedula = await get('empresas')
        console.log('Empresas:', empresasCedula);
        const soloCedula = empresasCedula.map((empresa) => empresa.cedula_juridica);
        console.log('Solo cedula:', soloCedula);
          if(soloCedula.includes(cedulaJuridica)){
            mostrarAlerta("error", 'Ya tienes una empresa registrada');
            setIsLoading(false);
            return;
        }
        const soloCorreo = empresasCedula.map((empresa) => empresa.correo);
        console.log('Solo correo:', soloCorreo);
          if(soloCorreo.includes(correo)){
            mostrarAlerta("error", 'El correo ya está registrado');
            setIsLoading(false);
            return;
          }
        const response = await post(datosFormulario, 'empresas/', token);
        const empresa = response;
        setCookies("empresaId", response.id);
        setCookies("nombreEmpresa", empresa.nombre_empresa);
       

        if (response) {
          mostrarAlerta("success", 'Empresa registrada con éxito');
          const peticion = await patch('cambiar-rol', '', {
            usuario_id: cookies.usuarioID,
            rol: 'propietario',
          }, token);
          setCookies("rolUsuario", "propietario");
          console.log('Respuesta del servidor:', peticion);
        } else {
          mostrarAlerta("error", 'Hubo un error al registrar la empresa');
        }
      } catch (error) {
        console.error('Error al enviar datos:', error);
        if (error.response && error.response.data && error.response.data.cedula_juridica) {
          mostrarAlerta("error", 'La cédula jurídica ya existe. Por favor, verifica los datos.');
        } else {
          mostrarAlerta("error", 'Hubo un error al procesar tu solicitud');
        }
      } finally {
        setIsLoading(false); // Desactivar el spinner después de que termine la solicitud
      }
    }
  };

  // Función para alternar la visibilidad del formulario
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  return (
    <>
      <div className="development-table-container">
        <div className="form-title1">
          <h2>Registrar Empresa</h2>
          <span className="toggle-arrow" onClick={toggleFormulario}>
            {mostrarFormulario ? '↑' : '↓'}
          </span> 
        </div>        

        {mostrarFormulario && (
          <form onSubmit={manejarEnvio}>
            <table className="table">
              <tbody>
                <tr>
                  <td><label className="nombreEmpresalabel">Nombre de la empresa:</label></td>
                  <td>
                    <input
                      placeholder="Nombre de la empresa"
                      className="nombreEmpresa"
                      type="text"
                      value={nombreEmpresa}
                      onChange={(e) => setNombreEmpresa(e.target.value)}
                    />
                    {errores.nombreEmpresa && <span className="error-text">{errores.nombreEmpresa}</span>}
                  </td>
                </tr>

                <tr>
                  <td><label className="labelCedula">Cédula Jurídica:</label></td>
                  <td>
                    <input
                      placeholder="Cédula Jurídica"
                      className="cedulaJuridica"
                      type="text"
                      value={cedulaJuridica}
                      onChange={(e) => setCedulaJuridica(e.target.value)}
                    />
                    {errores.cedulaJuridica && <span className="error-text">{errores.cedulaJuridica}</span>}
                  </td>
                </tr>

                <tr>
                  <td><label className="labelCorreo">Correo:</label></td>
                  <td>
                    <input
                      placeholder="Correo"
                      className="correoEmpresas"
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                    {errores.correo && <span className="error-text">{errores.correo}</span>}
                  </td>
                </tr>

                <tr>
                  <td><label className="labelPropietario">Propietario:</label></td>
                  <td>
                    <input
                      className="idPropietario"
                      type="text"
                      value={cookies.nombreUsuario}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="btnEnviarEmpresas" type="submit" disabled={isLoading} >
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                'Enviar'
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default FormEmpresas;
