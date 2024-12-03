import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import BarraLateral from '../Components/BarraLateral';
import Header from '../Components/Header';
import '../Style/Empresas.css'

function Empresas() {
  return (
    <>
    <Header/>
    <BarraLateral/>
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
    </>
  )
}

export default Empresas;