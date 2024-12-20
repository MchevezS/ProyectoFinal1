/*
  Este componente se encarga de mostrar un mensaje de error 403, que indica que el usuario no tiene permisos para acceder a la página.
  Se muestra un mensaje de error y un botón que redirige al usuario a la página de inicio.
*/

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