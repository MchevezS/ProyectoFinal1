import NavContactenos from './NavContactenos';  // Asegúrate de importar el navbar
import '../Style/Contactenos.css'; // Asegúrate de importar tu archivo CSS

function Contactenos() {
  return (
    <div>
      {/* Importamos el navbar */}
      <NavContactenos />

      {/* Contenido */}
      <div className="container">
        <h1>Queremos escucharte, ¡contáctanos!</h1>
        <p>¿Cómo podemos ayudarte?</p>

        {/* Preguntas Frecuentes */}
        <div id="preguntas-frecuentes" className="mt-5">
          <h2>Preguntas frecuentes</h2>
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                  ¿Cuál es el horario de atención?
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Nuestros horarios de atención son de lunes a viernes de 7:00 AM a 5:30 PM.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                  ¿Cómo puedo contactar al servicio al cliente?
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-header">
                  Puedes contactarnos a través del correo electrónico o llamando a nuestro número de atención al cliente.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsetree" aria-expanded="false" aria-controls="panelsStayOpen-collapsetree">
                  ¿Cuál es el horario de atención?
                </button>
              </h2>
              <div id="panelsStayOpen-collapsetree" className="accordion-collapse collapse">
                <div className="accordion-header">
                  Nuestros horarios de atención son de lunes a viernes de 7:00 AM a 5:30 PM.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Servicio al Cliente */}
        <div id="servicio-al-cliente" className="mt-5">
          <h2>Servicio al Cliente</h2>
          <p>Te damos la bienvenida al Servicio al Cliente. ¿Con qué te gustaría recibir ayuda hoy?</p>
          {/* Aquí podrías agregar más opciones según tus necesidades */}
        </div>

        {/* Llamar */}
        <div id="llamar" className="mt-5">
          <h2>Llamar</h2>
          <p>Puedes llamarnos al siguiente número:</p>
          <p><strong>+1 800 123 4567</strong></p>
          <p>Horario de atención telefónica: 7:00 AM - 5:30 PM, lunes a viernes.</p>
        </div>
      </div>
    </div>
  );
}

export default Contactenos;
