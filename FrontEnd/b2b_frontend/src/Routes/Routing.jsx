import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Encuestas from '../Pages/Encuestas';
import Empresas from '../Pages/Empresas';
import RegistroLogin from '../Components/RegistroLogin';
import AdministradorGeneral from '../Components/AdministradorGeneral';
import CardPregunta from '../Components/CardPregunta';


const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/encuestas' element={<Encuestas/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/registroLogin' element={<RegistroLogin/>}/>
          <Route path="/administradorGeneral" element={<AdministradorGeneral/>} />
          <Route path='/cardPregunta' element={<CardPregunta/>}/>


       </Routes>
      </Router>
     );
  };
  export default Routing;