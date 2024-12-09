import { useNavigate } from "react-router-dom";
const AccesoDenegado = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1 className="display-4 text-danger">Error 403</h1>
          <p className="lead">No puedes acceder a esta página.</p>
          <button className="btn btn-primary" onClick={()=>navigate('/registroLogin')}>
            Volver al inicio
          </button>
        </div>
      </div>
    </>
  );
};
export default AccesoDenegado;