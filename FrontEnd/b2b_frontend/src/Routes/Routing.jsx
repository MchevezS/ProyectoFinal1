import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
       </Routes>
      </Router>
     );
  };
  export default Routing;