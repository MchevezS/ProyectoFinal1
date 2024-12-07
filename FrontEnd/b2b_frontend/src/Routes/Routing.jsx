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
import CardPerfilUsuario from "../Components/CardPerfilUsuario";
import Perfil from '../Pages/Perfil';
const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/CrearEncuestas' element={<CrearEncuestas/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/registroLogin' element={<Login/>}/>
          <Route path="/administradorGeneral" element={<AdministradorGeneral/>} />
          <Route path="/editar-empresa/:id" element={<EditarEmpresa/>} />
          <Route path='/verEncuestas' element={<ResponderEncuestas/>}/>
          <Route path='/responderEncuesta' element={<VerEncuesta/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/contactenos' element={<Contactenos/>}/>
          <Route path='/formulario' element={<FormularioEmailJS/>}/>
          <Route path='/perfil' element={<Perfil/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;