import Navbar from "../Components/Navbar"
import Inicio from "../Components/Inicio";
import Resenas from "../Components/Resenas";
import HeroHome from "../Components/HeroHome";


function Home() {
  return (
    <div>
      <Navbar/>
      <Inicio/>
      <HeroHome/>
      <Resenas/>
    </div>
  )
}

export default Home
