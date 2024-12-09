import React from 'react';
import Chart from 'react-apexcharts';
import '../Style/GraficoBarras3.css';
import { useState,useEffect } from 'react';
import { get,getFilter} from '../Services/Crud';
import {useCookies} from 'react-cookie';
const GraficoBarras3 = () => {
  const [recursosHumanos, setRecursosHumanos] = useState(0);
  const [atencionCliente, setAtencionCliente] = useState(0);
  const [finanzas, setFinanzas] = useState(0);
  const [marketing, setMarketing] = useState(0);
  const [ti, setTi] = useState(0);
  const [cookies]=useCookies(["empresaId"])


  useEffect(()=>{
    const traerEmpleadosPorArea = async () => {
      const peticion = await getFilter('areas-trabajo-usuario',cookies.empresaId,'empresa_id');

        const empleadoRecursosHumanos = peticion.filter((empleado)=>empleado.nombre_area === 'Recursos humanos')
        setRecursosHumanos(empleadoRecursosHumanos.length)

        const empleadoAtencion = peticion.filter((empleado)=>empleado.nombre_area === 'Atencion al cliente')
        setAtencionCliente(empleadoAtencion.length)
         
        const empleadoFinanzas = peticion.filter((empleado)=>empleado.nombre_area === 'Finanzas')
        setFinanzas(empleadoFinanzas.length)
        
        const empleadoMarketing = peticion.filter((empleado)=>empleado.nombre_area === 'Marketing')
        setMarketing(empleadoMarketing.length)

        const empleadoTi = peticion.filter((empleado)=>empleado.nombre_area === 'TI')
        setTi(empleadoTi.length)

    } 
    traerEmpleadosPorArea()
  },[])

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      animations: { enabled: true },
    },
    colors: ['#6A5AE0'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Recursos humanos', 'Atención al cliente', 'Finanzas', 'Marketing', 'TI'],
      labels: {
        style: {
          colors: '#9a9a9a',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9a9a9a',
        },
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'light',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        gradientToColors: ['#A066F4'],
        stops: [0, 100],
      },
    },
  };

  const chartData = {
    series: [
      {
        name: 'Visitors',
        data: [recursosHumanos, atencionCliente, finanzas, marketing, ti]
      },
    ],
  };

  return (
    <div className="traffic-chart p-6 bg-white rounded shadow-sm">
      <h6 className="text-muted">Cantidad de empleados en areas de trabajo</h6>
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height="250"
      />
    </div>
  );
};

export default GraficoBarras3;
