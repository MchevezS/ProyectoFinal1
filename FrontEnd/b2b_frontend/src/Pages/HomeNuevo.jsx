import NavbarNuevo from '../Components/NavbarNuevo';
import HeroNuevo from '../Components/HeroNuevo';
import Pasos from '../Components/Pasos';
import Caracteristicas from '../Components/Caracteristicas';
import CarouselDatos from '../Components/CarouselDatos';
import CarouselComentarios from '../Components/CarouselComentarios';
import Footer from '../Components/Footer';
const HomeNuevo = () => {
    return(
        <>
            <header>
                <NavbarNuevo />
            </header>
            <main id='inicio'>
                    <HeroNuevo />
                    <Pasos/>
                    <Caracteristicas/>
                <section className="container">
                    <CarouselDatos/>
                </section>
            </main>
                <div>
                    <CarouselComentarios/>
                </div>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}
export default HomeNuevo;