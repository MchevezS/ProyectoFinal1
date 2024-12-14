import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import CrearEncuestas from '../Pages/CrearEncuestas';
import Empresas from '../Pages/Empresas';
import Login from '../Pages/Login';
import AdministradorGeneral from '../Components/AdministradorGeneral';
import ResponderEncuestas from '../Pages/ResponderEncuestas';
import VerEncuesta from '../Pages/VerEncuesta';
import EditarEmpresa from '../Components/EditarEmpresa';
import Contactenos from '../Components/Contactenos';
import Dashboard from '../Components/Dashboard';
import FormularioEmailJS from '../Components/FormularioEmailJS';
import RutaPrivada from './RutaPrivada';
import Perfil from '../Pages/Perfil';
import MisionVision from '../Components/MisionVision';
import HomeNuevo from '../Pages/HomeNuevo';
const Routing = () => {
    return (
      <Router>
       <Routes>
         {/* Rutas privadas */}
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<RutaPrivada rol={["propietario"]} children={<Dashboard/>} />}/>
          <Route path='/empresas' element={<RutaPrivada rol={["usuario", "propietario"]} children={<Empresas/>}/>}/>
          <Route path='/responderEncuestas' element={<RutaPrivada rol={["trabajador", "recursos_humanos","propietario"]} children={<VerEncuesta/>}/>}/>
          <Route path='/CrearEncuestas' element={<RutaPrivada rol={["recursos_humanos", "propietario"]} children={<CrearEncuestas/>}/>}/>
          <Route path='/verEncuestas' element={<RutaPrivada rol={["trabajador", "recursos_humanos","propietario"]} children={<ResponderEncuestas/>}/>}/>
          <Route path='/perfil' element={<RutaPrivada rol={["recursos_humanos","propietario", "trabajador","usuario"]} children={<Perfil/>}/>}/>
          


          <Route path="/home" element={<HomeNuevo/> }/>
          <Route path='/registroLogin' element={<Login/>}/>
          <Route path='/contactenos' element={<Contactenos/>}/>
          <Route path='/dasboard' element={<Dashboard/>}/>
          <Route path='/formularioEmailJS' element={<FormularioEmailJS/>}/>

       </Routes>
      </Router>
     );
  };
  export default Routing;