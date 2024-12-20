import "../Style/HeroNuevo.css"
const HeroNuevo = () => {
    return(
        <>
            <div className="hero cont-hero">
    <div className="hero-text">
        <h1 className="titulo-hero">
            Impulsa el bienestar organizacional a través de datos precisos
        </h1>
        <p className="subtitulo-hero">
            Accede a la única plataforma que integra encuestas personalizadas, análisis de datos y soluciones enfocadas en el bienestar de tus 
            empleados para optimizar la cultura laboral.
        </p>
    </div>
    <div className="hero-img">
        <img 
            src="https://www.betterup.com/hubfs/0_Hero_Screens_Cropped-optimized-1.png" 
            alt="Encuestas" 
            className="img-hero"
        />
    </div>
</div>
        </>
    )
}
export default HeroNuevo;