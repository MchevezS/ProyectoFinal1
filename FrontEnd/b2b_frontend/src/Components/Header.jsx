import React from 'react';
import { useCookies } from "react-cookie"

function Header() {
  const [cookies]=useCookies(["nombreEmpresa"])

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
      <h4>{cookies.nombreEmpresa || 'Nombre Empresa'}</h4>
      <div className="d-flex align-items-center">
        <i className="bi bi-bell me-3"></i>
        <i className="bi bi-moon"></i>
      </div>
    </div>
  );
}
export default Header;
