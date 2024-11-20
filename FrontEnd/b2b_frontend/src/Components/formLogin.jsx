import { useState } from 'react'
import { mostrarAlerta } from './MostrarAlerta';
import { get } from '../Services/Crud';
import { Navigate, useNavigate } from 'react-router-dom';

function FormLogin() {
const [nombreUsuarioL, setNombreUsuarioL] = useState('');
const [emailL, setEmailL] = useState('');

const espaciosVacios = () => {
    if (nombreUsuarioL.trim()==="" || emailL.trim()==="") {
        mostrarAlerta("error", "Llenar espacios vacios");
        return;
    }
    
}
espaciosVacios()
function formLogin() {
  const [nombreUsuarioL, setNombreUsuarioL] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // Validación de espacios vacíos
  const espaciosVacios = () => {
    if (nombreUsuarioL.trim() === "" || password.trim() === "") {
      mostrarAlerta("error", "Llenar espacios vacíos");
      return false; // Retorna false si hay campos vacíos
    }
  };

  const longitudPassword = (password) => {
    if (password.length < 4) {
      console.log("password llega");

      mostrarAlerta("error", "La contraseña debe tener al menos 4 caracteres");
    }
  };

  const inicioSesion = async (e) => {
    e.preventDefault()

    // Creamos un objeto que va a obtener los datos del formmulario
    const datosLogin = {
      username: nombreUsuarioL,
      password: password
    };

    if (espaciosVacios()) {
      return
    } // Se llaman nuestras validaciones
    if (longitudPassword(password)) {
      return
    }
    try {
      let usuaios = await get(datosLogin,"login-usuario/")

      let usuario = usuaios.find(user => user.username=== nombreUsuarioL && user.clave === password);
      if (usuario) {
        mostrarAlerta("success", "Te has logueado de manera exitosa")
         navigate("/")
      }else{
        mostrarAlerta("error", 'No se ha encontrado un usuario con ese nombre dde usuario')
      }
    } catch (error) {
      mostrarAlerta("error", "Ocurrio un error al procesar tu solitud. Intentalo de nuevo mas tarde.")

    }
  }


  return (
    <div>
      <div className='formLogin'>
        <input type='username' placeholder='Nombre' className='nombreUsuarioL' value={nombreUsuarioL} onChange={(e) => setNombreUsuarioL(e.target.value)} required/>
        <input type='password' placeholder='Passwoord' className='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>
        <button type='button' className='btnLogin' onClick={inicioSesion}>Iniciar Sesión</button>
        <a href='/register' className='enlaceRegistro'>No tengo cuuenta</a>
    </div>
  )
}

export default FormLogin