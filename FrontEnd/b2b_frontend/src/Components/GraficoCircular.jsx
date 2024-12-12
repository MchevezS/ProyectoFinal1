import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { get } from '../Services/Crud';

const GraficoCircular = () => {
  const [respondidas, setRespondidas] = useState(0);
  const [sinResponder, setSinResponder] = useState(0);
  const [cookies]=useCookies(["empresaId"])

  useEffect(()=>{
      const obtenerDatos = async () => {
        const peticion = await get('encuestas-respondidas-sinresponder')

        const encuestasRespondidas = peticion.encuestas_respondidas.filter((encuesta)=>encuesta.empresa === cookies.empresaId)
        const encuestasSinResponder = peticion.encuestas_sin_responder.filter((encuesta)=>encuesta.empresa === cookies.empresaId)
        
        setRespondidas(encuestasRespondidas.length)
        setSinResponder(encuestasSinResponder.length)
      }
      obtenerDatos()
  },[])

  const options = {
    labels: ['Respondidas', 'Sin responder'],
    colors: ['#6A5AE0', '#91d3f8'],
    legend: {
      position: 'top',
    },
  };

  const series = [respondidas, sinResponder]; 

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <h5>Estado de las encuestas</h5>
      <ReactApexChart options={options} series={series} type="pie" height={210} />
    </div>
  );
};

export default GraficoCircular;
