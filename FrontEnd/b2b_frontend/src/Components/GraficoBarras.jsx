import React from 'react';
import Chart from 'react-apexcharts';

function GraficoBarras() {
  const options = {
    chart: {
      toolbar: { show: false },
      stacked: true,
    },
    colors: ['#9d82fc', '#a7fefe'], // Colores de las barras
    xaxis: {
      categories: ['Muy bien', 'Bien', 'Regular', 'Mal', 'Muy mal'], // Notas en el eje X
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
    { name: 'Obtenida', data: [400, 300, 200, 278, 189] },
    { name: 'Deseada', data: [240, 139, 980, 390, 480] },
  ];

  return <Chart options={options} series={series} type="bar" height={250} />;
}

export default GraficoBarras;
