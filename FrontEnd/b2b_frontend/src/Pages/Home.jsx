import Navbar from "../Components/Navbar"
import Inicio from "../Components/Inicio";
import Resenas from "../Components/Resenas";
import HeroHome from "../Components/HeroHome";
import '../Style/Home.css'

function Home() {
  return (
  <>
    <div className="navbarHome">
      <Navbar/>
    </div>
    
    <div className="heroHome0">
      <HeroHome/>
    </div>

    <div className="inicioHome">
      <Inicio/>
    </div>

    <div className="resenasHome">
      <Resenas/>
    </div>
  </>
  )
}

export default Home
