import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, patch } from '../Services/Crud';
import '../Style/EditarEncuesta.css';
import { useCookies } from "react-cookie";
import { mostrarAlerta } from './MostrarAlerta'; // Asegúrate de importar la función de la alerta

const EditarEncuesta = () => {
  const [cookie] = useCookies(["token"]);
  const token = cookie.token;
  const [encuesta, setEncuesta] = useState({
    categoriaEncuesta: '',
    descripcionEncuesta: '',
    preguntaEncuesta: '',
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener la información de la encuesta
  const obtenerEncuesta = async () => {
    try {
      const response = await get('encuestas', id);
      setEncuesta(response);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la encuesta:", error);
      setLoading(false);
    }
  };

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;

    if (!encuesta.categoriaEncuesta.trim()) {
      mostrarAlerta('error', 'El nombre de la encuesta es obligatorio');
      esValido = false;
    }

    if (!encuesta.descripcionEncuesta.trim()) {
      mostrarAlerta('error', 'La descripción de la encuesta es obligatoria');
      esValido = false;
    }

    if (!encuesta.preguntaEncuesta.trim()) {
      mostrarAlerta('error', 'La pregunta de la encuesta es obligatoria');
      esValido = false;
    }

    return esValido;
  };

  // Manejo del envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const datosFormulario = {
        categoriaEncuesta: encuesta.categoriaEncuesta,
        descripcionEncuesta: encuesta.descripcionEncuesta,
        preguntaEncuesta: encuesta.preguntaEncuesta,
      };

      try {
        const response = await patch('encuestas/', id, datosFormulario, token);
        if (response) {
          mostrarAlerta('success', 'Encuesta actualizada con éxito');
          navigate('/administradorGeneral');
        } else {
          mostrarAlerta('error', 'Error al actualizar la encuesta. Intenta nuevamente');
        }
      } catch (error) {
        mostrarAlerta('error', 'Error al actualizar la encuesta');
        console.error('Error al actualizar la encuesta:', error);
      }
    }
  };

  useEffect(() => {
    obtenerEncuesta();
  }, [id]);

  if (loading) {
    return <p>Cargando datos de la encuesta...</p>;
  }

  return (
    <form onSubmit={manejarEnvio} className='formEditar'>
      <div>
        <label className='label1'>Ingrese la categoria:</label>
        <input className='inputs' type="text" value={encuesta.categoriaEncuesta} onChange={(e) => setEncuesta({ ...encuesta, categoriaEncuesta: e.target.value })}/>
      </div>

      <div>
        <label className='label1'>Ingrese su descripcion de la encuesta:</label>
        <input className='inputs' type="text" value={encuesta.descripcionEncuesta} onChange={(e) => setEncuesta({ ...encuesta, descripcionEncuesta: e.target.value })}/>
      </div>

      <div>
        <label className='label1'>Ingrese su pregunta de Encuesta:</label>
        <input className='inputs' type="email" value={encuesta.preguntaEncuesta} onChange={(e) => setEncuesta({ ...encuesta, preguntaEncuesta: e.target.value })}/>
      </div>

      <button type="submit" className='botonActualizar'>Actualizar Encuesta</button>
    </form>
  );
};

export default EditarEncuesta;
