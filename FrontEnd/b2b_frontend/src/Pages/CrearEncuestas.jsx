import React from 'react';
import { useState,useEffect } from 'react';
import { post } from '../Services/Crud';
import {useCookies} from 'react-cookie';
import Navbar from '../Components/Navbar';
import { mostrarAlerta } from '../Components/MostrarAlerta';
import CardPregunta from '../Components/CardPregunta';
import { useLocation } from 'react-router-dom';
import '../Style/CrearEncuestas.css'
import { getFilter } from '../Services/Crud';
import BarraLateral from '../Components/BarraLateral';
import Header from '../Components/Header';
import Preguntas from '../Components/Preguntas';

function CrearEncuestas() {
    //Estados para manejar el cambio de informacion en los inputs
    const [categoriaEncuesta,setCategoriaEncuesta]=useState("")
    const [descripcionEncuesta,setdescripcionEncuesta]=useState("")
    const [preguntaEncuesta,setpreguntaEncuesta]=useState("")
    const [idEmpresa,setIdEmpresa]=useState([])
    const localPreguntas = JSON.parse(localStorage.getItem("preguntas"))
    //HOOK (creacion de cookies) recibe el nombre de la cookie que va a tener 
    const [cookies,setCookies]=useCookies(["Encuesta","empresaId",'usuarioID','rolUsuario','token','encuestaId'])
    const token = cookies.token
    useEffect(()=>{
      const obtenerEmpresa = async()=>{
        const empresa = await getFilter("empresa-id/",cookies.usuarioID,'propietario_id')
        console.log(empresa.id_empresa)
        setIdEmpresa(empresa.id_empresa)
        setCookies("empresaId",empresa.id_empresa)
        console.log(idEmpresa);
      }
      const obtenerEmpresaUsuario = async()=>{
        const empresa = await getFilter("empresa-id/",cookies.usuarioID,'empresa_id')
        console.log(empresa.id_empresa)
        setIdEmpresa(empresa.id_empresa)
        setCookies("empresaId",empresa.id_empresa)
        console.log(idEmpresa);
      }
      if(cookies.rolUsuario === 'propietario'){
      obtenerEmpresa()
      }else{
        obtenerEmpresaUsuario()
      }

    },[idEmpresa])

    //Funcion que se ejecuta al tocar el boton de enviar, tiene el cuerpo de la encuesta y se envia al endpiont creado en el backend.
  
async function enviarEncuesta() {
    const datosEncuesta = {
        categoria_encuesta: categoriaEncuesta,
        descripcion_encuesta:descripcionEncuesta,
        empresa: cookies.empresaId,
        //METODO POST 
    }
    if(categoriaEncuesta === "" || descripcionEncuesta === ""){
      mostrarAlerta("error","Faltan campos por llenar.")
      return
    }
    const enviarPeticion = await post(datosEncuesta,"encuestas/",token)
    setCookies("encuestaId",enviarPeticion.id)

    if(preguntaEncuesta === ""){
      mostrarAlerta("error","Faltan campos por llenar")
      return
    }
    const datosPreguntas = {
      encuesta_referencia : enviarPeticion.id,
      pregunta_texto : preguntaEncuesta,
    }
     const enviarPregunta = await post(datosPreguntas,"preguntas/",token)
      console.log(enviarPregunta)

    if (enviarPeticion){
      mostrarAlerta("success","Se agregó la encuesta")
      setdescripcionEncuesta("")
      setpreguntaEncuesta("")
    }
    else{
      mostrarAlerta("error", "error")
    }
    //creacion de la cookie y detalles (nombre de la cookie, valor,{path donde va a ser accesible} y expiracion)
    setCookies("Encuesta", datosEncuesta,{path:"/",maxAge:600}) //esta en segundos
}
    const agregarPregunta = async() => {

      const datosPreguntas = {
        encuesta_referencia : cookies.encuestaId,
        pregunta_texto : preguntaEncuesta,
      }
      if(preguntaEncuesta === ""){
        mostrarAlerta("error","Faltan campos por llenar")
        return
      }
       const enviarPregunta = await post(datosPreguntas,"preguntas/",token)
        console.log(enviarPregunta)
        if (enviarPregunta){
          mostrarAlerta("success","se agregó la pregunta")
          setpreguntaEncuesta("")
        }
        else{
          mostrarAlerta("error", "error")
        }
      }
    const reiniciarEncuesta = ()=>{
      setCookies("encuestaId",null)
    } 

  return (
    <div>
     <div className="sidebar" style={{ width: '50px' }}>
            <BarraLateral/>
        </div>
        <div className="content flex-grow-1 ">
          <Header />
        </div>
    <div className="container">
      <div
        style={{ height: '100vh',position:"relative",top:"10px",left:"11vw"}}
      >
        <div className="d-flex gap-5" style={{ width: '150vh',height:"87vh"}}>
          <div className="d-flex flex-column gap-3 mx-auto form-container" style={{border:"3px solid #cccc"}}>
            <h1 className="encuesta">Crear encuesta</h1>
            {/* Evento para guardar el valor del titulo encuesta */}
            {cookies.encuestaId === null &&
            <select onChange={(e)=>setCategoriaEncuesta(e.target.value)}>
              <option selected value="" disabled>Categoria</option>
              <option value="Salud Mental">Salud Mental</option>
              <option value="Ambiente Laboral">Ambiente Laboral</option>
              <option value="Equilibrio Vida-Trabajo">Equilibrio Vida-Trabajo</option>
              <option value="Beneficios y Compensaciones">Beneficios y Compensaciones</option>
              <option value="Comunicación Interna">Comunicación Interna</option>
              <option value="Oportunidades de Crecimiento">Oportunidades de Crecimiento</option> 
            </select>
          }
            {/* Evento para guardar la descripcion de la encuesta */}
            {cookies.encuestaId === null &&
            <input
              className="fiel"
              type="text"
              placeholder="Descripcion"
              onChange={(e) => setdescripcionEncuesta(e.target.value)}
              value={descripcionEncuesta}
            />
          }
            {/* Envía la encuesta */}
            <div className='input-group'>
              <input
                className="fiel form-control"
                type="text"
                placeholder="Pregunta"
                onChange={(e) => setpreguntaEncuesta(e.target.value)}
                value={preguntaEncuesta}
              />
              {cookies.encuestaId &&
              <div className='input-group-append'>
               
                <span onClick={agregarPregunta}  className='btn btn-primary' style={{color:"#041223",marginTop:"10px",height:"5.8vh",borderRadius:"0px",backgroundColor:"#d0d5ff",border:"none"}}>+</span>
              </div>
                }
            </div>
            {cookies.encuestaId ?
             <button onClick={reiniciarEncuesta} style={{backgroundColor:"#d0d5ff",border:"none",color:"#041223"}} className="submit-button">
             Reiniciar Encuesta
           </button>  
          :
          <button onClick={enviarEncuesta} style={{backgroundColor:"#d0d5ff",border:"none",color:"#041223"}} className="submit-button">
          Enviar
          </button>
     }
          </div>
          
        </div>
      </div>
    </div>
    </div>
);
}

export default CrearEncuestas;