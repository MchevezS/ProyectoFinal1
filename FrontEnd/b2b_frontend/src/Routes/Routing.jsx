import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import CrearEncuestas from '../Pages/CrearEncuestas';
import Empresas from '../Pages/Empresas';
import Login from '../Pages/Login';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import AdministradorGeneral from '../Components/AdministradorGeneral';
import CardPregunta from '../Components/CardPregunta';


const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/CrearEncuestas' element={<CrearEncuestas/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/registroEmpleados' element={<RegistroEmpleados/>}/>
          <Route path='/registroLogin' element={<Login/>}/>
          <Route path="/administradorGeneral" element={<AdministradorGeneral/>} />
          <Route path='/cardPregunta' element={<CardPregunta/>}/>


       </Routes>
      </Router>
     );
  };
  export default Routing;