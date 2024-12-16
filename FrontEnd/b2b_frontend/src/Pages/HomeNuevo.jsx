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
            <main>
                <HeroNuevo />
                <Pasos/>
                <Caracteristicas/>
                <CarouselDatos/>
                <div>
                    <CarouselComentarios/>
                </div>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}
export default HomeNuevo;