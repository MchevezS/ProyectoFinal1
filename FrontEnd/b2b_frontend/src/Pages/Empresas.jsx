import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';
import RegistroEmpleados from '../Components/RegistroEmpleados';

function Empresas() {
  return (
    <div>
        <FormEmpresas/>
        <RegistroEmpleados/>
        <FormAreaTrabajo/>
        <FormAreaTrabajoUsuarios/> 
    </div>
  )
}

export default Empresas;
