import { useState, useEffect } from 'react';
import { get, patch } from '../Services/Crud';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2';
import { mostrarAlerta } from './MostrarAlerta';
import'../Style/AdministradorEncuestas.css';

const AdministradorEncuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seekerEncuesta, setSeekerEncuesta] = useState(''); // Estado del buscador encuestas(seeker)
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  // Obtener todas las encuestas
  const obtenerEncuestas = async () => {
    try {
      const response = await get('encuestas');
      console.log(response);
      setEncuestas(response);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las encuestas:", error);
      setLoading(false);
    }
  };

  // Cambiar el estado (activar/desactivar) de una encuesta
  const cambiarEstadoEncuesta = async (id, estadoActual) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de que deseas ${estadoActual ? "desactivar" : "activar"} esta encuesta?`,
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
        const response = await patch(`encuesta/estado/`, id, data, token);
        if (response) {
          await mostrarAlerta('success', `Encuesta ${estadoActual ? "desactivada" : "activada"} con éxito`);
        } else {
          await mostrarAlerta('error', 'No se pudo cambiar el estado de la encuesta');
        }
        obtenerEncuestas();
      } catch (error) {
        console.log(error);
        alert("Error al cambiar el estado de la encuesta");
      }
    }
  };

  // Filtrar encuestas
  const encuestasFiltradas = encuestas.filter((encuesta) => {
    return (
      (encuesta.categoria_encuesta && encuesta.categoria_encuesta.toLowerCase().includes(seekerEncuesta.toLowerCase())) ||
      (encuesta.descripcion_encuesta && encuesta.descripcion_encuesta.toLowerCase().includes(seekerEncuesta.toLowerCase())) ||
      (encuesta.pregunta_encuesta && encuesta.pregunta_encuesta.toLowerCase().includes(seekerEncuesta.toLowerCase())) ||
      (encuesta.id_empresa && encuesta.id_empresa.toString().includes(seekerEncuesta.toLowerCase()))
    );
  });

  // Función para redirigir a la página de editar encuesta
  const editarEncuesta = (id) => {
    navigate(`/editar-encuesta/${id}`);
  };

  useEffect(() => {
    obtenerEncuestas();
  }, []); // Se ejecuta solo una vez

  if (loading) {
    return <p>Cargando encuestas...</p>;
  }

  return (
    <div className="admin-container">
      <h2 className='Titulo'>Administrar Encuestas</h2>

      {/* Barra de búsqueda */}
      <div className='seeker-container'>
        <input
          type='text'
          placeholder='Buscar encuesta...'
          value={seekerEncuesta}
          onChange={(e) => setSeekerEncuesta(e.target.value)}
        />
        <button onClick={() => console.log('Buscar')}>Buscar</button>
      </div>

      <table className="encuestas-table">
  <thead>
    <tr>
      <th>Categoria Encuesta</th>
      <th>Descripcion Encuesta</th>
      <th>Pregunta Encuesta</th>
      <th>ID de la Empresa</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {encuestasFiltradas.map((encuesta) => (
      <tr key={encuesta.id}>
        <td>{encuesta.categoria_encuesta}</td>
        <td>{encuesta.descripcion_encuesta}</td>
        <td>{encuesta.pregunta_encuesta}</td>
        <td>{encuesta.id_empresa}</td>
        <td>{encuesta.activo ? "Activa" : "Desactivada"}</td>
        <td>
          <button className="button-custom" onClick={() => editarEncuesta(encuesta.id)}>Editar</button>
          <button className="button-custom2" onClick={() => cambiarEstadoEncuesta(encuesta.id, encuesta.activo)}>Activar/Desactivar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default AdministradorEncuestas;
