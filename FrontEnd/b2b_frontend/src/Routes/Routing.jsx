import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Encuestas from '../Pages/Encuestas';
import Empresas from '../Pages/Empresas';

const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/encuestas' element={<Encuestas/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;