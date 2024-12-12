import React, { useState } from 'react';
import '../Style/BarraLateral.css';
import {useCookies} from 'react-cookie'
import { MdDashboard } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { IoMdBusiness } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { CiMenuBurger } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
function BarraLateral() {
  const [cookies] = useCookies(['rolUsuario','token','nombreEmpresa'])
  const navigate = useNavigate()


  // Función para cerrar sesión
  const cerrarSesion = () => {
    const cookies = document.cookie.split(";"); // Trae todas las cookies que estén guardadas en la página
    
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost;`; 
    }); // Va recorriendo cookie por cookie para ponerles una fecha en el pasado y que se borren totalmente
    navigate('/registroLogin') // Redirige a la página de registro

  }
  return (
      <div className="d-flex flex-column vh-100 barra-lateral">
        <h3 onClick={()=>setVisible(false)}  className="mb-4 text-white text-center">B2B</h3>
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
          <li className="nav-item mb-5">
            <a onClick={cerrarSesion} className="nav-link d-flex align-items-center">
              <TbLogout2  className="me-3" size={25} />
              Cerrar sesión
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
          <li className="nav-item mb-5">
            <a onClick={cerrarSesion} className="nav-link d-flex align-items-center">
              <TbLogout2  className="me-3" size={25} />
              Cerrar sesión
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
          <li className="nav-item mb-5">
            <a onClick={cerrarSesion} className="nav-link d-flex align-items-center">
              <TbLogout2  className="me-3" size={25} />
              Cerrar sesión
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
          <li className="nav-item mb-5">
            <a onClick={cerrarSesion} className="nav-link d-flex align-items-center">
              <TbLogout2  className="me-3" size={25} />
              Cerrar sesión
            </a>
          </li>
        </ul>
        }
      </div>
  );
}

export default BarraLateral;
