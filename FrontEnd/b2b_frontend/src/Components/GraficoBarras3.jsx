import React from 'react';
import Chart from 'react-apexcharts';
import '../Style/GraficoBarras3.css';
const GraficoBarras3 = () => {
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
        data: [15, 25, 35, 45, 30],
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
