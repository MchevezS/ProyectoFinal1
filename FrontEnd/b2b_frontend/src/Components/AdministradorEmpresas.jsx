import { useState, useEffect } from 'react';
import { get, patch } from '../Services/Crud';  // Asegúrate de que 'patch' esté configurado
import { useNavigate } from 'react-router-dom';
import '../Style/AdministradorEmpresas.css';
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2';
import { mostrarAlerta } from './MostrarAlerta';

const AdministradorEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para cargar los datos iniciales
  const [isUpdating, setIsUpdating] = useState(false); // Estado para manejar el spinner en el botón
  const [seeker, setSeeker] = useState(''); // Estado del buscador empresas(seeker)
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  // Obtener todas las empresas
  const obtenerEmpresas = async () => {
    try {
      setLoading(true); // Iniciar la carga
      const response = await get('empresas');
      setEmpresas(response);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Cambiar el estado (activar/desactivar) de una empresa
  const cambiarEstadoEmpresa = async (id, estadoActual) => {
  // Muestra alerta personalizada
    const result = await Swal.fire({
      title: `¿Estás seguro de que deseas ${estadoActual ? "desactivar" : "activar"} esta empresa?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      try {
        setIsUpdating(true); // Activar el spinner
        const data = { estado: !estadoActual }; // nuevo estado
        const response = await patch(`empresa/estado/`, id, data, token); // PATCH para cambiar el estado
        if (response) {
          await mostrarAlerta('success', `Empresa ${estadoActual ? "desactivada" : "activada"} con éxito`);
        } else {
          await mostrarAlerta('error', 'No se pudo cambiar el estado de la empresa');
        }
        obtenerEmpresas(); // Vuelve a cargar la lista después de cambiar el estado
      } catch (error) {
        console.log(error);
        mostrarAlerta('error', 'Error al cambiar el estado de la empresa');
      } finally {
        setIsUpdating(false); // Desactivar el spinner
      }
    }
  };

  // Filtrar empresas para buscarlas
  const empresasFiltradas = empresas.filter((empresa) => {
    return empresa.nombre_empresa.toLowerCase().includes(seeker.toLowerCase()) ||
           empresa.cedula_juridica.toLowerCase().includes(seeker.toLowerCase()) ||
           empresa.correo.toLowerCase().includes(seeker.toLowerCase());
  });

  // Función para redirigir a la página de edición
  const editarEmpresa = (id) => {
    navigate(`/editar-empresa/${id}`); // Redirige a la página de edición con el id de la empresa
  };

  useEffect(() => {
    obtenerEmpresas();
  }, []); // Se ejecuta solo una vez

  if (loading) {
    // Mostrar spinner mientras se cargan los datos iniciales
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-container">
      <h2 className='Titulo'>Administrar Empresas</h2>

      {/* Barra de búsqueda */}
      <div className='seeker-container'>
        <input
          type='text'
          placeholder='Buscar empresa...'
          value={seeker}
          onChange={(e) => setSeeker(e.target.value)}
        />
        <button onClick={() => console.log('Buscar')}>Buscar</button>
      </div>

      <table className="empresas-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula Jurídica</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresasFiltradas.map((empresa) => (
            <tr key={empresa.id}>
              <td>{empresa.nombre_empresa}</td>
              <td>{empresa.cedula_juridica}</td>
              <td>{empresa.correo}</td>
              <td>{empresa.activo ? "Activa" : "Desactivada"}</td>
              <td>
                <button
                  className="button-custom"
                  onClick={() => editarEmpresa(empresa.id)}
                >
                  Editar
                </button>
                <button
                  className="button-custom2"
                  onClick={() => cambiarEstadoEmpresa(empresa.id, empresa.activo)}
                  disabled={isUpdating} // Desactivar mientras está actualizando
                >
                  {isUpdating ? <LoadingSpinner small /> : "Activar/Desactivar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministradorGeneral;