import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useCookies } from 'react-cookie';
import { getFilter } from '../Services/Crud'; 

const CardGraficoBarras2 = () => {
  const [recursosHumanos, setRecursosHumanos] = useState(0);
  const [atencionCliente, setAtencionCliente] = useState(0);
  const [finanzas, setFinanzas] = useState(0);
  const [marketing, setMarketing] = useState(0);
  const [ti, setTi] = useState(0);

  const [cookies] = useCookies(['empresaId']);

  useEffect(() => {
    const traerEmpleadosPorArea = async () => {
      const peticion = await getFilter('areas-trabajo-usuario', cookies.empresaId, 'empresa_id');

      setRecursosHumanos(
        peticion.filter((empleado) => empleado.nombre_area === 'Recursos humanos').length
      );
      setAtencionCliente(
        peticion.filter((empleado) => empleado.nombre_area === 'Atencion al cliente').length
      );
      setFinanzas(
        peticion.filter((empleado) => empleado.nombre_area === 'Finanzas').length
      );
      setMarketing(
        peticion.filter((empleado) => empleado.nombre_area === 'Marketing').length
      );
      setTi(
        peticion.filter((empleado) => empleado.nombre_area === 'TI').length
      );
    };

    traerEmpleadosPorArea();
  }, [cookies]);

  const chartOptions = {
    chart: {
      type: 'bar',
      animations: { enabled: true },
    },
    colors: ['#91B9CC'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'Recursos humanos',
        'Atención al Cliente',
        'Finanzas',
        'Marketing',
        'TI',
      ],
      labels: {
        style: {
          colors: 'white',
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white',
        },
      },
    },
    grid: {
      show: false,
    },

  };

  const chartData = {
    series: [
      {
        name: 'Cantidad de Empleados',
        data: [recursosHumanos, atencionCliente, finanzas, marketing, ti],
      },
    ],
  };

  const chartWidth = 880;

  return (
    <div
      style={{
        backgroundColor: '#1c1f2e',
        width: `${chartWidth}px`,
        padding: '10px',
        borderRadius: '8px',
        margin: '0 auto',
      }}
    >
         <h5
          className="text-uppercase mb-3"
          style={{
            fontSize: "14px",
            textAlign: "center",
            color: "white",
          }}
        >
          Cantidad de empleados por área
        </h5>
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={350}
        width={chartWidth}
      />
    </div>
  );
};

export default CardGraficoBarras2;
