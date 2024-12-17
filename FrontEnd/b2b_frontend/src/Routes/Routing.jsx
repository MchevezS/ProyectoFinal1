/* eslint-disable react/no-children-prop */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrearEncuestas from '../Pages/CrearEncuestas';
import Empresas from '../Pages/Empresas';
import Login from '../Pages/Login';
import ResponderEncuestas from '../Pages/ResponderEncuestas';
import VerEncuesta from '../Pages/VerEncuesta';
import Contactenos from '../Components/Contactenos';
import Dashboard from '../Components/Dashboard';
import FormularioEmailJS from '../Components/FormularioEmailJS';
import RutaPrivada from './RutaPrivada';
import Perfil from '../Pages/Perfil';
import AdministradorEmpresas from '../Components/AdministradorEmpresas'
import EditarEmpresa from '../Components/EditarEmpresa';
import AdministradorEncuestas from '../Components/AdministradorEncuestas';
import EditarEncuesta from '../Components/EditarEncuestas';
import HomeNuevo from '../Pages/HomeNuevo';
import DashboardNuevo from '../Pages/DashboardNuevo';
const Routing = () => {
    return (
      <Router>
       <Routes>
         {/* Rutas privadas */}
          <Route path='/dashboard' element={<RutaPrivada rol={["propietario"]} children={<Dashboard/>} />}/>
          <Route path='/' element={<HomeNuevo/>}/>
          <Route path='/dashboard' element={<RutaPrivada rol={["propietario"]} children={<DashboardNuevo/>} />}/>
          <Route path='/empresas' element={<RutaPrivada rol={["usuario", "propietario"]} children={<Empresas/>}/>}/>
          <Route path='/responderEncuestas' element={<RutaPrivada rol={["trabajador", "recursos_humanos","propietario"]} children={<VerEncuesta/>}/>}/>
          <Route path='/CrearEncuestas' element={<RutaPrivada rol={["recursos_humanos", "propietario"]} children={<CrearEncuestas/>}/>}/>
          <Route path='/verEncuestas' element={<RutaPrivada rol={["trabajador", "recursos_humanos","propietario"]} children={<ResponderEncuestas/>}/>}/>
          <Route path='/perfil' element={<RutaPrivada rol={["recursos_humanos","propietario", "trabajador","usuario"]} children={<Perfil/>}/>}/>
          


          <Route path="/home" element={<HomeNuevo/> }/>
          <Route path='/registroLogin' element={<Login/>}/>
          <Route path='/contactenos' element={<Contactenos/>}/>
          <Route path='/dasboard' element={<DashboardNuevo/>}/>
          <Route path='/formularioEmailJS' element={<FormularioEmailJS/>}/>
          <Route path='/administradorEmpresas' element={<AdministradorEmpresas/>}/>
          <Route path='/editar-empresa/:id' element={<EditarEmpresa/>}/>
          <Route path='/administradorEncuestas' element={<AdministradorEncuestas/>}/>
          <Route path='/editar-encuesta/:id' element={<EditarEncuesta/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;