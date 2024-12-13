import CardPregunta from "../Components/CardPregunta"
import NavbarEncuestas from "../Components/NavbarEncuestas"
import { useState, useEffect } from "react"
import { get } from "../Services/Crud"
import '../Style/VerEncuesta.css'

const VerEncuesta = () => {
    const [encuesta, setEncuesta] = useState([])
    const [preguntas, setPreguntas] = useState([])
    useEffect(() => {
        const traerEncuestas = async () => {
            const peticion = await get("encuestas", localStorage.getItem("id_encuesta"))
            console.log(peticion);
            setEncuesta(peticion.encuesta)
            setPreguntas(peticion.preguntas)
            console.log(peticion.preguntas.id);
        }
        traerEncuestas()
    }, [])

    return (
        <>
            <NavbarEncuestas />

            <h1>{encuesta.titulo_encuesta}</h1>

            <p>descripcion:</p>
            <p>{encuesta.descripcion_encuesta}</p>

            <p>pregunta:</p>
            <ul>{preguntas.map((i) => (
                <li key={i.id} className="pregunta">
                    {localStorage.setItem("id_pregunta", i.id)}
                    {i.pregunta_texto}
                </li>
            ))}</ul>

            <CardPregunta />

        </>
    )
}
export default VerEncuesta