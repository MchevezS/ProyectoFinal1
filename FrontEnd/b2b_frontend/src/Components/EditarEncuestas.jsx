import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, patch } from '../Services/Crud';
import '../Style/EditarEncuesta.css';
import { useCookies } from "react-cookie";
import { mostrarAlerta } from '../Components/MostrarAlerta';

const EditarEncuestas = () => {
  const [cookie] = useCookies(["token"]);
  const token = cookie.token;
  const [encuestas, setEncuestas] = useState({
    categoria_encuesta: '',
    descripcion_encuesta: '',
    pregunta_encuesta: '',
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener la información de la encuesta
  const obtenerEncuesta = async () => {
    try {
      const response = await get('encuestas', id);
      // const respon = await get('preguntas', id);
      console.log(response)
      setEncuestas(response);
      // setEncuestas(respon)
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la encuesta:", error);
      setLoading(false);
    }
  };

  // Validación del formulario
  const validarFormulario = () => {
    let esValido = true;

    if (!encuestas.categoria_encuesta.trim()) {
      mostrarAlerta('error', 'El nombre de la encuesta es obligatorio');
      esValido = false;
    }

    if (!encuestas.descripcion_encuesta.trim()) {
      mostrarAlerta('error', 'La descripción de la encuesta es obligatoria');
      esValido = false;
    }

    return esValido;
  };

  // Manejo del envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const datosFormulario = {
        categoria_encuesta: encuestas.categoria_encuesta,
        descripcion_encuesta: encuestas.descripcion_encuesta,
      };

      try {
        const response = await patch('encuestas/', id, datosFormulario, token);
        if (response) {
          mostrarAlerta('success', 'Encuesta actualizada con éxito');
          navigate('/administradorEncuestas');
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
  }, []);

  if (loading) {
    return <p>Cargando datos de la encuesta...</p>
  }

  return (
    <form onSubmit={manejarEnvio} className='formEditar'>
      <div>
        <label className='label1'>Ingrese la categoria:</label>
        <input className='inputs' type="text" value={encuestas.categoria_encuesta} onChange={(e) => setEncuestas({ ...encuestas, categoria_encuesta: e.target.value })}/>
      </div>

      <div>
        <label className='label1'>Ingrese su descripcion de la encuesta:</label>
        <input className='inputs' type="text" value={encuestas.descripcion_encuesta} onChange={(e) => setEncuestas({ ...encuestas, descripcion_encuesta: e.target.value })}/>
      </div>

      <button type="submit" className='botonActualizar'>Actualizar Encuesta</button>
    </form>
  );
};

export default EditarEncuestas;
