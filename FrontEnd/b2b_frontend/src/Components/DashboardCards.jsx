import React from 'react';
import { useState,useEffect } from 'react';
import { get,getFilter } from '../Services/Crud';
import {useCookies} from 'react-cookie';
import Cards from './Cards';
import { RiSurveyLine } from "react-icons/ri";
import TablaEmpleados from './TablaEmpleados';
import { VscAccount } from "react-icons/vsc";
import { BiBuildings } from "react-icons/bi";
import { TfiCheckBox } from "react-icons/tfi";
function DashboardCards() {
  const fecha = new Date().toLocaleDateString()
  const [cookies] = useCookies(['empresaId'])

  const [cantidadEncuestas,setCantidadEncuestas] = useState(0)
  const [encuestasRespondidas,setEncuestasRespondidas] = useState(0)
  const [cantidadRetroalimentacion,setCantidadRetroalimentacion] = useState(0)
  
  const [empleadosActivos,setEmpleadosActivos] = useState(0)
  const [areasTrabajo,setAreasTrabajo] = useState(0)
  
  

  useEffect(()=>{
    const traerCantEncuestas = async () => {
      const cantidad = await get('encuestas')
      setCantidadEncuestas(cantidad.length)
    }
    const traerCantEncuestasRespondidas = async () => {
      const cantidad = await get('respuestas')
      setEncuestasRespondidas(cantidad.length)
    }
    const traerCantRetroalimentacion = async () => {
      const cantidad = await get('respuestas')
      const retroalimentacion = cantidad.filter(cantRetroalimentacion=> cantRetroalimentacion.retroalimentacion !== "" && cantRetroalimentacion.empresa === cookies.empresaId)
      setCantidadRetroalimentacion(retroalimentacion.length)
    }
    const traerEmpleadosActivos = async () => {
      console.log('trear empleados');
      const cantidad = await getFilter('traer-empleados/',cookies.empresaId || 0,'empresa_id')
      console.log(cantidad);
      setEmpleadosActivos(cantidad.length)
    }
    const traerAreasTrabajo = async () => {
      const cantidad = await getFilter('areas-trabajo/',cookies.empresaId || 0,'empresa_id')
      setAreasTrabajo(cantidad.length)
    }


    traerCantEncuestas()
    traerCantEncuestasRespondidas()
    traerCantRetroalimentacion()
    traerEmpleadosActivos()
    traerAreasTrabajo()
  },[cookies.empresaId])

  const cards = [
    { title: 'Encuestas realizadas', value: cantidadEncuestas, icon: <RiSurveyLine />, estilo: {backgroundColor:"#e7eeff"} },
    { title: 'Empleados activos', value: empleadosActivos, icon: <VscAccount />,estilo: {backgroundColor:"#fff2ea"} },
    { title: 'Encuestas respondidas', value: encuestasRespondidas, icon: <TfiCheckBox />,estilo: {backgroundColor:"#d2d3ff"} },
    { title: 'Areas de trabajo', value: areasTrabajo, icon: <BiBuildings /> },
  ];

  return (
    <>
    <div className="d-flex gap-3" style={{width:"79vw",maxWidth:"80vw",maxHeight:"20vh",marginLeft:"12vw",marginBottom:"16vh"}} >
      {cards.map((card) => (
        <Cards
          titulo={card.title}
          cantidad={card.value}
          icono={card.icon}
          estilo={card.estilo}
        />
      ))}
      <div>
        <TablaEmpleados/>
      </div>
    </div>
    </>
  );

}

export default DashboardCards;
