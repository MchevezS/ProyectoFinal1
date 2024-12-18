import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import '../Style/Empresas.css';
import { useState } from 'react';
import BarraLateralNuevo from '../Components/BarraLateralNuevo';
function Empresas() {
  // Estados para controlar si los formularios están completados
  const [formEmpresasComplete, setFormEmpresasComplete] = useState(false);
  const [formAreaTrabajoComplete, setFormAreaTrabajoComplete] = useState(false);
  const [formAreaTrabajoUsuariosComplete, setFormAreaTrabajoUsuariosComplete] = useState(false);
  const [registroEmpleadosComplete, setRegistroEmpleadosComplete] = useState(false);

  // Funciones para manejar los estados de cada formulario
  const handleFormEmpresasComplete = () => setFormEmpresasComplete(true);
  const handleFormAreaTrabajoComplete = () => setFormAreaTrabajoComplete(true);
  const handleFormAreaTrabajoUsuariosComplete = () => setFormAreaTrabajoUsuariosComplete(true);
  const handleRegistroEmpleadosComplete = () => setRegistroEmpleadosComplete(true);

  return (
    <main style={{backgroundColor: "#E2E2E2", height: "221vh"}}>
        <div style={{height: "100vh", width: "10vw", position: "fixed"}}>
          <BarraLateralNuevo/>
        </div>
      <div>

    <section style={{position:"absolute", top:"0vh", left:"10vw", width:"80vw", height:"100vh", backgroundColor: "#E2E2E2"}}>

  <div className="form-item">
    <FormEmpresas
      onComplete={handleFormEmpresasComplete}
      disabled={formEmpresasComplete}
    />
  </div>
  <div className="form-item">
    <RegistroEmpleados
      onComplete={handleRegistroEmpleadosComplete}
      disabled={!formEmpresasComplete}
    />
  </div>
  <div className="form-item">
    <FormAreaTrabajo
      onComplete={handleFormAreaTrabajoComplete}
      disabled={!formEmpresasComplete}
    />
  </div>
  <div className="form-item">
    <FormAreaTrabajoUsuarios
      onComplete={handleFormAreaTrabajoUsuariosComplete}
      disabled={!formEmpresasComplete || !formAreaTrabajoComplete}
    />
  </div>

  </section>

      </div>
    </main>
  );
}

export default Empresas;
