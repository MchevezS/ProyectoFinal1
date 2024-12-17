import Carousel from "react-bootstrap/Carousel";
import '../Style/CarouselComentarios.css';
const CarouselComentarios = () => {
    const comentarios = [
        {
          comentario: "Nuestra plataforma nos permitió entender mejor las necesidades de nuestros empleados. Ahora podemos tomar decisiones basadas en datos reales para mejorar el bienestar laboral.",
          autor: "Carolina Herrera",
          cargo: "Encargada del área de ventas",
          img: "https://randomuser.me/api/portraits/women/11.jpg",
        },
        {
          comentario:
            "Implementar este servicio de encuestas ha sido un cambio positivo. Nos ayudó a identificar puntos clave de mejora y reforzar la satisfacción de nuestro equipo.",
          autor: "Victoria Martínez",
          cargo: "Directora general de recursos humanos",
          img: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        {
          comentario:
            "Gracias a esta herramienta, logramos medir el nivel de compromiso y felicidad de los empleados, lo que nos permitió implementar iniciativas efectivas para su bienestar.",
          autor: "Katja Meeuwsen-Nass",
          cargo: "Psicóloga organizacional",
          img: "https://randomuser.me/api/portraits/women/2.jpg",
        },
      ];
      
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-5 p-6 rounded-start">
          <h2 className="text-dark" style={{fontFamily:"serif",fontSize:"3.5rem"}}>
            El cambio positivo de B2B para las empresas
          </h2>
        </div>

        <div className="col-md-1 d-flex justify-content-center">
          <div
            style={{
              borderLeft: "2px solid #000",
              height: "200px",
            }}
          >
          </div>
        </div>

        <div className="col-md-6">
          <Carousel interval={1500} indicators={true}>
            {comentarios.map((item, index) => (
              <Carousel.Item key={index}>
                <blockquote className="blockquote">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9505 0L19.9604 1.90815C18.429 2.68247 17.2475 3.51901 16.4158 4.41778C15.5974 5.31654 15.1419 6.24988 15.0495 7.21778C15.3531 7.16247 15.6172 7.12099 15.8416 7.09333C16.066 7.06568 16.2376 7.05185 16.3564 7.05185C17.4785 7.05185 18.363 7.41136 19.0099 8.13037C19.67 8.83556 20 9.79654 20 11.0133C20 12.3546 19.6172 13.4469 18.8515 14.2904C18.0858 15.1338 17.0891 15.5556 15.8614 15.5556C14.4752 15.5556 13.3663 15.0647 12.5347 14.083C11.703 13.0874 11.2871 11.7669 11.2871 10.1215C11.2871 8.00593 11.9538 6.07012 13.2871 4.31407C14.6205 2.55802 16.5083 1.12 18.9505 0ZM7.68317 0L8.69307 1.90815C7.16172 2.68247 5.9802 3.51901 5.14851 4.41778C4.31683 5.31654 3.86139 6.24988 3.78218 7.21778C4.08581 7.16247 4.34323 7.12099 4.55446 7.09333C4.77888 7.06568 4.95049 7.05185 5.06931 7.05185C6.19142 7.05185 7.08251 7.41136 7.74257 8.13037C8.40264 8.83556 8.73267 9.79654 8.73267 11.0133C8.73267 12.3546 8.34323 13.4469 7.56436 14.2904C6.79868 15.1338 5.80858 15.5556 4.59406 15.5556C3.20792 15.5556 2.09241 15.0647 1.24752 14.083C0.415842 13.0874 0 11.7669 0 10.1215C0 8.00593 0.666667 6.07012 2 4.31407C3.33333 2.55802 5.22772 1.12 7.68317 0Z" fill="purple"></path>
                </svg>
                  <p className="mb-4">{item.comentario}</p>
                </blockquote>
                <div className="d-flex align-items-center">
                  <img
                    src={item.img}
                    alt={item.autor}
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div>
                    <h6 className="fw-bold mb-0">{item.autor}</h6>
                    <small className="text-muted">{item.cargo}</small>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default CarouselComentarios;
