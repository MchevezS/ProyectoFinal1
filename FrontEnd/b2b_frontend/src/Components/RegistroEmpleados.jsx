import React from 'react'
import { useState } from 'react';
import { mostrarAlerta } from './MostrarAlerta';
import { post } from '../Services/Crud';
import '../Style/RegistroEmpleados.css'
function RegistroEmpleados() {
    // Estados de los formularios
    const [nombreEmpleado, setNombreEmpleado] = useState('');
    const [cedulaEmpleado, setCedulaEmpleado] = useState('');
    const [correoEmpleado, setCorreoEmpleado] = useState('');
    const [claveEmpleado, setClaveEmpleado] = useState('');
    
    // Validación del nombre
  const formatoNombre = () => {
    const regex = /^[a-zA-Z]+$/;
        if (!regex.test(nombreEmpleado)) {
         mostrarAlerta("error", "El nombre solo puede tener letras");
         return false;
    }
        if (nombreEmpleado.length < 2) {
         mostrarAlerta("error", "El nombre debe tener al menos 2 caracteres");
         return false;
    }
    return true;
  };

    // Validación de cédula 
    const validarCedulaEmpleado = (cedulaEmpleado) => {
      cedulaEmpleado = cedulaEmpleado.replace(/[^0-9]/g, ""); // Elimina todo lo que no sea un número
        if (cedulaEmpleado.length === 9 && !isNaN(cedulaEmpleado)) {
         mostrarAlerta("success", "Cédula ingresada correctamente");
         return true;
        } else {
         mostrarAlerta("error", "La cédula no es válida");
         return false;
    }
  };

    // Validación principal del formulario
    const espaciosVacios = () => {
        if (nombreEmpleado.trim()==="" || cedulaEmpleado.trim()==="" || correoEmpleado.trim()==="" || claveEmpleado.trim()==="") {
         mostrarAlerta("error", "Llenar espacios vacíos");
         return;   
        }
        // validación del nombre de los empleados
        if (!formatoNombre()) return;

        // validación de la cédula
        if (!validarCedulaEmpleado(cedulaEmpleado)) return;

        // Si todo esta bien, continuamos con el registro
        registroUsuarios();
    };

    // Funcion para registar el usuario
    const registroUsuarios = async() => {
        const dataEmpleados = {
            username: nombreEmpleado,
            cedula: cedulaEmpleado,
            email: correoEmpleado,
            password: claveEmpleado
        };

        try {
            // Llamamos a la funcion post para registrar al usuario
            const response = await post(dataEmpleados,'crear-usuario/')
            console.log(response);
            // Si la API devuelve una respuesta exitosa
            if (response&&response.success) {
                mostrarAlerta("success", "Registrado exitosamente"); 
            };
        } catch (error) {
           // Si ocurre algun error en la solicitud
           console.error('Error al procesar la solicitud:', error);
           mostrarAlerta("error", "Hubo un error al registrar al usuario. Intenta nuevamente.");
        }
    };



  return (
    <div>
    <div className='form-group1'>
      <h2 className="form-title1">Registrar Empleado</h2>

      <label htmlFor='nombreEmpleado'>Nombre de usuario</label>
       <input
         type='username'
         className='nombreEmpleado'
         id='nombreEmpleado'
         placeholder='Nombre de usario'
         value={nombreEmpleado}
         onChange={(e) => setNombreEmpleado (e.target.value)}
        />
    </div>   

    <div className='form-group1'>
        <label htmlFor='cedulaEmpleado'>Cédula de Identidad</label>
        <input
          type='text'
          className='cedulaEmpleado'
          id='cedulaEmpleado'
          placeholder='Cédula de identidad'
          value={cedulaEmpleado}
          onChange={(e) => setCedulaEmpleado(e.target.value)}
        />
    </div>

    <div className='form-group1'>
        <label htmlFor='correoEmpleado'> Correo Electrónico</label>
        <input
          type='email'   
          className='correoEmpleado'
          id='correoEmpleado'
          placeholder='Correo Electrónico'
          value={correoEmpleado}
          onChange={(e) => setCorreoEmpleado (e.target.value)}
        />
        </div>

    <div className='form-group1'>
        <label htmlFor='claveEmpleado'> Contraseña</label>
        <input
        type='password'   
          className='claveEmpleado'
          id='claveEmpleado'
          placeholder='•••••'
          value={claveEmpleado}
          onChange={(e) => setClaveEmpleado (e.target.value)}
        />
        </div>

        <button type='button' className='btnRegistarEmpleado' onClick={espaciosVacios}>Registrar Empleado</button>
    </div>
  )
}

export default RegistroEmpleados