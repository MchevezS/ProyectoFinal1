import Carousel from 'react-bootstrap/Carousel';
import '../Style/CarouselDatos.css';
const CarouselDatos = () => {
  return (
    <>
      <Carousel interval={1300} id="comentarios" className='carousel-datos'>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/RfAiqX0.jpg"
            alt="Sobre nosotros"
            height="470px"  
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://imgur.com/EQDI3je.jpg"
            alt="Misión y Visión"
            height="470px"  

          />
        </Carousel.Item>
      </Carousel>
    </>
  )
}
export default CarouselDatos;