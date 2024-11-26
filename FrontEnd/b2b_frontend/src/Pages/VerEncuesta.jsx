import { useEffect, useState } from "react"
import { get } from "../Services/Crud"

const VerEncuesta = ()=>{
    const [encuesta, setEncuesta] = useState([])
    const [pregunta, setPregunta] = useState([])
    useEffect(()=>{
        const traerEncuestas = async()=>{
            const peticion = await get("encuestas", localStorage.getItem("id_encuesta"))
            console.log(peticion);
            
            setEncuesta(peticion.encuesta)
            setPregunta(peticion.preguntas)
            console.log(pregunta);
            
        }
        traerEncuestas()
    },[])

    return(
        <>


<h1>{encuesta.titulo_encuesta}</h1>

<p>{encuesta.descripcion_encuesta}</p>

<ul>{pregunta.map((i)=>{
<li key={i.id}>
{i.pregunta_texto}
</li>
})}</ul>


        </>
    )
}
export default VerEncuesta