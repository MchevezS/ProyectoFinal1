import React from 'react';
import '../Style/HeroHome.css';
import fondoHero from "../assets/fondoHero.png"
function HeroHome() {
  return (
    <div>
      <section className="hero">
  <img className="heroFondo" src={fondoHero} alt="Fondo hero"/>
  <div className="hero-overlay"></div> {/* Overlay oscuro */}
  <div className="hero-content">
    <h1>Transforma el Bienestar de tu Equipo</h1>
    <p className='descripcion1'>Mejora la productividad y felicidad de tus empleados con nuestra plataforma inteligente de bienestar laboral.</p>
    <div className="hero-buttons">
      <a href="/registroLogin" className="btn-primary">Empieza Ahora</a>
    </div>
    <div className="hero-stats">
      <div>
        <h3>+500</h3>
        <p>Empresas Felices</p>
      </div>
      <div>
        <h3>98%</h3>
        <p>Mejora en la Satisfacción</p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}

export default HeroHome;
