import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import '../Style/Empresas.css';
import BarraLateral from '../Components/BarraLateral';
import { useState } from 'react';
import Header from '../Components/Header';
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
    <>
      <div>
        <BarraLateral />

        <div>
        <Header />

          </div>

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

      </div>
    </>
  );
}

export default Empresas;
