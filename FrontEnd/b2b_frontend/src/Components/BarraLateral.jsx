import React from 'react';
import '../Style/BarraLateral.css';
import { useCookies } from 'react-cookie';
function BarraLateral() {

  const [cookie] = useCookies(["rolUsuario"])

  return (
    <div className="d-flex flex-column vh-100 barra-lateral">
      <h3 className="mb-4 text-primary">B2B</h3>
      <ul className="nav flex-column">
        {cookie.rolUsuario==="propietario" &&
        <li className="nav-item mb-3">
          <a href="/dasboard" className="nav-link d-flex align-items-center">
            <i className="bi bi-house me-3"></i>
            Dashboard
          </a>
        </li>
        }
        <li className="nav-item mb-3">
          <a href="/empresas" className="nav-link d-flex align-items-center">
            <i className="bi bi-table me-3"></i>
            Empresa
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link d-flex align-items-center">
            <i className="bi bi-person me-3"></i>
            Perfil
          </a>
        </li>
      </ul>
    </div>
  );
}

export default BarraLateral;
