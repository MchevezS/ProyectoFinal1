import React from 'react'
import '../Style/CardResenas2.css'
import fotoPerfil5 from '../assets/fotoperfil5.webp'
function CardResena2() {
  return (
    <div>
    {/* Testimonio 2*/}
    <div className="resena-card">
        <img className="resena-card-img" src={fotoPerfil5} alt="Juan Pérez" />
          <h3 className="resena-card-name">Juan Pérez</h3>
          <p className="resena-card-role"><strong>Director de Marketing, Creativa</strong></p>
          <p className="resena-card-text">
             Gracias a este innovador sistema, hemos logrado mejorar la productividad y el bienestar general de nuestro equipo. 
             La personalización de las estrategias ha sido clave para un mejor rendimiento.
          </p>
    </div>

    </div>
  )
}

export default CardResena2
