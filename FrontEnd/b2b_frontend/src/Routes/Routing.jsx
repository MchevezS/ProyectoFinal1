import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Encuestas from '../Pages/Encuestas';
<<<<<<< HEAD
=======
import Empresas from '../Pages/Empresas';

>>>>>>> 60fa5bb788f3d34a85790c2e1e0e2debe5b02560
import Login from '../Pages/Login';
const Routing = () => {
    return (
      <Router>
       <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/encuestas' element={<Encuestas/>}/>
<<<<<<< HEAD
          <Route path='/registroLogin' element={<Login/>}/>
=======
          <Route path='/empresas' element={<Empresas/>}/>
          <Route path='/login' element={<Login/>}/>
>>>>>>> 60fa5bb788f3d34a85790c2e1e0e2debe5b02560
       </Routes>
      </Router>
     );
  };
  export default Routing;