import Chart from "react-apexcharts";

const CardGraficoCircular = ({ titulo1, titulo2, valor1 = 0, valor2 = 0 }) => {
  const opciones = {
    series: [valor1, valor2],
    chart: {
      type: "pie",
      height: 360,
    },
    stroke: {
      colors: ["#25283a"], 
      width: 2,
    },
    colors: ["#6A0DAD", "#D9DBF1"], 
    labels: [titulo1, titulo2],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#ffffff", "#ffffff"], 
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    legend: {
      labels: {
        colors: "#ffffff", 
      },
      markers: {
        fillColors: ["#D9DBF1", "#6A0DAD"], 
      },
    },
    fill: {
      gradient: {
        shade: "dark",
        type: "horizontal",
        stops: [0, 100],
      },
    },
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        color: "#fff",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        className="p-4 rounded"
        style={{
          width: "320px",
          background: "#26263A",
          color: "#fff",
          height: "300px",
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
          Encuestas realizadas
        </h5>
        <div className="d-flex justify-content-center">
          <Chart
            options={opciones}
            series={opciones.series}
            type="pie"
            width="300"
          />
        </div>
      </div>
    </div>
  );
};

export default CardGraficoCircular;
