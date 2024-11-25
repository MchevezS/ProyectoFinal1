import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Encuestas from '../Pages/Encuestas';
import Empresas from '../Pages/Empresas';
import Login from '../Pages/Login';
import FormularioEncuesta from '../Components/FormularioEncuesta';
import RegistroEmpleados from '../Components/RegistroEmpleados';

const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/encuestas' element={<Encuestas/>}/>
          <Route path='/registroLogin' element={<Login/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/formularioEncuestas' element={<FormularioEncuesta/>}/>
          <Route path='/registroEmpleados' element={<RegistroEmpleados/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;