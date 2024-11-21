import '../Style/FormEmpresas.css'
import { useState } from 'react';
import { post,get } from '../Services/Crud';

const FormEmpresas = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [cedulaJuridica, setCedulaJuridica] = useState('');
  const [correo, setCorreo] = useState('');
  const [propietario, setPropietario] = useState('');
  const [empresas, setRegistroLogin] = useState([]);
  // Esta cadena muestra un mensaje de error si hay espacios vacios
  const [errores, setErrores] = useState({
    nombreEmpresa: '',
    cedulaJuridica: '',
    correo: '',
    propietario: ''
  });

    // Obtine la lista de usuarios
    useEffect(() => {
      const fetchRegistroLogin = async () => {
        try {
          const response = await get('registroLogin/'); // El endpoint 'empresas' para obtener la lista
          setRegistroLogin(response);
        } catch (error) {
          console.error(error);
          alert('Hubo un problema al cargar las empresas');
        }
      };
      fetchRegistroLogin();
    }, []);

  // Validación de los campos
  const validarFormulario = () => {
    let esValido = true; // Es para saber si el formulario es valiado o no
    let erroresTemp = { nombreEmpresa: '', cedulaJuridica: '', correo: '', propietario: '' };
    // almacena los mensajes de error

    // Validación dbre de la empresa
    if (!nombreEmpresa) {
      erroresTemp.nombreEmpresa = 'El nombre de la empresa es obligatorio';
      esValido = false;
    }

    // Validación de la cédula jurídica
    if (!cedulaJuridica) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica es obligatoria';
      esValido = false;
    } else if (!/^\d{10}$/.test(cedulaJuridica)) { // Asegúrate de que la cédula tiene 10 dígitos
      erroresTemp.cedulaJuridica = 'La cédula jurídica debe tener 10 dígitos';
      esValido = false;
    }

    // Validación del correo electrónico
    if (!correo) {
      erroresTemp.correo = 'El correo es obligatorio';
      esValido = false;
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      erroresTemp.correo = 'El correo no es válido';
      esValido = false;
    }

    // Validación del propietario
    if (!propietario) {
      erroresTemp.propietario = 'El propietario es obligatorio';
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
        nombreEmpresa,
        cedulaJuridica,
        correo,
        propietario
      };

      try {
        // Llamamos a la función post para enviar los datos de la empresa
        const response = await post(datosFormulario, 'empresas');  // El endpoint es 'empresa'
        
        // Aqui el API devuelve una repsuesta
        if (response && response.success) {
          // Si la respuesta es exitosa, muestra una alerta de éxito
          alert('Empresa registrada con éxito');
        } else {
          // Si la respuesta es negativa, muestra una alerta 
          alert('Hubo un problema al registrar la empresa');
        }
      } catch (error) {
        alert('Error al enviar el formulario');
        console.error(error);
      }
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div>
        <label>Nombre de la empresa:</label>
        <input type="text" value={nombreEmpresa} onChange={(e) => setNombreEmpresa(e.target.value)}/>
        {/* contiene los mensajes de error */}
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
        <label>Propietario:</label>
        <input type="text" value={propietario} onChange={(e) => setPropietario(e.target.value)}/>
        {errores.propietario && <span className="error-text">{errores.propietario}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormEmpresas;
