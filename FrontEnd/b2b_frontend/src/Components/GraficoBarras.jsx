import React from 'react';
import Chart from 'react-apexcharts';
import { useState,useEffect } from 'react';
import { get,getFilter } from '../Services/Crud';
import { useCookies } from 'react-cookie';
function GraficoBarras() {
  const [muyBien, setMuyBien] = useState(0);
  const [bien, setBien] = useState(0);
  const [regular, setRegular] = useState(0);
  const [mala, setMala] = useState(0);
  const [muyMala, setMuyMala] = useState(0);
  const [cookies]=useCookies(["empresaId"])

  useEffect(()=>{
    const obtenerDatos = async ()=>{
      const peticion = await get('respuestas')

      const filtroMuyBien = peticion.filter((respuesta)=>respuesta.respuesta_texto === 'MUY BUENA' && respuesta.empresa === cookies.empresaId)
      setMuyBien(filtroMuyBien.length)
      
      const filtroBien = peticion.filter((respuesta)=>respuesta.respuesta_texto === 'BUENA' && respuesta.empresa === cookies.empresaId)
      setBien(filtroBien.length)
      
      const filtroRegular = peticion.filter((respuesta)=>respuesta.respuesta_texto === 'REGULAR' && respuesta.empresa === cookies.empresaId)
      setRegular(filtroRegular.length)

      const filtroMala = peticion.filter((respuesta)=>respuesta.respuesta_texto === 'MALA' && respuesta.empresa === cookies.empresaId)
      setMala(filtroMala.length)

      const filtroMuyMala = peticion.filter((respuesta)=>respuesta.respuesta_texto === 'MUY MALA' && respuesta.empresa === cookies.empresaId)
      setMuyMala(filtroMuyMala.length)


    }
    obtenerDatos()
  },[])

  const options = {
    chart: {
      toolbar: { show: false },
      stacked: true,
    },
    colors: ['#9d82fc', '#a7fefe'], // Colores de las barras
    xaxis: {
      categories: ['Muy bien', 'Bien', 'Regular', 'Mala', 'Muy mala'], // Notas en el eje X
    },
    yaxis: {
      labels: { style: { colors: '#9ea9c0' } },
    },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 4,
    },
  };

  const series = [
    { name: 'Obtenida', data: [muyBien, bien, regular, mala, muyMala] },
    { name: 'Deseada', data: [5, 10, 15, 20, 25] },
  ];

  return <Chart options={options} series={series} type="bar" height={250} />;
}

export default GraficoBarras;
