import '../Style/Testimonio1.css';

const Testimonio1 = () => {
  

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
      <section className="testimonios" id='Reseñas'>
        <h2>Nuestros clientes dicen: </h2>
        <div className="testimonial-cards">
          {/* Testimonio 1 */}
          <div className="testimonial-card">
            <img src="laura.jpg" alt="Laura Gómez" />
            <h3>Laura Gómez</h3>
            <p><strong>Directora, Empresa ABC</strong></p>
            <p>Desde que implementamos el sistema de bienestar, hemos logrado aumentar la satisfacción de nuestros empleados en un 30%. 
                Las encuestas personalizadas nos han dado una visión clara de áreas clave de mejora, y las recomendaciones específicas nos han permitido implementar cambios que marcan la diferencia.</p>
          </div>

        </div>
      </section>

        {/* Sección de CTA */}
        <section className="cta">
        <h2>¿Listo para transformar el bienestar en tu empresa?</h2>
      </section>

      
    </div>
  );
};

export default Testimonio1;