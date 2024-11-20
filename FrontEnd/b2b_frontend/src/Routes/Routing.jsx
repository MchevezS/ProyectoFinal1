import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Encuestas from '../Pages/Encuestas';
import Empresas from '../Pages/Empresas';

import Login from '../Pages/Login';
const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/encuestas' element={<Encuestas/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/login' element={<Login/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;