import React from 'react'
import '../Style/CardResenas3.css'
import fotoperfil4 from '../assets/fotodeperfil4.webp'
function CardResenas3() {
  return (
    <div>
    {/* Testimonio 3*/}
       <div className="simple-resena-card">
        <img className="simple-resena-card-img" src={fotoperfil4} alt="Laura Gómez" />
        <h3 className="simple-resena-card-name">Laura Gómez</h3>
        <p className="simple-resena-card-role"><strong>Gerente de Recursos Humanos, Soluciones Globales</strong></p>
        <p className="simple-resena-card-text">
           Este sistema ha sido un cambio de juego para nuestra empresa. Nos ha permitido crear un ambiente más equilibrado y enfocado en el bienestar de nuestros colaboradores.
        </p>
    </div>
    </div>
  )
}

export default CardResenas3
