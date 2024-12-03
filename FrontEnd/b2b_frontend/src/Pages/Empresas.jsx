import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import '../Style/Empresas.css'

function Empresas() {
  return (
    <div>
    <div class="table-wrapper">
      <div class="development-table-container">
        <FormEmpresas/>
      </div>
       <div class="development-table-container">
        <RegistroEmpleados/>
       </div>
    </div>

    <div class="table-wrapper">
      <div class="development-table-container">
        <FormAreaTrabajo/>
      </div>
       <div class="development-table-container">
        <FormAreaTrabajoUsuarios/> 
       </div>
    </div>
        
    </div>
  )
}

export default Empresas;