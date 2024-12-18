import { useState, useEffect } from 'react';
import { get, patch } from '../Services/Crud';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2';
import { mostrarAlerta } from './MostrarAlerta';

const AdministradorUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeker, setSeeker] = useState(''); // Estado del buscador usuarios
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  // Obtener todos los usuarios
  const obtenerUsuarios = async () => {
    try {
      const response = await get('traer-usuarios');
      setUsuarios(response);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setLoading(false);
    }
  };

  // Cambiar el estado (activar/desactivar) de un usuario
  const cambiarEstadoUsuario = async (id, estadoActual) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de que deseas ${estadoActual ? "desactivar" : "activar"} este usuario?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
    if (result.isConfirmed) {
      try {
        const data = { estado: !estadoActual };
        const response = await patch(`usuario/estado/`, id, data, token);
        if (response) {
          await mostrarAlerta('success', `Usuario ${estadoActual ? "desactivado" : "activado"} con éxito`);
        } else {
          await mostrarAlerta('error', 'No se pudo cambiar el estado del usuario');
        }
        obtenerUsuarios();  // Vuelve a cargar la lista después de cambiar el estado
      } catch (error) {
        console.log(error);
        alert("Error al cambiar el estado del usuario");
      }
    }
  };

  // Filtrar usuarios para buscarlos
  const usuariosFiltrados = usuarios.filter((usuario) => {
    return usuario.username.toLowerCase().includes(seeker.toLowerCase()) ||
           usuario.email.toLowerCase().includes(seeker.toLowerCase());
  });

  // Función para redirigir a la página de edición
  const editarUsuario = (id) => {
    navigate(`/editar-usuarios/${id}`); // Redirige a la página de edición con el id del usuario
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []); // Se ejecuta solo una vez

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="admin-container">
      <h2 className='Titulo'>Administrar Usuarios</h2>

      {/* Barra de búsqueda */}
      <div className='seeker-container'>
        <input type='text' placeholder='Buscar usuario...' value={seeker} onChange={(e) => setSeeker(e.target.value)} />
        <button onClick={() => console.log('Buscar')}>Buscar</button>
      </div>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>{usuario.is_active ? "Activo" : "Desactivado"}</td>
              <td>
                <button className="button-custom" onClick={() => editarUsuario(usuario.id)}>Editar</button>
                <button className="button-custom2" onClick={() => cambiarEstadoUsuario(usuario.id, usuario.is_active)}>Activar/Desactivar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministradorUsuarios;
