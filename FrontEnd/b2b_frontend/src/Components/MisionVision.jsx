import '../Style/MisionVision.css';

function MisionVision() {
  return (
    <div className="mision-vision-page">
      <header>
        <h1>Bienestar de los Empleados</h1>
        <p className='conoce'>Conoce nuestra misión y visión sobre el bienestar laboral</p>
      </header>

      <div className="content">
        {/* Misión */}
        <section className="section">
          <h2>Misión</h2>
          <p>
            Nuestra misión es crear un entorno de trabajo positivo, donde cada empleado se sienta valorado,
            apoyado y motivado. A través de encuestas, buscamos mejorar el bienestar
            de nuestros colaboradores, adaptándonos a sus necesidades y promoviendo un ambiente estable y saludable.
          </p>
        </section>

        {/* Visión */}
        <section className="section">
          <h2>Visión</h2>
          <p>
            Ser la empresa líder en el bienestar laboral, donde nuestros empleados encuentren oportunidades de
            crecimiento personal y profesional en un entorno de trabajo saludable. Queremos crear una cultura
            organizada, basada en el respeto, la empatía y el trabajo en equipo.
          </p>
        </section>
      </div>
    </div>
  );
}

export default MisionVision;
