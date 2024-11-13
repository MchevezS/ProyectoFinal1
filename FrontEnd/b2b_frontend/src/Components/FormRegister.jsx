import React, { useState } from 'react'


function FormRegister() {
  const [nombreUsuario, setNombreUsuario]=useState('');  
  const [cedulaIndentidad, setCedulaIndentidad]=useState('');
  const [emailRegistro, setEmailRegistro]=useState('');
  const [claveRegistro, setClaveRegistro]=useState('');

async function validarFormRegister() {
// Validamos que los campos no pueden estar vacios
if (nombreUsuario.trim()==="" || cedulaIndentidad.trim()==="" || emailRegistro.trim()==="" || claveRegistro.trim()==="") {
  alert("Llenar campos vacios")
  return;
}

// Vamos a guardar los datos en nuestra api
  const dataRegister = {
    nombreUsuario: nombreUsuario,
    cedulaIndentidad: cedulaIndentidad,
    emailRegistro: emailRegistro,
    claveRegistro: claveRegistro
  };

 
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