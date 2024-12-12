import '../Style/Resenas.css';
import CardResena from './CardResena';

const Resenas = () => {
  
  return (
    <div>
      {/* Sección de fondo */}
      <section className="hero" id='Reseñas'>
        <div className="hero-overlay text-center">
          <h1>Lo que dicen nuestros clientes</h1>
          <p>Descubre cómo nuestro sistema de bienestar ha transformado la cultura empresarial y la satisfacción de los empleados.</p>
        </div>
          <section className='d-flex gap-3'>
            <CardResena/>
            <CardResena/>
            <CardResena/>
          </section>
      </section>


    </div>
  );
};

export default Resenas;