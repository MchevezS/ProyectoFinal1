import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GraficoCircular = () => {
  const options = {
    labels: ['Respondidas', 'Sin responder'],
    colors: ['#6A5AE0', '#91d3f8'],
    legend: {
      position: 'bottom',
    },
  };

  const series = [63, 25]; 

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <h5>Estado de las encuestas</h5>
      <ReactApexChart options={options} series={series} type="pie" height={300} />
    </div>
  );
};

export default GraficoCircular;
