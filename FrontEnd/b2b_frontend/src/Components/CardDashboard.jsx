const CardDashboard = ({ titulo, valor, descripcion, trend, trendColor }) => {
  return (
    <>
      <div className="card text-light mt-3" style={{ width: "20rem",height:"20vh" ,backgroundColor: "#272838",borderRadius: "10px",marginLeft:"-13px"}}>
        <div className="card-body">
          <h6 className="card-title text-uppercase text-light">{titulo}</h6>
          <h2 className="card-text">{valor}</h2>
        </div>
      </div>
    </>
  );
};
export default CardDashboard;
