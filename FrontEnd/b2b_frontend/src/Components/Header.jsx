import React from 'react';

function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
      <h4>Nombre empresa</h4>
      <div className="d-flex align-items-center">
        <i className="bi bi-bell me-3"></i>
        <i className="bi bi-moon"></i>
      </div>
    </div>
  );
}

export default Header;
