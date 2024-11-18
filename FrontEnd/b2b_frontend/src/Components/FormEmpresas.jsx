import '../Style/FormEmpresas.css'
import { useState } from 'react';
import { post } from '../Services/Crud';  // Importamos la función post desde api.js

const FormEmpresas = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [cedulaJuridica, setCedulaJuridica] = useState('');
  const [correo, setCorreo] = useState('');
  const [propietario, setPropietario] = useState('');
  const [errores, setErrores] = useState({
    nombreEmpresa: '',
    cedulaJuridica: '',
    correo: '',
    propietario: ''
  });

  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = { nombreEmpresa: '', cedulaJuridica: '', correo: '', propietario: '' };

    if (!nombreEmpresa) {
      erroresTemp.nombreEmpresa = 'El nombre de la empresa es obligatorio';
      esValido = false;
    }

    if (!cedulaJuridica) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica es obligatoria';
      esValido = false;
    }

    if (!correo) {
      erroresTemp.correo = 'El correo es obligatorio';
      esValido = false;
    }

    if (!propietario) {
      erroresTemp.propietario = 'El propietario es obligatorio';
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

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
        // Usamos la función post para enviar los datos
        const data = await post(datosFormulario, 'empresa');  // El endpoint es 'empresa'
        alert(data.mensaje);  // Si todo es correcto, mostramos el mensaje recibido del servidor
      } catch (error) {
        alert('Error al enviar el formulario');
        console.error(error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div>
        <label>Nombre de la empresa:</label>
        <input 
          type="text" 
          value={nombreEmpresa} 
          onChange={(e) => setNombreEmpresa(e.target.value)} 
        />
        {errores.nombreEmpresa && <span style={{ color: 'red' }}>{errores.nombreEmpresa}</span>}
      </div>

      <div>
        <label>Cédula Jurídica:</label>
        <input 
          type="text" 
          value={cedulaJuridica} 
          onChange={(e) => setCedulaJuridica(e.target.value)} 
        />
        {errores.cedulaJuridica && <span style={{ color: 'red' }}>{errores.cedulaJuridica}</span>}
      </div>

      <div>
        <label>Correo:</label>
        <input 
          type="email" 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
        />
        {errores.correo && <span style={{ color: 'red' }}>{errores.correo}</span>}
      </div>

      <div>
        <label>Propietario:</label>
        <input 
          type="text" 
          value={propietario} 
          onChange={(e) => setPropietario(e.target.value)} 
        />
        {errores.propietario && <span style={{ color: 'red' }}>{errores.propietario}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormEmpresas;
