import BarraLateralNuevo from "../Components/BarraLateralNuevo";
import CardSaludoUsuario from "../Components/CardSaludoUsuario";
import CardPerfil from "../Components/CardPerfil";
import "../Style/DashboardNuevo.css";
import CardDashboard from "../Components/CardDashboard";
import CardGraficoCircular from "../Components/CardGraficoCircular";
import CardGraficoBarras from "../Components/CardGraficoBarras";
import CardTablaEmpleados from "../Components/CardTablaEmpleados";
import CardGraficoBarras2 from "../Components/CardGraficoBarras2";
import { useCookies } from "react-cookie";
import { useState,useEffect} from "react";
import { getFilter,get } from "../Services/Crud";
const DashboardNuevo = () => {
  const [cookies] = useCookies(["nombreUsuario",'empresaId']);
  const [encuestasRealizadas, setEncuestasRealizadas] = useState(0);
  const [empleadosActivos, setEmpleadosActivos] = useState(0);
  const [areasTrabajo, setAreasTrabajo] = useState(0);
  const [respondidas, setRespondidas] = useState(0);
  const [sinResponder, setSinResponder] = useState(0);

  
  useEffect(() => {
    const traerEmpleadosActivos = async () => {
      const cantidad = await getFilter('traer-empleados/',cookies.empresaId,'empresa_id')
      console.log(cantidad);
      setEmpleadosActivos(cantidad.length)
    }
    const obtenerDatos = async () => {
      const peticion = await get('encuestas-respondidas-sinresponder')

      const encuestasRespondidas = peticion.encuestas_respondidas.filter((encuesta)=>encuesta.empresa === cookies.empresaId)
      const encuestasSinResponder = peticion.encuestas_sin_responder.filter((encuesta)=>encuesta.empresa === cookies.empresaId)
      
      setRespondidas(encuestasRespondidas.length)
      setSinResponder(encuestasSinResponder.length)
    }
    obtenerDatos()
    const traerEncuestasRealizadas = async () => {
      const cantidad = await get("encuestas")
      const encuestas = cantidad.filter((encuesta) => encuesta.empresa === cookies.empresaId)
      setEncuestasRealizadas(encuestas.length)
    }
    const traerAreasTrabajo = async () => {
      const cantidad = await getFilter('areas-trabajo/',cookies.empresaId,'empresa_id')
      setAreasTrabajo(cantidad.length)
    }
    traerEmpleadosActivos();
    traerEncuestasRealizadas();
    traerAreasTrabajo();
  }, []);
  
  return (
    <div className="dashboard-container">
      <BarraLateralNuevo />

      <main className="main-dashboard">
        <section className="section-dashboard">
          <CardSaludoUsuario nombre={cookies.nombreUsuario} />
        </section>
        <section className="section-dashboard-perfil">
          <CardPerfil />
        </section>
        <div
          className="container d-flex"
          style={{
            padding: "2rem",
            borderRadius: "10px",
            display: "flex",
            gap: "2rem", 
          }}
        >
          <CardDashboard
            titulo="Encuestas Realizadas"
            valor={encuestasRealizadas}
          />
          <CardDashboard
            titulo="Empleados Activos"
            valor={empleadosActivos}
          />
          <CardDashboard
            titulo="Areas de Trabajo"
            valor={areasTrabajo}
          />
        </div>
        <div className="section-dashboard-grafico">
            <CardGraficoCircular titulo1={"Respondidas"} valor1={respondidas} titulo2={"Sin Responder"} valor2={sinResponder}/>
        </div>
        <div className="section-dashboard-grafico-barras">
            <CardGraficoBarras/>
        </div>
        <div className="section-dashboard-grafico-tabla">
          <CardTablaEmpleados/>
        </div>
        <div className="section-dashboard-grafico-barras-2">
          <CardGraficoBarras2/>
        </div>
      </main>
    </div>
  );
};

export default DashboardNuevo;
