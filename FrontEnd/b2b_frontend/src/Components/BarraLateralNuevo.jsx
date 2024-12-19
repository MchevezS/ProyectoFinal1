import { MdDashboard } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { TbLogout2 } from "react-icons/tb";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Style/BarraLateral.css";

const BarraLateralNuevo = ({ estiloDashboard }) => {
  const [cookies] = useCookies(["rolUsuario", "token", "nombreEmpresa"]);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMenu(false);
  };

  const cerrarSesion = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost;`;
    });
    navigate("/registroLogin");
  };

  return (
    <div className="barra-lateral">
      <div className="barra-lateral-logo">
        <h2>B2B</h2>
      </div>
      <div className="barra-lateral-menu">
        {cookies.rolUsuario === "propietario" && (
          <ul className="barra-lateral-menu-lista">
            <li
              onClick={() => navigate("/dashboard")}
              className="barra-lateral-menu-icono text-dark"
            >
              <MdDashboard className="me-3" size={25} />
            </li>
            <li
              className="barra-lateral-menu-icono text-dark"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={toggleMenu}
            >
              <RiSurveyFill className="me-3" size={25} />
              {menu && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    listStyle: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    zIndex: 100,
                  }}
                >
                  <li
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => handleNavigate("/CrearEncuestas")}
                  >
                    Crear Encuesta
                  </li>
                  <li
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => handleNavigate("/VerEncuestas")}
                  >
                    Encuestas Creadas
                  </li>
                  <li
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => handleNavigate("/respondidas")}
                  >
                    Encuestas Respondidas
                  </li>
                </ul>
              )}
            </li>
            <li
              onClick={() => navigate("/empresas")}
              className="barra-lateral-menu-icono text-dark"
            >
              <IoMdBusiness className="me-3" size={25} />
            </li>
            <li
              onClick={() => navigate("/perfil")}
              className="barra-lateral-menu-icono text-dark"
            >
              <ImProfile className="me-3" size={25} />
            </li>
            <li
              onClick={cerrarSesion}
              className="barra-lateral-menu-icono text-dark"
            >
              <TbLogout2 className="me-3" size={25} />
            </li>
          </ul>
        )}
        {cookies.rolUsuario === "trabajador" && (
          <ul className="barra-lateral-menu-lista">
            <li
              style={{ padding: "5px 10px", cursor: "pointer" }}
              onClick={() => handleNavigate("/VerEncuestas")}
            >
              <RiSurveyFill className="me-3" size={25} />
            </li>
            
            <li
              onClick={() => navigate("/perfil")}
              className="barra-lateral-menu-icono text-dark"
            >
              <ImProfile className="me-3" size={25} />
            </li>
            <li
              onClick={cerrarSesion}
              className="barra-lateral-menu-icono text-dark"
            >
              <TbLogout2 className="me-3" size={25} />
            </li>
            <br/>            
            <br/>            
            <br/>            
            <br/>            
            <br/>            
            <br/>            
            <br/>            
            <br/>            
            <br/>            

          </ul>
        )}
        {cookies.rolUsuario === "usuario" && (
          <ul className="barra-lateral-menu-lista">
            <li
              style={{ padding: "5px 10px", cursor: "pointer" }}
              onClick={() => handleNavigate("/empresas")}
            >
              <IoMdBusiness className="me-3" size={25} />
            </li>
            <li
              onClick={() => navigate("/perfil")}
              className="barra-lateral-menu-icono text-dark"
            >
              <ImProfile className="me-3" size={25} />
            </li>
            <li
              onClick={cerrarSesion}
              className="barra-lateral-menu-icono text-dark"
            >
              <TbLogout2 className="me-3" size={25} />
            </li>
            <br/>            
            <br/>            
            <br/>            
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </ul>
        )}
        {cookies.rolUsuario === "recursos_humanos" && (
          <ul className="barra-lateral-menu-lista">
            <li
              className="barra-lateral-menu-icono text-dark"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={toggleMenu}
            >
              <RiSurveyFill className="me-3" size={25} />
              {menu && (
                <ul
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    listStyle: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    zIndex: 100,
                  }}
                >
                  <li
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => handleNavigate("/CrearEncuestas")}
                  >
                    Crear Encuesta
                  </li>
                  <li
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => handleNavigate("/VerEncuestas")}
                  >
                    Encuestas Creadas
                  </li>
                  <li
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={() => handleNavigate("/respondidas")}
                  >
                    Encuestas Respondidas
                  </li>
                 
                </ul>
              )}
            </li>
            <li
              onClick={() => navigate("/perfil")}
              className="barra-lateral-menu-icono text-dark"
            >
              <ImProfile className="me-3" size={25} />
            </li>
            <li
                    onClick={cerrarSesion}
                    className="barra-lateral-menu-icono text-dark"
                  >
                    <TbLogout2 className="me-3" size={25} />
            </li>
            <li
                    onClick={cerrarSesion}
                    className="barra-lateral-menu-icono text-dark"
                  >
            </li>
            <li
                    onClick={cerrarSesion}
                    className="barra-lateral-menu-icono text-dark"
                  >
            </li>
            <li
                    onClick={cerrarSesion}
                    className="barra-lateral-menu-icono text-dark"
                  >
            </li>
            
          </ul>
        )}
      </div>
    </div>
  );
};

export default BarraLateralNuevo;
