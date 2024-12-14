import "../Style/Caracteristicas.css"
import CardcPrincipales from "./CardcPrincipales";
const Caracteristicas = () => {
    return (
        <>
            <div className="caracteristicas">
                <div className="caracteristicas-titulo" >
                <h5>¿Por qué elegir nuestro sistema?</h5>
                <p>Nuestro sistema te ayuda a identificar áreas clave para mejorar el ambiente laboral y la productividad de tus empleados. Proporcionamos análisis detallados y sugerencias específicas basadas en datos reales.</p>
                </div>

                <div className="caracteristicas-contenido d-flex justify-content-around gap-3 ">
                    <CardcPrincipales img={"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} titulo={"Medición del bienestar laboral"} descripcion={"Medimos el bienestar de tus empleados para mejorar la satisfacción y productividad."}/>

                    <CardcPrincipales img={"https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} titulo={"Informes detallados con análisis"} descripcion={"Obtienes informes detallados con análisis para identificar tendencias y áreas de mejora."}/>
                    
                    <CardcPrincipales img={"https://images.unsplash.com/photo-1589187775328-882e91b3db4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} titulo={"Encuestas anónimas personalizadas"} descripcion={"Realizamos encuestas anónimas personalizadas para obtener feedback honesto.."}/>

                </div>
            </div>

        </>
    );
}
export default Caracteristicas;