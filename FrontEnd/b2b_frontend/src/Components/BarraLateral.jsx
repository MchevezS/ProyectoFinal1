import React, { useState } from 'react';
import '../Style/BarraLateral.css';

function BarraLateral() {
  const [visible, setVisible] = useState(true);

  return (
    visible ? (
      <div className="d-flex flex-column vh-100 barra-lateral">
        <h3 onClick={()=>setVisible(false)}  className="mb-4 text-primary">B2B</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a href="/dashboard" className="nav-link d-flex align-items-center">
              <i className="bi bi-house me-3"></i>
              Dashboard
            </a>
          </li>
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
    ) : (
      <button onClick={()=>setVisible(true)}>///</button> /* poner un icono si o si */
    )
  );
}

export default BarraLateral;
