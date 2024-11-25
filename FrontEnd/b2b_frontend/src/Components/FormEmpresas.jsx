import { useState } from 'react';
import { post } from '../Services/Crud';
import { useCookies } from 'react-cookie'; // Accedemos al ID del usuario registrado
import '../Style/FormEmpresas.css';
import { mostrarAlerta } from './MostrarAlerta';

const FormEmpresas = () => {
  const [cookies] = useCookies(["usuarioID"]);
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [cedulaJuridica, setCedulaJuridica] = useState('');
  const [correo, setCorreo] = useState('');
  const [errores, setErrores] = useState({
    nombreEmpresa: '',
    cedulaJuridica: '',
    correo: '',
  });

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = { nombreEmpresa: '', cedulaJuridica: '', correo: '' };

    // Validación de nombre de la empresa
    if (!nombreEmpresa) {
      erroresTemp.nombreEmpresa = 'El nombre de la empresa es obligatorio';
      esValido = false;
    }

    // Validación de cédula jurídica
    if (!cedulaJuridica) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica es obligatoria';
      esValido = false;
    } else if (!/^\d{10}$/.test(cedulaJuridica)) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica debe tener 10 dígitos';
      esValido = false;
    }

    // Validación del correo
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

    // Verificamos si la cédula es un array (debería ser un valor único)
    const cedula = Array.isArray(cedulaJuridica) ? cedulaJuridica[0] : cedulaJuridica;

    // Verificamos si el propietario es un array (debería ser un valor único)
    const propietario = Array.isArray(cookies.usuarioID) ? cookies.usuarioID[0] : cookies.usuarioID;

    // Validamos el formulario antes de enviar los datos
    if (validarFormulario()) {
      // Preparamos los datos a enviar
      const datosFormulario = {
        nombre_empresa: nombreEmpresa,
        cedula_juridica: cedula,
        correo: correo,
        propietario: propietario,
      };

      console.log("Datos enviados al servidor:", datosFormulario);  // Verifica los datos antes de enviarlos

      try {
        // Realizamos la petición POST al servidor
        const response = await post(datosFormulario, 'empresas/');
        console.log('Respuesta del servidor:', response);  // Verifica la estructura de la respuesta

        if (response) {
          mostrarAlerta("success",'Empresa registrada con éxito');
        } else {
          mostrarAlerta("error",'Hubo un error al registrar la empresa');
        }
      } catch (error) {
        // Si ocurre un error durante el envío va aparecer esta alerta
        console.error('Error al enviar datos:', error);
      }
    }
  };
      

  return (
    <form onSubmit={manejarEnvio}>
      <div>
        <label>Nombre de la empresa:</label>
        <input type="text" value={nombreEmpresa} onChange={(e) => setNombreEmpresa(e.target.value)}/>
        {errores.nombreEmpresa && <span className="error-text">{errores.nombreEmpresa}</span>}
      </div>

      <div>
        <label>Cédula Jurídica:</label>
        <input type="text" value={cedulaJuridica} onChange={(e) => setCedulaJuridica(e.target.value)}/>
        {errores.cedulaJuridica && <span className="error-text">{errores.cedulaJuridica}</span>}
      </div>

      <div>
        <label>Correo:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
        {errores.correo && <span className="error-text">{errores.correo}</span>}
      </div>

      <div>
        <label>Propietario (ID):</label>
        <input type="text" value={cookies.usuarioID} disabled />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormEmpresas;
