import React, { useState } from 'react'
import { post } from '../Services/Crud';

function FormRegister() {
  const [nombreUsuario, setNombreUsuario]=useState('');  
  const [cedulaIndentidad, setCedulaIndentidad]=useState('');
  const [emailRegistro, setEmailRegistro]=useState('');
  const [claveRegistro, setClaveRegistro]=useState('');

async function validarFormRegister() {
// Validamos que los campos no estén vacíos
if (nombreUsuario.trim()==="" || cedulaIndentidad.trim()==="" || emailRegistro.trim()==="" || claveRegistro.trim()==="") {
  alert("Llenar campos vacios")
  return;
}

// Vamos a guardar los datos en nuestra api
  const dataRegister = {
    username: nombreUsuario,
    cedula: cedulaIndentidad,
    email: emailRegistro,
    password: claveRegistro
  };

  try {
    // Llamamos a la función post para registrar al usuario
    const response = await post(dataRegister, "users");
    
    // Suponiendo que la API devuelve una respuesta exitosa
    if (response && response.status === 200) {
      alert("Usuario registrado exitosamente");
    } else {
      // Si la respuesta de la API no es exitosa, mostramos un mensaje
      alert("Hubo un problema al registrar al usuario");
    }
  } catch (error) {
    // Si ocurre algún error en la solicitud
    console.error('Error al procesar la solicitud:', error);
    alert("Hubo un error al registrar al usuario. Intenta nuevamente.");
  }
}

  return (
    <div>
    <div className='formResgister'>
    <input type='name' placeholder='Nombre' className='nombreUsuario' value={nombreUsuario} onChange={(e)=> {setNombreUsuario(e.target.value)}} required/>
    <input type='text' placeholder='Cédula de identidad' className='cedulaIndentidad' value={cedulaIndentidad} onChange={(e)=> {setCedulaIndentidad(e.target.value)}} required/>
    <input type='email' placeholder='Email' className='emailRegistro' value={emailRegistro} onChange={(e)=> {setEmailRegistro(e.target.value)}} required/>
    <input type='password' placeholder='Clave' className='claveRegistro' value={claveRegistro} onChange={(e)=> {setClaveRegistro(e.target.value)}} required/>
    </div>
    <button type='button' className='btnRegister' onClick={validarFormRegister}>Registrarse</button>

    </div>
  )
}

export default FormRegister