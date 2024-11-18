import Navbar from "../Components/Navbar"
import CaracteristicasPrincipales from "../Components/CaracteristicasPrincipales";
import FormEmpresas from "../Components/FormEmpresas";
import Testimonio1 from "../Components/Testimonio1";
import Testimonio2 from '../Components/Testimonio2';
import Testimonio3 from '../Components/Testimonio3';

function Home() {
  return (
    <div>
      <Navbar/>
      <CaracteristicasPrincipales/>
      <Testimonio1/>
      <Testimonio2/>
      <Testimonio3/>
      <FormEmpresas/>
    </div>
  )
}

export default Home
