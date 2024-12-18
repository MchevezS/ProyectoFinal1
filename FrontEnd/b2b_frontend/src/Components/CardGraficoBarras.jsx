import {useState} from 'react';
import {useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { get } from '../Services/Crud';
const CardGraficoBarras = ()=>{

  const [saludMental,setSaludMental] = useState(10);
  const [ambienteLaboral,setAmbienteLaboral] = useState(10);
  const [equilibrioVidaTrabajo,setEquilibrioVidaTrabajo] = useState(10);
  const [beneficiosCompensaciones,setBeneficiosCompensaciones] = useState(10);
  const [comunicacionInterna,setComunicacionInterna] = useState(10);
  const [oportunidadesCrecimiento,setOportunidadesCrecimiento] = useState(10);
  
  const [cookies]=useCookies(["empresaId"])

  useEffect(()=>{
    const traerRetroalimentaciones = async () => {
      const peticion = await get('respuestas')
      console.log(peticion);
      const retroalimentacion = peticion.filter((respuesta)=>respuesta.retroalimentacion != "" && respuesta.empresa === cookies.empresaId)
      const contadorSaludMental = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Salud Mental")
      setSaludMental(contadorSaludMental.length)
      console.log(contadorSaludMental.length)
      const contadorAmbienteLaboral = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Ambiente Laboral")
      setAmbienteLaboral(contadorAmbienteLaboral.length)
      console.log(contadorAmbienteLaboral.length)
      const contadorEquilibrioVidaTrabajo = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Equilibrio Vida-Trabajo")
      setEquilibrioVidaTrabajo(contadorEquilibrioVidaTrabajo.length)
      console.log(contadorEquilibrioVidaTrabajo.length)
      const contadorBeneficiosCompensaciones = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Beneficios y Compensaciones")
      setBeneficiosCompensaciones(contadorBeneficiosCompensaciones.length)
      console.log(contadorBeneficiosCompensaciones.length)
      const contadorComunicacionInterna = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Comunicación Interna")
      setComunicacionInterna(contadorComunicacionInterna.length)
      console.log(contadorComunicacionInterna.length)
      const contadorOportunidadesCrecimiento = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Oportunidades de Crecimiento")
      setOportunidadesCrecimiento(contadorOportunidadesCrecimiento.length)
      console.log(contadorOportunidadesCrecimiento.length)
    } 
      traerRetroalimentaciones()
  },[])
  const plans = [
    { name: 'Salud Mental', 
      percentage: saludMental, 
      color: '#c91459' 
    },
    { name: 'Ambiente Laboral', 
      percentage: ambienteLaboral, 
      color: '#FFDB45' 
    },
    {
      name: 'Equilibrio Vida-Trabajo',
      percentage: equilibrioVidaTrabajo,
      color: '#c91459',
    },
    {
      name: 'Beneficios y Compensaciones',
      percentage: beneficiosCompensaciones,
      color: '#FFDB45',
    },
    {
      name: 'Comunicación Interna',
      percentage: comunicacionInterna,
      color: '#c91459',
    },
    {
      name: 'Oportunidades de Crecimiento',
      percentage: oportunidadesCrecimiento,
      color: '#FFDB45',
    },
  ];
    return(
        <div
        className="p-4 rounded"
        style={{
          backgroundColor: "#1E1E2E",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          width: "35vw",
          height: "40vh",
          margin: "auto",
        }}
      >
           <h5
          className="text-uppercase"
          style={{
            fontSize: "14px",
            textAlign: "center",
            color: "white",
          }}
        >
          Retroalimentación por categoría
        </h5>
        {plans.map((plan,index) => (
          <div key={index} className="mb-3">
            <div className="d-flex justify-content-between">
              <span style={{ fontSize: "14px" }}>{plan.name}</span>
              <span style={{ fontSize: "14px" }}>{plan.percentage}</span>
            </div>
            <div
              style={{
                height: "5px",
                backgroundColor: "#2E2E48",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  width: `${plan.percentage}%`,
                  height: "100%",
                  backgroundColor: plan.color,
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
export default CardGraficoBarras;