import '../Style/CardSaludoUsuario.css'

/*
 Componente que muestra un saludo al usuario con su nombre y la fecha actual.
*/

const CardSaludoUsuario = ({ nombre }) => {
    const fecha = new Date().toLocaleDateString()
    return (
        <>
            <div className="card-saludo-usuario">
               <p className="text-dark fecha-card">{fecha.toString()}</p>
                <div className="card-body">
                    <h5 className="card-title text-center">¡Hola {nombre}!</h5>
                    <p className="card-text mt-3">Bienvenido(a) a tu panel de control, aquí podrás ver como van las respuestas a las encuestas realizadas.</p>
                </div>
            </div>
        </>
    )
}
export default CardSaludoUsuario;