import "../Style/Pasos.css"
import { Fa1 } from "react-icons/fa6";
import { Fa2 } from "react-icons/fa6";
import { Fa3 } from "react-icons/fa6";
import { Fa4 } from "react-icons/fa6";
const Pasos = () => {
    return(
        <>
<div className="cont-pasos">
    <h2 className="text-white">¿Cómo funciona?</h2>
    <div className="pasos">
        <div className="paso">
            <Fa1 color="#fff" size="3em"/> 
            <div className="paso-text">
                <p>Verifica que la empresa esté registrada para poder llenar el formulario</p>
            </div>
        </div>
        <div className="paso">
            <Fa2 color="#fff" size="3em" />
            <div className="paso-text">
                <p>Llena el formulario de forma anónima.</p>
            </div>
        </div>
        <div className="paso">
            <Fa3 color="#fff" size="3em" />
            <div className="paso-text">
                <p>Implementa mejoras que puedas hacer según los resultados.</p>
            </div>
        </div>
        <div className="paso">
            <Fa4 color="#fff" size="3em" />
            <div className="paso-text">
                <p>Recibe informes con análisis detallados.</p>
            </div>
        </div>
    </div>
</div>

            
        </>
    )
}
export default Pasos;