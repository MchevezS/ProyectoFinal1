import React, { useState } from 'react';

function Encuesta() {
  // Estado para almacenar las respuestas de la encuesta
  const [respuestas, setRespuestas] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: ''
  });

  // Función para manejar el cambio de las respuestas
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRespuestas({
      ...respuestas,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Respuestas enviadas:', respuestas);
    alert('¡Gracias por completar la encuesta!');
    // Aquí puedes agregar la lógica para enviar las respuestas al backend, etc.
  };

  return (
    <div>
      <h1>Encuesta de Satisfacción</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pregunta1">1. ¿Cómo calificarías nuestro servicio?</label>
          <div>
            <input
              type="radio"
              id="muyBien"
              name="pregunta1"
              value="Muy Bien"
              checked={respuestas.pregunta1 === 'Muy Bien'}
              onChange={handleChange}
            />
            <label htmlFor="muyBien">Muy Bien</label>
          </div>
          <div>
            <input
              type="radio"
              id="bien"
              name="pregunta1"
              value="Bien"
              checked={respuestas.pregunta1 === 'Bien'}
              onChange={handleChange}
            />
            <label htmlFor="bien">Bien</label>
          </div>
          <div>
            <input
              type="radio"
              id="regular"
              name="pregunta1"
              value="Regular"
              checked={respuestas.pregunta1 === 'Regular'}
              onChange={handleChange}
            />
            <label htmlFor="regular">Regular</label>
          </div>
          <div>
            <input
              type="radio"
              id="mal"
              name="pregunta1"
              value="Mal"
              checked={respuestas.pregunta1 === 'Mal'}
              onChange={handleChange}
            />
            <label htmlFor="mal">Mal</label>
          </div>
        </div>

        <div>
          <label htmlFor="pregunta2">2. ¿Qué tan fácil fue usar nuestro sitio web?</label>
          <div>
            <input
              type="radio"
              id="muyFacil"
              name="pregunta2"
              value="Muy Fácil"
              checked={respuestas.pregunta2 === 'Muy Fácil'}
              onChange={handleChange}
            />
            <label htmlFor="muyFacil">Muy Fácil</label>
          </div>
          <div>
            <input
              type="radio"
              id="facil"
              name="pregunta2"
              value="Fácil"
              checked={respuestas.pregunta2 === 'Fácil'}
              onChange={handleChange}
            />
            <label htmlFor="facil">Fácil</label>
          </div>
          <div>
            <input
              type="radio"
              id="dificil"
              name="pregunta2"
              value="Difícil"
              checked={respuestas.pregunta2 === 'Difícil'}
              onChange={handleChange}
            />
            <label htmlFor="dificil">Difícil</label>
          </div>
        </div>

        <div>
          <label htmlFor="pregunta3">3. ¿Recomendarías nuestro servicio?</label>
          <div>
            <input
              type="radio"
              id="si"
              name="pregunta3"
              value="Sí"
              checked={respuestas.pregunta3 === 'Sí'}
              onChange={handleChange}
            />
            <label htmlFor="si">Sí</label>
          </div>
          <div>
            <input
              type="radio"
              id="no"
              name="pregunta3"
              value="No"
              checked={respuestas.pregunta3 === 'No'}
              onChange={handleChange}
            />
            <label htmlFor="no">No</label>
          </div>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default Encuesta;
