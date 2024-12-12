import '../Style/Inicio.css';
import Carousel from 'react-bootstrap/Carousel';
import Diapositiva1HomeCarousel from '../assets/Diapositiva1HomeCarousel.webp'
import Diapositiva2HomeCarousel from '../assets/Diapositiva2HomeCarousel.webp'
import Diapositiva3HomeCarousel from '../assets/Diapositiva3HomeCarousel.webp'
const Inicio= () => {

  return (
    <Carousel>
      {/* Diapositiva 1: Características Principales */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Diapositiva1HomeCarousel}
          alt="Características Principales"
        />
        <Carousel.Caption>
          <h2>Características Principales</h2>
          <ul className='caracteristicasPrincipales'>
            <li>Medimos el bienestar de tus empleados para mejorar la satisfacción y productividad.</li>
            <li>Obtienes informes detallados con análisis para identificar tendencias y áreas de mejora.</li>
            <li>Realizamos encuestas anónimas personalizadas para obtener feedback honesto.</li>
            <li>Recibes sugerencias de bienestar basadas en los resultados para mejorar el ambiente laboral.</li>
            <li>Integramos nuestro sistema con las plataformas de recursos humanos que ya utilizas.</li>
          </ul>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Diapositiva 2: ¿Por qué elegir nuestro sistema? */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src= {Diapositiva2HomeCarousel}
          alt="¿Por qué elegir nuestro sistema?"
        />
        <Carousel.Caption>
          <h3>¿Por qué elegir nuestro sistema?</h3>
          <p>
            Nuestro sistema te ayuda a identificar áreas clave para mejorar el ambiente laboral y la productividad de tus empleados.
            Proporcionamos análisis detallados y sugerencias específicas basadas en datos reales.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Diapositiva 3: ¿Cómo funciona? */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Diapositiva3HomeCarousel}
          alt="¿Cómo funciona?"
        />
        <Carousel.Caption>
          <h3>¿Cómo funciona?</h3>
          <ol>
            <li>Verifica que la empresa esté registrada para poder llenar el formulario.</li>
            <li>Llena el formulario de forma anónima.</li>
            <li>Implementa mejoras que puedas hacer según los resultados.</li>
            <li>Recibe informes con análisis detallados.</li>
          </ol>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default Inicio;
