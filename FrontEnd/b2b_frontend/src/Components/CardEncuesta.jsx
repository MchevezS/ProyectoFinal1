
const CardEncuesta = ({ titulo, descripcion, fechaSubida, responder}) => {
  return (
    <div className='d-flex gap-3'>
      <div className="card w-100">
        <h2 className="card-title">{titulo}</h2>
        <p className="card-description">{descripcion}</p>
        <p className="card-date">Subido el: {fechaSubida}</p>
        <button onClick={responder}> Responder encuesta </button>
      </div>
    <div/>
    </div>
  );
};
export default CardEncuesta
