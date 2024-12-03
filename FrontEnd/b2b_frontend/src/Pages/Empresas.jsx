import FormAreaTrabajo from '../Components/FormAreaTrabajo';
import FormEmpresas from '../Components/FormEmpresas';
import FormAreaTrabajoUsuarios from '../Components/FormAreaTrabajoUsuarios';
import RegistroEmpleados from '../Components/RegistroEmpleados';
import '../Style/Empresas.css';
import BarraLateral from '../Components/BarraLateral';
import { useState } from 'react';

function Empresas() {
  // Estados para controlar si los formularios están completados
  const [formEmpresasComplete, setFormEmpresasComplete] = useState(false);
  const [formAreaTrabajoComplete, setFormAreaTrabajoComplete] = useState(false);
  const [formAreaTrabajoUsuariosComplete, setFormAreaTrabajoUsuariosComplete] = useState(false);
  const [registroEmpleadosComplete, setRegistroEmpleadosComplete] = useState(false);

  // Función para marcar como completado el formulario de empresas
  const handleFormEmpresasComplete = () => {
    setFormEmpresasComplete(true);
  };

  // Funciones similares para los otros formularios
  const handleFormAreaTrabajoComplete = () => {
    setFormAreaTrabajoComplete(true);
  };

  const handleFormAreaTrabajoUsuariosComplete = () => {
    setFormAreaTrabajoUsuariosComplete(true);
  };

  const handleRegistroEmpleadosComplete = () => {
    setRegistroEmpleadosComplete(true);
  };

  return (
    <div>
      <BarraLateral />
      <section>
        <div className="table-wrapper">
          <div className="development-table-container">
            <FormEmpresas
              onComplete={handleFormEmpresasComplete} // Pasamos la función al formulario
              disabled={formEmpresasComplete}  // Habilitamos o deshabilitamos el formulario
            />
          </div>
          <div className="development-table-container">
            {/* Bloqueamos el formulario de RegistroEmpleados hasta que el formulario anterior esté completado */}
            <RegistroEmpleados
              onComplete={handleRegistroEmpleadosComplete}
              disabled={!formEmpresasComplete}  // Deshabilitado si el formulario de empresas no está completo
            />
          </div>
        </div>

        <div className="table-wrapper">
          <div className="development-table-container">
            <FormAreaTrabajo
              onComplete={handleFormAreaTrabajoComplete}
              disabled={!formEmpresasComplete || !formAreaTrabajoComplete} // Bloqueamos si el anterior no está completado
            />
          </div>
          <div className="development-table-container">
            <FormAreaTrabajoUsuarios
              onComplete={handleFormAreaTrabajoUsuariosComplete}
              disabled={!formEmpresasComplete || !formAreaTrabajoComplete || !formAreaTrabajoUsuariosComplete}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Empresas;