import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Encuestas from '../Pages/Encuestas';
import Empresas from '../Pages/Empresas';
import RegistroLogin from '../Components/RegistroLogin';
import AdministradorGeneral from '../Components/AdministradorGeneral';

const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/encuestas' element={<Encuestas/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/registroLogin' element={<RegistroLogin/>}/>
          <Route path="/administradorGeneral" element={<AdministradorGeneral/>} />
       </Routes>
      </Router>
     );
  };
  export default Routing;