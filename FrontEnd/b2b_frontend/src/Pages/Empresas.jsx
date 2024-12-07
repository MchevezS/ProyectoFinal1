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
        <section>
          <div className="table-wrapper">
            <div className="development-table-container">
              <FormEmpresas
                onComplete={handleFormEmpresasComplete}
                disabled={formEmpresasComplete}
              />
            </div>
            <div className="development-table-container">
              <RegistroEmpleados
                onComplete={handleRegistroEmpleadosComplete}
                disabled={!formEmpresasComplete}
              />
            </div>
          </div>

          <div className="table-wrapper">
            <div className="development-table-container">
              <FormAreaTrabajo
                onComplete={handleFormAreaTrabajoComplete}
                disabled={!formEmpresasComplete}
              />
            </div>
            <div className="development-table-container">
              <FormAreaTrabajoUsuarios
                onComplete={handleFormAreaTrabajoUsuariosComplete}
                disabled={
                  !formEmpresasComplete || !formAreaTrabajoComplete
                }
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Empresas;
