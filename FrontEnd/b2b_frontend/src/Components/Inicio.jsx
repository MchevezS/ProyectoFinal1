import '../Style/Inicio.css';

const Inicio= () => {
  return (
    <section id="Home" className="caracteristicas">
      <h2>Características Principales</h2>
      <div className="benefits">
        <h3>¿Por qué elegir nuestro sistema?</h3>
        <ul>
          <li>Medimos el bienestar de tus empleados para mejorar la satisfacción y productividad.</li>
          <li>Obtienes informes detallados con análisis para identificar tendencias y áreas de mejora.</li>
          <li>Realizamos encuestas anónimas personalizadas para obtener feedback honesto.</li>
          <li>Recibes sugerencias de bienestar basadas en los resultados para mejorar el ambiente laboral.</li>
          <li>Integramos nuestro sistema con las plataformas de recursos humanos que ya utilizas.</li>
        </ul>
      </div>

      <div className="how-it-works">
        <h3>¿Cómo funciona?</h3>
        <ol>
          <li>Verifica que la empresa esté registrada para poder llenar el formulario.</li>
          <li>Llena el formulario de forma anónima.</li>
          <li>Implementa mejoras que puedas hacer según los resultados.</li>
          <li>Recibe informes con análisis detallados.</li>
        </ol>
      </div>
    </section>
  );
};

export default Inicio;
