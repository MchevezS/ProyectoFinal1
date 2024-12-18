import '../Style/Resenas.css';
import CardResena from './CardResena';
import CardResena2 from './CardResena2';
import CardResenas3 from './CardResenas3';

const Resenas = () => {
  return (
    <div className="resenas-container">
      {/* Sección de fondo */}
      <section className="hero1" id="Reseñas">
        <div className="hero1-overlay text-center">
          <h1 className="textoResenas">Lo que dicen nuestros clientes</h1>
          <p className="texto1Resenas">
            Descubre cómo nuestro sistema de bienestar ha transformado la cultura empresarial y la satisfacción de los empleados.
          </p>
        </div>
      </section>

      {/* Sección de tarjetas */}
      <section className="cards-container">
        <CardResena />
        <CardResena2/>
        <CardResenas3 />
      </section>
    </div>
  );
};

export default Resenas;
