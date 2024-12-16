import Carousel from 'react-bootstrap/Carousel';

const CarouselDatos = () => {
  return (
    <>
      <Carousel interval={2000} id="comentarios">
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sobre nosotros"
          />
        <Carousel.Caption  style={{backgroundColor:"rgba(0,0,0,0.3)",fontFamily:"serif",marginBottom:"50px"}}> 
          <h3>Sobre Nosotros</h3>
          <p style={{fontFamily:"Lora"}}>En B2B, nos especializamos en mejorar el bienestar de los empleados para transformar la cultura organizacional. Creemos que un equipo saludable y motivado es la clave para el éxito a largo plazo de cualquier empresa. A través de encuestas personalizadas y análisis detallados, proporcionamos a las organizaciones herramientas efectivas para medir y mejorar el bienestar de sus equipos.</p>
        </Carousel.Caption>

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Misión y Visión"
          />
          <Carousel.Caption  style={{backgroundColor:"rgba(0,0,0,0.3)",fontFamily:"serif",marginBottom:"-1vh",width:"76%",marginLeft:"-3%"}}> 
            <h3>Misión</h3>
            <p style={{fontFamily:"Lora"}}>
            Nuestra misión es crear un entorno de trabajo positivo, donde cada empleado se sienta valorado,
            apoyado y motivado. A través de encuestas, buscamos mejorar el bienestar
            de nuestros colaboradores, adaptándonos a sus necesidades y promoviendo un ambiente estable y saludable.
            </p>
        
            <h3>Visión</h3>
            <p style={{fontFamily:"Lora"}}>
            Ser la empresa líder en el bienestar laboral, donde nuestros empleados encuentren oportunidades de
            crecimiento personal y profesional en un entorno de trabajo saludable. Queremos crear una cultura
            organizada, basada en el respeto, la empatía y el trabajo en equipo.
            </p>
        </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}
export default CarouselDatos;