import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Encuestas from '../Pages/Encuestas';
import Empresas from '../Pages/Empresas';
import Login from '../Pages/Login';
import FormularioEncuesta from '../Components/FormularioEncuesta';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import AdministradorGeneral from '../Components/AdministradorGeneral';
import CardPregunta from '../Components/CardPregunta';


const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/encuestas' element={<Encuestas/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/formularioEncuestas' element={<FormularioEncuesta/>}/>
          <Route path='/registroEmpleados' element={<RegistroEmpleados/>}/>
          <Route path='/registroLogin' element={<Login/>}/>
          <Route path="/administradorGeneral" element={<AdministradorGeneral/>} />
          <Route path='/cardPregunta' element={<CardPregunta/>}/>


       </Routes>
      </Router>
     );
  };
  export default Routing;