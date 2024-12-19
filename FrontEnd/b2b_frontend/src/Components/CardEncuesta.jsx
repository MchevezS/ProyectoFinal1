import React from 'react';

function CardEncuesta({ titulo, descripcion, fechaSubida, responder }) {
  return (
    <div className="card shadow-sm mb-4" style={{ maxWidth: '400px',border: "1px solid #5c3ac0", borderRadius: "10px" }}>
      <div className="card-body">
        <h5 className="card-title text-dark" style={{fontFamily:"Lora"}}>{titulo}</h5>
        <p className="card-text text-muted">{descripcion}</p>
        <p className="card-text">
          <small className="text-secondary">Fecha: {new Date(fechaSubida).toLocaleDateString()}</small>
        </p>
        <button 
          className="btn w-100"
          style={{border:"1px solid #c91459", color:"#c91459", backgroundColor:"transparent"}}
          onClick={responder}
        >
          Responder Encuesta
        </button>
      </div>
    </div>
  );
}

export default CardEncuesta;
