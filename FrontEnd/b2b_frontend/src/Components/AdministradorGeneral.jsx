import { useState, useEffect } from 'react';
import { get, patch } from '../Services/Crud';  // Asegúrate de que 'patch' esté configurado
import { useNavigate } from 'react-router-dom';
import '../Style/AdministradorGeneral.css';
import { useCookies } from "react-cookie";
const AdministradorGeneral = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeker, setSeeker] = useState(''); // Estado del buscador(seeker)
  const navigate = useNavigate();
  const [cookies] = useCookies(['token'])
  const token = cookies.token
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

  // Cambiar el estado (activar/desactivar) de una empresa
  const cambiarEstadoEmpresa = async (id, estadoActual) => {
    // window.confirm( abre una ventana y muestra un mensaje de texto )
    const confirmacion = window.confirm(`¿Estás seguro de que deseas ${estadoActual ? "desactivar" : "activar"} esta empresa?`);
    if (confirmacion) {
      try {
        const response = await patch(`empresa/estado`,id,token); // llamamos al metodo PATCH para que haga los cambios en la url (empresa/estado)
        if (response) { 
          // Muestra una alerta si quiere desactivar/activar la empresa con exito
          alert(`Empresa ${estadoActual ? "desactivada" : "activada"} con éxito`);  
        } else {
          // Muestra una alerta si no se puede cambiar el estado de la empresa
          alert("No se pudo cambiar el estado de la empresa");
        }
        obtenerEmpresas(); // Vuelve a cargar la lista después de cambiar el estado
      } catch (error) {
        console.log(error);
        alert("Error al cambiar el estado de la empresa");
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
    return <p>Cargando empresas...</p>;
  }

  return (
    <div className="admin-container">
      <h2 className='Titulo'>Administrar Empresas</h2>

      {/* Barra de búsqueda */}
      <div className='seeker-container'>
        <input type='text' placeholder='Buscar empresa...' value={seeker} onChange={(e) => setSeeker(e.target.value)} />
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
                <button className="button-custom" onClick={() => editarEmpresa(empresa.id)}>Editar</button>
                <button className="button-custom2" onClick={() => cambiarEstadoEmpresa(empresa.id, empresa.activo)}>Activar/Desactivar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministradorGeneral;