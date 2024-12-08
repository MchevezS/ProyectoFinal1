import React, { useState } from 'react';
import '../Style/BarraLateral.css';
import {useCookies} from 'react-cookie'
import { MdDashboard } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { CiMenuBurger } from "react-icons/ci";

function BarraLateral() {
  const [visible, setVisible] = useState(true);
  const [cookies] = useCookies(['rolUsuario'])
  return (
    visible ? (
      <div className="d-flex flex-column vh-100 barra-lateral">
        <h3 onClick={()=>setVisible(false)}  className="mb-4 text-primary text-center">B2B</h3>
        {/* Lista para propietario */}

        {
          cookies.rolUsuario === 'propietario' &&
          <ul className="nav flex-column">
          <li className="nav-item mb-5">
            <a href="/dashboard" className="nav-link d-flex align-items-center">
              <MdDashboard className="me-3" size={25} />
              Dashboard
            </a>
          </li>
          <li className="nav-item mb-5">
            <a href="/CrearEncuestas" className="nav-link d-flex align-items-center">
              <RiSurveyFill className="me-3" size={25} />
              Encuestas
            </a>
          </li>
          <li className="nav-item mb-5">
            <a href="/empresas" className="nav-link d-flex align-items-center">
              <IoMdBusiness className="me-3" size={25} />
              Empresa
            </a>
          </li>
          <li className="nav-item mb-5">
            <a href="/perfil" className="nav-link d-flex align-items-center">
              <ImProfile className="me-3" size={25} />
              Perfil
            </a>
          </li>
          </ul>
        }

        {/* Lista para recursos humanos */}
        {
          cookies.rolUsuario === 'recursos_humanos' &&
          <ul className="nav flex-column">
          <li className="nav-item mb-5">
            <a href="/CrearEncuestas" className="nav-link d-flex align-items-center">
              <RiSurveyFill className="me-3" size={25} />
              Encuestas
            </a>
          </li>
          <li className="nav-item mb-5">
            <a href="/perfil" className="nav-link d-flex align-items-center">
              <ImProfile className="me-3" size={25} />
              Perfil
            </a>
          </li>
          <li className="nav-item mb-5">
              <a href="/verEncuestas" className="nav-link d-flex align-items-center">
                <RiSurveyFill className="me-3" size={25} />
                Ver Encuestas
              </a>
          </li>
          </ul>
        }

        {/* Lista para trabajador */}
        {
          cookies.rolUsuario === 'trabajador' &&
          <ul className="nav flex-column">
          <li className="nav-item mb-5">
            <a href="/perfil" className="nav-link d-flex align-items-center">
              <ImProfile className="me-3" size={25} />
              Perfil
            </a>
          </li>
          <li className="nav-item mb-5">
              <a href="/verEncuestas" className="nav-link d-flex align-items-center">
                <RiSurveyFill className="me-3" size={25} />
                Ver Encuestas
              </a>
          </li>
          </ul>
        }
        
        {/* Lista para usuario */}
        {
        cookies.rolUsuario === 'usuario' &&
        <ul className="nav flex-column">
          <li className="nav-item mb-5">
            <a href="/empresas" className="nav-link d-flex align-items-center">
              <IoMdBusiness className="me-3" size={25} />
              Empresa
            </a>
          </li>
          <li className="nav-item mb-5">
            <a href="/perfil" className="nav-link d-flex align-items-center">
              <ImProfile className="me-3" size={25} />
              Perfil
            </a>
          </li>
        </ul>
        }
      </div>
    ) : (
      <CiMenuBurger style={{color:"#ffff"}} size={50} onClick={()=>{setVisible(!visible)}}/> /* poner un icono si o si */
    )
  );
}

export default BarraLateral;
