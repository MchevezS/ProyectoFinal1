const CardcPrincipales = ({img,titulo,descripcion})=>{
    return(
        <>
            <div className=" cardcPrincipales">
                <img src={img} className="card-img-top" alt="..."/>
                <h5 className="card-title" style={{fontFamily:"serif",fontSize:"2rem",textWrap:"nowrap"}}>{titulo}</h5>
                <div className="card-body">
                    <p className="card-text" style={{fontSize:"1.1rem"}}>{descripcion}</p>
                </div>
            </div>
        </>
    )
}
export default CardcPrincipales;