import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {useState} from 'react';
import {useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { get } from '../Services/Crud';
const GraficoBarras2 = () => {
  const [saludMental,setSaludMental] = useState(0);
  const [ambienteLaboral,setAmbienteLaboral] = useState(0);
  const [equilibrioVidaTrabajo,setEquilibrioVidaTrabajo] = useState(0);
  const [beneficiosCompensaciones,setBeneficiosCompensaciones] = useState(0);
  const [comunicacionInterna,setComunicacionInterna] = useState(0);
  const [oportunidadesCrecimiento,setOportunidadesCrecimiento] = useState(0);
  const [cookies]=useCookies(["empresaId"])


  useEffect(()=>{
    const traerRetroalimentaciones = async () => {
      const peticion = await get('respuestas')
      console.log(peticion);
      const retroalimentacion = peticion.filter((respuesta)=>respuesta.retroalimentacion != "" && respuesta.empresa === cookies.empresaId)

      const contadorSaludMental = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Salud Mental")
      setSaludMental(contadorSaludMental.length)
      
      const contadorAmbienteLaboral = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Ambiente Laboral")
      setAmbienteLaboral(contadorAmbienteLaboral.length)

      const contadorEquilibrioVidaTrabajo = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Equilibrio Vida-Trabajo")
      setEquilibrioVidaTrabajo(contadorEquilibrioVidaTrabajo.length)

      const contadorBeneficiosCompensaciones = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Beneficios y Compensaciones")
      setBeneficiosCompensaciones(contadorBeneficiosCompensaciones.length)

      const contadorComunicacionInterna = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Comunicación Interna")
      setComunicacionInterna(contadorComunicacionInterna.length)

      const contadorOportunidadesCrecimiento = retroalimentacion.filter((respuesta)=>respuesta.categoria_encuesta === "Oportunidades de Crecimiento")
      setOportunidadesCrecimiento(contadorOportunidadesCrecimiento.length)
    } 
      traerRetroalimentaciones()
  },[])


  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: ['Salud mental', 'Ambiente laboral', 'Equilibrio vida-trabajo', 'Beneficios y compensaciones', 'Comunicación interna', 'Oportunidades de crecimiento'],
    },
    colors: ['#6A5AE0'],
  };

  const series = [
    {
      name: 'Visitors',
      data: [saludMental, ambienteLaboral, equilibrioVidaTrabajo, beneficiosCompensaciones, comunicacionInterna, oportunidadesCrecimiento],
    },
  ];

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default GraficoBarras2;
