import CardPerfilUsuario from "../Components/CardPerfilUsuario";
import Header from "../Components/Header";
import BarraLateralNuevo from "../Components/BarraLateralNuevo";

const Perfil = () => {
    return(
        <main style={{backgroundColor:"#E2E2E2", height:"auto"}}>
            
            <div>
                <BarraLateralNuevo/>
            </div>
            <section style={{position:"absolute", top:"0vh", width:"65vw",left:"15vw"}}>
                <CardPerfilUsuario/>
            </section>

            
        </main>
    )
}
export default Perfil;