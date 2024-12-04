import { useState } from 'react';
import { post } from '../Services/Crud';
import { useCookies } from 'react-cookie';
import '../Style/FormEmpresas.css';
import { mostrarAlerta } from './MostrarAlerta';
import { patch } from '../Services/Crud';

const FormEmpresas = () => {
  const [cookies,setCookies] = useCookies(["usuarioID", "nombreUsuario", "empresaId"]);
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [cedulaJuridica, setCedulaJuridica] = useState('');
  const [correo, setCorreo] = useState('');
  const [errores, setErrores] = useState({
    nombreEmpresa: '',
    cedulaJuridica: '',
    correo: '',
  });

  // Estado para controlar la visibilidad del formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(true);

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

      try {
        const response = await post(datosFormulario, 'empresas/');
        console.log('Respuesta del servidor:', response);

        if (response) {
          mostrarAlerta("success", 'Empresa registrada con éxito');
          const peticion = await patch('cambiar-rol','',{
            usuario_id: cookies.usuarioID,
            rol: 'propietario'
          })
          setCookies("empresaId",response.id)
          console.log('Respuesta del servidor:', peticion);
        } else {
          mostrarAlerta("error", 'Hubo un error al registrar la empresa');
        }
      } catch (error) {
        console.error('Error al enviar datos:', error);
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
        <h2 className="form-title1">Registrar Empresa</h2>
        
        {/* Flecha para alternar la visibilidad */}
        <button className="toggle-btn" onClick={toggleFormulario}>
          {mostrarFormulario ? '↓' : '↑'} {/* Cambia la dirección de la flecha */}
        </button>

        {/* Mostrar el formulario solo si el estado es verdadero */}
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

            <button className="btnEnviarEmpresas" type="submit">Enviar</button>
          </form>
        )}
      </div>
    </>
  );
};

export default FormEmpresas;
