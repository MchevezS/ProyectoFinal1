import React, { useState } from 'react';
import { post } from '../Services/Crud';
import { mostrarAlerta } from './MostrarAlerta';

function FormRegister() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [cedulaIndentidad, setCedulaIndentidad] = useState('');
  const [emailRegistro, setEmailRegistro] = useState('');
  const [claveRegistro, setClaveRegistro] = useState('');

  // Función para mostrar
  // const mostrarAlerta = (tipo, mensaje) => {
  //   alert(`${tipo.toUpperCase()}: ${mensaje}`);
  // };

  // Validación del nombre
  const formatoNombre = () => {
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(nombreUsuario)) {
      mostrarAlerta("error", "El nombre solo puede tener letras");
      return false;
    }
    if (nombreUsuario.length < 2) {
      mostrarAlerta("error", "El nombre debe tener al menos 2 caracteres");
      return false;
    }
    return true;
  };

  // Validación de la cédula tica
  const validarCedulaTica = (cedula) => {
    cedula = cedula.replace(/[^0-9]/g, ""); // Elimina todo lo que no sea un número
    if (cedula.length === 9 && !isNaN(cedula)) {
      mostrarAlerta("success", "Cédula ingresada correctamente");
      return true;
    } else {
      mostrarAlerta("error", "La cédula no es válida");
      return false;
    }
  };

  // Función de validación principal del formulario
  const validarFormRegister = () => {
    // Validamos que los campos no estén vacíos
    if (nombreUsuario.trim() === "" || cedulaIndentidad.trim() === "" || emailRegistro.trim() === "" || claveRegistro.trim() === "") {
      mostrarAlerta("error", "Por favor, llena todos los campos.");
      return;
    }

    // Validación del nombre
    if (!formatoNombre()) return;

    // Validación de la cédula
    if (!validarCedulaTica(cedulaIndentidad)) return;

    // Si todo está bien, continuamos con el registro
    registroUsuario();
  };

  // Función para registrar el usuario
  const registroUsuario = async () => {
    const dataRegister = {
      username: nombreUsuario,
      cedula: cedulaIndentidad,
      email: emailRegistro,
      password: claveRegistro
    };

    try {
      // Llamamos a la función post para registrar al usuario
      const response = await post(dataRegister, "crear-usuario/");

      // Suponiendo que la API devuelve una respuesta exitosa
      
      if (response && response.success) {
        mostrarAlerta("success", "Usuario registrado exitosamente");
      } else {
        // Si la respuesta de la API no es exitosa, mostramos un mensaje
        mostrarAlerta("error", "Hubo un problema al registrar al usuario");
      }
    } catch (error) {
      // Si ocurre algún error en la solicitud
      console.error('Error al procesar la solicitud:', error);
      mostrarAlerta("error", "Hubo un error al registrar al usuario. Intenta nuevamente.");
    }
  };

  return (
    <div>
      <div className='formResgister'>
        <input type='name' placeholder='Nombre' className='nombreUsuario' value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required/>
        <input type='text' placeholder='Cédula de identidad' className='cedulaIndentidad' value={cedulaIndentidad} onChange={(e) => setCedulaIndentidad(e.target.value)} required/>
        <input type='email' placeholder='Email' className='emailRegistro' value={emailRegistro} onChange={(e) => setEmailRegistro(e.target.value)} required/>
        <input type='password' placeholder='Clave' className='claveRegistro' value={claveRegistro} onChange={(e) => setClaveRegistro(e.target.value)} required/>
      </div>
      <button type='button' className='btnRegister' onClick={validarFormRegister}> Registrarse </button>
    </div>
  );
}

export default FormRegister;
