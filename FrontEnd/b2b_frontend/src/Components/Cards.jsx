const Cards = ({titulo,cantidad,icono,estilo})=>{
    return (
            <div className="card p-3" style={estilo}>
                <div className="d-flex justify-content-between">
                <h6 style={{fontWeight:"bold",fontSize:"1rem"}} className="mt-3">{titulo}</h6>
                <i className="text-dark" >{icono}</i>
                </div>
                <h4  style={{fontFamily:"monospace"}}>{cantidad}</h4>
            </div>

    )
}
export default Cards