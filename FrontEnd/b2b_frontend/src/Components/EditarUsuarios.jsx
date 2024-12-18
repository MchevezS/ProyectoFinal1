import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Para obtener el ID del usuario
import { get, patch } from '../Services/Crud';
import '../Style/EditarUsuario.css';
import { useCookies } from "react-cookie";
import { mostrarAlerta } from './MostrarAlerta';

const EditarUsuario = () => {
  const [cookie]=useCookies(["token"]);
  const token = cookie.token;
  const [usuario, setUsuario] = useState({
    username: '',
    email: '',
  });
  const [errores, setErrores] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true); // estado para que carguen los datos del usuario
  const { id } = useParams(); // Obtenemos el ID del usuario de la URL
  const navigate = useNavigate();

  // Obtener la información del usuario a editar
  const obtenerUsuario = async () => {
    try {
      const response = await get('traer-usuarios', id);
      setUsuario(response); // Este es el input del usuario
      setLoading(false); // Se mantiene en falso si los datos están cargando
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      setLoading(false);
    }
  };

  // Validación del formulario de edición
  const validarFormulario = () => {
    let esValido = true;
    let erroresTemp = { username: '', email: '' };

    if (!usuario.username) {
      erroresTemp.username = 'El nombre de usuario es obligatorio';
      esValido = false;
    }

    if (!usuario.email) {
      erroresTemp.email = 'El correo es obligatorio';
      esValido = false;
    } else if (!/\S+@\S+\.\S+/.test(usuario.email)) {
      erroresTemp.email = 'El correo no es válido';
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  // Manejo del envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      // Preparamos los datos a enviar basados en el estado 'usuario'
      const datosFormulario = {
        username: usuario.username,
        email: usuario.email,
      };

      try {
        // Realizamos la llamada PATCH para actualizar el usuario
        const response = await patch('usuarios/', id, datosFormulario, token); // Llamamos al método PATCH
        if (response) {
          navigate('/administradorUsuarios'); // Redirige al administrador a la lista de usuarios
          mostrarAlerta("success", 'Usuario actualizado con éxito');
        } else {
          // Si la respuesta no es válida (por alguna razón el servidor no devuelve datos esperados)
          mostrarAlerta("error", 'Error al actualizar el usuario. Intenta nuevamente');
        }
      } catch (error) {
        mostrarAlerta("error", 'Error al actualizar el usuario');
        console.error('Error al actualizar el usuario:', error);
      }
    }
  };

  useEffect(() => {
    obtenerUsuario(); // Obtener los datos del usuario cuando el componente se monta
  }, [id]);

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <form onSubmit={manejarEnvio} className='formEditar2'>
      <div>
        <label className='label2'>Nombre de usuario:</label>
        <input className='inputs2' type="text" value={usuario.username} onChange={(e) => setUsuario({ ...usuario, username: e.target.value })}/>
        {errores.username && <span className="error-text">{errores.username}</span>}
      </div>

      <div>
        <label className='label2'>Correo:</label>
        <input className='inputs' type="email" value={usuario.email} onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}/>
        {errores.email && <span className="error-text">{errores.email}</span>}
      </div>

      <button type="submit" className='botonActualizar'>Actualizar Usuario</button>
    </form>
  );
};

export default EditarUsuario;