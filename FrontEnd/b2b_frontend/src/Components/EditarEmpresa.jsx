import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Para obtener el ID de la empresa y redirigir
import { get, patch } from '../Services/Crud';
import '../Style/EditarEmpresa.css';
import { useCookies } from "react-cookie";
import { mostrarAlerta } from './MostrarAlerta';
import LoadingSpinner from "../Components/LoadingSpinner";

const EditarEmpresa = () => {
  const [cookie] = useCookies(["token"]);
  const token = cookie.token;

  const [empresa, setEmpresa] = useState({
    nombre_empresa: '',
    cedula_juridica: '',
    correo: '',
  });

  const [errores, setErrores] = useState({
    nombreEmpresa: '',
    cedulaJuridica: '',
    correo: '',
  });

  const [loading, setLoading] = useState(true); // Estado para cargar los datos iniciales
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loading del botón

  const { id } = useParams(); // Obtenemos el ID de la empresa de la URL
  const navigate = useNavigate();

  // Obtenemos la información de la empresa a editar
  const obtenerEmpresa = async () => {
    try {
      const response = await get('empresas', id);
      setEmpresa(response); // este es el input de nombre de la empresa
      setLoading(false); // se mantiene en falso si las empresas estan cargando
    } catch (error) {
      console.error("Error al obtener la empresa:", error);
      setLoading(false);
    }
  };

  // Validación del formulario de edición
  const validarFormulario = () => {
    let esValido = true; // Si se llenaron todos los campos no se muestra
    let erroresTemp = { nombreEmpresa: '', cedulaJuridica: '', correo: '' };

    if (!empresa.nombre_empresa) {
      erroresTemp.nombreEmpresa = 'El nombre de la empresa es obligatorio';
      esValido = false;
    }

    if (!empresa.cedula_juridica) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica es obligatoria';
      esValido = false;
    } else if (!/^\d{10}$/.test(empresa.cedula_juridica)) {
      erroresTemp.cedulaJuridica = 'La cédula jurídica debe tener 10 dígitos';
      esValido = false;
    }

    if (!empresa.correo) {
      erroresTemp.correo = 'El correo es obligatorio';
      esValido = false;
    } else if (!/\S+@\S+\.\S+/.test(empresa.correo)) {
      erroresTemp.correo = 'El correo no es válido';
      esValido = false;
    }

    setErrores(erroresTemp);
    return esValido;
  };

  // Manejo del envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
 // Preparamos los datos a enviar basados en el estado 'empresa'

    const datosFormulario = {
      nombre_empresa: empresa.nombre_empresa,
      cedula_juridica: empresa.cedula_juridica,
      correo: empresa.correo,
    };

    setIsLoading(true); // Activar spinner en el botón

    try {
        // Realizamos la llamada PATCH para actualizar la empresa
      const response = await patch('empresas/', id, datosFormulario, token); // Llamamos a el metodo PATCH
      if (response) {
        mostrarAlerta("success", 'Empresa actualizada con éxito'); // Redirige al administrador a la lista de empresas
        navigate('/administradorEmpresas');
      } else {
          // Si la respuesta no es válida (por alguna razón el servidor no devuelve datos esperados)
        mostrarAlerta("error", 'Error al actualizar la empresa. Intenta nuevamente');
      }
    } catch (error) {
      mostrarAlerta("error", 'Error al actualizar la empresa');
      console.error('Error al actualizar la empresa:', error);
    } finally {
      setIsLoading(false); // Desactivar spinner
    }
  };

  useEffect(() => {
    obtenerEmpresa(); // Obtener los datos de la empresa cuando el componente se monta
  }, [id]); // Se ejecuta cuando cambia el ID de la empresa

  if (loading) {
    // Mostrar spinner mientras se cargan los datos iniciales
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={manejarEnvio} className='formEditar'>
      <div>
        <label className='label1'>Nombre de la empresa:</label>
        <input
          className='inputs'
          type="text"
          value={empresa.nombre_empresa}
          onChange={(e) => setEmpresa({ ...empresa, nombre_empresa: e.target.value })}
        />
        {errores.nombreEmpresa && <span className="error-text">{errores.nombreEmpresa}</span>}
      </div>

      <div>
        <label className='label1'>Ingrese su Cédula Jurídica:</label>
        <input
          className='inputs'
          type="text"
          value={empresa.cedula_juridica}
          onChange={(e) => setEmpresa({ ...empresa, cedula_juridica: e.target.value })}
        />
        {errores.cedulaJuridica && <span className="error-text">{errores.cedulaJuridica}</span>}
      </div>

      <div>
        <label className='label1'>Ingrese su Correo:</label>
        <input
          className='inputs'
          type="email"
          value={empresa.correo}
          onChange={(e) => setEmpresa({ ...empresa, correo: e.target.value })}
        />
        {errores.correo && <span className="error-text">{errores.correo}</span>}
      </div>

      <button type="submit" className='botonActualizar' disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Actualizar Empresa'}
      </button>
    </form>
  );
};

export default EditarEmpresa;
