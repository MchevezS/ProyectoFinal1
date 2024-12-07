import CardPerfilUsuario from "../Components/CardPerfilUsuario";
import BarraLateral from "../Components/BarraLateral";
import Header from "../Components/Header";

const Perfil =({})=>{
    return(
        <>
        <div className="sidebar" style={{ width: '50px' }}>
            <BarraLateral/>
        </div>
        <div className="content flex-grow-1 ">
          <Header />
        </div>
        <section>
            <div className="d-flex">
            <CardPerfilUsuario/>
            </div>
        </section>
        </>

    )
}
export default Perfil;