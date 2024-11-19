import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Empresas from '../Pages/Empresas';

const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/empresas' element={<Empresas/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;