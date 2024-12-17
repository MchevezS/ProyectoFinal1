import '../Style/SobreNosotros.css';

function SobreNosotros() {
  return (
    <div className="mision-vision-page">
      <header>
      <h1>Sobre Nosotros</h1>
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

        <section>
        <h2>Nuestra Historia</h2>
        <p>
          Nuestra empresa nació con el objetivo de mejorar el bienestar laboral de los empleados mediante encuestas que 
          nos ayudan a ver como se encuentran las personas tanto fisicamente como emocionalmente asi mejoramos el entorno laboral para todos.
        </p>
      </section>

      <section>
        <h2>Contacto</h2>
        <p>
          Si deseas saber más sobre nosotros o tienes alguna pregunta, no dudes en contactarnos en: empresaB2B@gmail.com
        </p>
      </section>

      <section>
        <h2>Conoce al Equipo</h2>
        <p>
          Somos un equipo apasionado y dedicado, trabajando juntos para lograr nuestro objetivo común: transformar el sistema evaluativo de las 
          empresas, para que los empleados encuentren oportunidades de crecimiento profesional y personal.
        </p>
        <ul>
           <p className='nombre1'> Michelle <br /></p>
           <p className='nombre2'> Wendy <br /></p>
           <p className='nombre3'> Moha <br /></p>
        </ul>
      </section>

      </div>
    </div>
  );
}

export default SobreNosotros;
