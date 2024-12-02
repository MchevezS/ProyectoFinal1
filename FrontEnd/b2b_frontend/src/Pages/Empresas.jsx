import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import BarraLateral from '../Components/BarraLateral';
import Header from '../Components/Header';

function Empresas() {
  return (
    <>
    <Header/>
    <BarraLateral/>
    <div>
        <FormEmpresas/>
        <RegistroEmpleados/>
        <FormAreaTrabajo/>
        <FormAreaTrabajoUsuarios/> 
    </div>
    </>
  )
}

export default Empresas;
