import { useState, useEffect } from 'react';
import { get, eliminar } from '../Services/Crud';
import { useNavigate } from 'react-router-dom';
import '../Style/AdministradorGeneral.css';

const AdministradorGeneral = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeker, setSeeker] = useState(''); // Estado del buscador(seeker)
  const navigate = useNavigate();

  // Obtener todas las empresas
  const obtenerEmpresas = async () => {
    try {
      const response = await get('empresas');
      setEmpresas(response);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
      setLoading(false);
    }
  };

  // Eliminar una empresa
  const eliminarEmpresa = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta empresa?");
    if (confirmacion) {
      try {
        const response = await eliminar('empresas', id); // El id es el identificador único
        if (response) {
          alert("Empresa eliminada con éxito");
        } else {
          alert("No se pudo eliminar la empresa");
        }
        obtenerEmpresas(); // Vuelve a cargar la lista después de eliminar
      } catch (error) {
        console.log(error);
        alert("Error al eliminar la empresa");
      }
    }
  };
  
  // Editar una empresa
  const editarEmpresa = (id) => {
    // Redirige a otra página donde se edita la empresa
    navigate(`/editar-empresa/${id}`);
  };

// Filtrar empresas para buscarlas
const empresasFiltradas = empresas.filter((empresa) => {
  return empresa.nombre_empresa.toLowerCase().includes(seeker.toLowerCase()) ||
         empresa.cedula_juridica.toLowerCase().includes(seeker.toLowerCase()) ||
         empresa.correo.toLowerCase().includes(seeker.toLowerCase());
});


  useEffect(() => {
    obtenerEmpresas();
  }, []); // Se ejecuta solo una vez

  if (loading) {
    return <p>Cargando empresas...</p>;
  }

  return (
    <div className="admin-container">
      <h2 className='Titulo'>Administrar Empresas</h2>

      {/* Barra de búsqueda */}
      <div className='seeker-container'>
        <input type='text' placeholder='Buscar empresa...' value={seeker} onChange={(e) => setSeeker(e.target.value)}/>
        <button onClick={() => console.log('Buscar')}>Buscar</button>
      </div>
      <table className="empresas-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula Jurídica</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresasFiltradas.map((empresa) => (
            <tr key={empresa.id}>
              <td>{empresa.nombre_empresa}</td>
              <td>{empresa.cedula_juridica}</td>
              <td>{empresa.correo}</td>
              <td>
                <button className="button-custom" onClick={() => editarEmpresa(empresa.id)}>Editar</button>
                <button className="button-custom2" onClick={() => eliminarEmpresa(empresa.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministradorGeneral;
