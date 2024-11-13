import '../Style/ComponenteTestimonioss.css';
import { useState } from 'react';

const Testimonios = () => {
  const [showContact, setShowContact] = useState(false); // Hook para mostrar nuestro contacto

  const toggleContactInfo = () => {
    setShowContact(!showContact); // Función para alternar la visualización
  };

  return (
    <div>
      {/* Sección de fondo */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Lo que dicen nuestros clientes</h1>
          <p>Descubre cómo nuestro sistema de bienestar ha transformado la cultura empresarial y la satisfacción de los empleados.</p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonios">
        <h2>Testimonios destacados</h2>
        <div className="testimonial-cards">
          {/* Testimonio 1 */}
          <div className="testimonial-card">
            <img src="laura.jpg" alt="Laura Gómez" />
            <h3>Laura Gómez</h3>
            <p><strong>Directora, Empresa ABC</strong></p>
            <p>Desde que implementamos el sistema de bienestar, hemos logrado aumentar la satisfacción de nuestros empleados en un 30%. 
                Las encuestas personalizadas nos han dado una visión clara de áreas clave de mejora, y las recomendaciones específicas nos han permitido implementar cambios que marcan la diferencia.</p>
          </div>

          {/* Testimonio 2 */}
          <div className="testimonial-card">
            <img src="carlos.jpg" alt="Carlos Martínez" />
            <h3>Carlos Martínez</h3>
            <p><strong>CEO, Grupo X</strong></p>
            <p>Nuestro equipo está más comprometido y motivado. 
                Con los datos proporcionados por el sistema, pudimos tomar decisiones informadas que aumentaron el bienestar general, reduciendo la rotación y mejorando la productividad.</p>
          </div>

          {/* Testimonio 3 */}
          <div className="testimonial-card">
            <img src="maria.jpg" alt="María Rodríguez" />
            <h3>María Rodríguez</h3>
            <p><strong>Jefa de Cultura Corporativa, Innovatech</strong></p>
            <p>El uso de este sistema nos permitió identificar rápidamente problemas relacionados con el bienestar mental de nuestros empleados. 
                Las soluciones personalizadas nos han ayudado a crear un entorno más positivo y saludable.</p>
          </div>
        </div>
      </section>

        {/* Sección de CTA */}
        <section className="cta">
        <h2>¿Listo para transformar el bienestar en tu empresa?</h2>
        <button onClick={toggleContactInfo}>Contáctanos</button>
      </section>

      {/* Modal de Contacto */}
      {showContact && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={toggleContactInfo}>X</button>
            <h2>Información de Contacto</h2>
            <p>Correo: <strong>contacto@bienestar.com</strong></p>
            <p>Teléfono: <strong>(+34) 123 456 789</strong></p>
            <p>Dirección: Calle de la Innovación, 123, Madrid</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonios;