import React from 'react';
import Chart from 'react-apexcharts';

function GraficoLineas() {
  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#8884d8', '#82ca9d'], // Colores de las líneas
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    xaxis: {
      categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'], // Meses en el eje X
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
    { name: 'Value 1', data: [4000, 3000, 2000, 2780, 1890, 2390] },
    { name: 'Value 2', data: [2400, 1398, 9800, 3908, 4800, 3800] },
  ];

  return <Chart options={options} series={series} type="line" height={250} />;
}

export default GraficoLineas;
