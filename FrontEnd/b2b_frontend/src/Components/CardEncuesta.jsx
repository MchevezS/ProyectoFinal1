import '../Style/CardEncuesta.css'

const CardEncuesta = ({ titulo, descripcion, fechaSubida, responder}) => {
  return (
    <div className="card">
      <h2 className="card-title">{titulo}</h2>
      <p className="card-description">{descripcion}</p>
      <p className="card-date">Subido el: {fechaSubida}</p>
      <button onClick={responder}> Responder encuesta </button>

    </div>
  );
};
export default CardEncuesta
