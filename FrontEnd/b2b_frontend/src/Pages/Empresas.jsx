import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';

function Empresas() {
  return (
    <div>
        <FormEmpresas/>
        <FormAreaTrabajo/>
        <FormAreaTrabajoUsuarios/>
    </div>
  )
}

export default Empresas;
