import Chart from "react-apexcharts";
const CardGraficoCircular = ({ titulo1,titulo2, valor1=0,valor2=0}) => {
  const opciones = {
    series: [valor1,valor2],
    chart: {
      type: "pie",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "70%",
        },
        track: {
          background: "#2E2E48",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            fontSize: "32px",
            color: "#fff",
            offsetY: 8,
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    colors: ["#FF5F6D", "#7F7EFD"],
    fill: {
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#7F7EFD"],
        stops: [0, 100],
      },
    },
    labels: [titulo1 , titulo2],
  };
  return (
    <>
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
          style={{ width: "320px", background: "#26263A",color:"#fff",height:"270px" }}
        >
          <h5 className="text-uppercase mb-3" style={{ fontSize: "12px" }}>
            Encuestas realizadas
          </h5>
          <div className="d-flex justify-content-between">
            <div>
              <Chart
                options={opciones}
                series={opciones.series}
                type="pie"
                color="#fff"
                width="310"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardGraficoCircular;
