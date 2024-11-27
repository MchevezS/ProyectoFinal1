import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import CrearEncuestas from '../Pages/CrearEncuestas';
import Empresas from '../Pages/Empresas';
import Login from '../Pages/Login';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import AdministradorGeneral from '../Components/AdministradorGeneral';
import ResponderEncuestas from '../Pages/ResponderEncuestas';
import VerEncuesta from '../Pages/VerEncuesta';


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
          <Route path='/responderEncuestas' element={<ResponderEncuestas/>}/>
          <Route path='/verEncuesta' element={<VerEncuesta/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;