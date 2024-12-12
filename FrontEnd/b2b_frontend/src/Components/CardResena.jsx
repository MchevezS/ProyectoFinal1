import '../Style/cardResena.css';
import fotoPerfil1 from '../assets/fotodeperfilMaria1.webp';  // Nueva imagen

function CardResena() {
  return (
    <div>
      {/* Testimonio 1*/}
      <div className="testimonial-card">
        <img className="testimonial-card-img" src={fotoPerfil1} alt="María Rodríguez" />
        <h3 className="testimonial-card-name">María Rodríguez</h3>
        <p className="testimonial-card-role"><strong>Jefa de Cultura Corporativa, Innovatech</strong></p>
        <p className="testimonial-card-text">
          El uso de este sistema nos permitió identificar rápidamente problemas relacionados con el bienestar mental de nuestros empleados. 
          Las soluciones personalizadas nos han ayudado a crear un entorno más positivo y saludable.
        </p>
      </div>
    </div>
  );
}

export default CardResena;
