import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GraficoBarras2 = () => {
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
      data: [1, 2, 3, 4, 5, 6],
    },
  ];

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default GraficoBarras2;
