const Preguntas = ({pregunta,btnEliminar})=>{
    return(
        <>
            <div>
                <h3>{pregunta.pregunta_texto}</h3>
                <button onClick={()=>btnEliminar(pregunta.id)}>Eliminar</button>
            </div>
        </>
    )
}
export default Preguntas