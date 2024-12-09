import { useEffect, useState } from "react"
import { get } from "../Services/Crud"
import CardPregunta from "../Components/CardPregunta"
import Navbar from "../Components/Navbar"
import NavbarEncuestas from "../Components/NavbarEncuestas"

const VerEncuesta = ()=>{
    const [encuesta, setEncuesta] = useState([])
    const [preguntas, setPreguntas] = useState([])
    useEffect(()=>{
        const traerEncuestas = async()=>{
            const peticion = await get("encuestas", localStorage.getItem("id_encuesta"))
            console.log(peticion);
            
            setEncuesta(peticion.encuesta)
            setPreguntas(peticion.preguntas)
            console.log(peticion.preguntas.id);
        }
        traerEncuestas()
    },[])

    return(
        <>
<h1>{encuesta.categoria_encuesta}</h1>

<p>descripcion:</p>
<p>{encuesta.descripcion_encuesta}</p>

<p>pregunta:</p>
<ul>{preguntas.map((i)=>(
<li key={i.id}>
    {localStorage.setItem("id_pregunta",i.id)}
{i.pregunta_texto}
</li>
))}</ul>

<CardPregunta/>

        </>
    )
}
export default VerEncuesta