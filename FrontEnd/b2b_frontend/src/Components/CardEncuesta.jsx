import '../Style/CardEncuesta.css'

const CardEncuesta = ({ titulo, descripcion, fechaSubida, responder}) => {
  return (
    <div className="card1">
      <h2 className="card-titles">{titulo}</h2>
      <p className="card-descriptions">{descripcion}</p>
      <p className="card-dates">Subido el: {fechaSubida}</p>
      <button className="card-button" onClick={responder}> Responder Encuesta </button>

    </div>
  );
};
export default CardEncuesta;