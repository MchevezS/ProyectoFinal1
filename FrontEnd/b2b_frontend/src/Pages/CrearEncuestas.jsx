import React from 'react';
import { useState,useEffect } from 'react';
import post from '../fetch';
import {useCookies} from 'react-cookie';
import Navbar from '../Components/Navbar';
import { mostrarAlerta } from '../Components/MostrarAlerta';
import CardPregunta from '../Components/CardPregunta';
import { useLocation } from 'react-router-dom';
import '../Style/CrearEncuestas.css'
import { getFilter } from '../Services/Crud';

function CrearEncuestas() {
    //Estados para manejar el cambio de informacion en los inputs
    const [categoriaEncuesta,setCategoriaEncuesta]=useState("")
    const [descripcionEncuesta,setdescripcionEncuesta]=useState("")
    const [preguntaEncuesta,setpreguntaEncuesta]=useState("")
    const [idEmpresa,setIdEmpresa]=useState([])
    const [cookie] = useCookies(["empresaId"])
    
    //HOOK (creacion de cookies) recibe el nombre de la cookie que va a tener 
    const [cookies,setCookies]=useCookies(["Encuesta","empresaId",'usuarioID'])

    useEffect(()=>{
      const obtenerEmpresa = async()=>{
        const empresa = await getFilter("empresa-id/",cookies.usuarioID,'propietario_id')
        console.log(empresa.id_empresa)
        setIdEmpresa(empresa.id_empresa)
        setCookies("empresaId",empresa.id_empresa)
        console.log(idEmpresa);
      }
      obtenerEmpresa()
    },[idEmpresa])

    //Funcion que se ejecuta al tocar el boton de enviar, tiene el cuerpo de la encuesta y se envia al endpiont creado en el backend.

async function enviarEncuesta() {
    const datosEncuesta = {
        categoria_encuesta: categoriaEncuesta,
        descripcion_encuesta:descripcionEncuesta,
        empresa: cookie.empresaId,
        //METODO POST 
    }
    const enviarPeticion = await post("encuestas/",datosEncuesta)
    console.log(enviarPeticion);
    const datosPreguntas = {
      encuesta_referencia : enviarPeticion.id,
      pregunta_texto : preguntaEncuesta,
    }

     const enviarPregunta = await post("preguntas/", datosPreguntas)

    if (enviarPeticion){
      mostrarAlerta("success","se agregó la encuesta")
      setdescripcionEncuesta("")
      setpreguntaEncuesta("")
    }
    else{
      mostrarAlerta("error", "error")
    }
    //creacion de la cookie y detalles (nombre de la cookie, valor,{path donde va a ser accesible} y expiracion)
    setCookies("Encuesta", datosEncuesta,{path:"/",maxAge:600}) //esta en segundos
}
    

  return (
    <div>
    <Navbar />
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="d-flex gap-5" style={{ width: '1000vh' }}>
          <div className="d-flex flex-column gap-3 mx-auto w-50 border border-primary form-container">
            <h1 className="encuesta">Crear encuesta</h1>
            {/* Evento para guardar el valor del titulo encuesta */}
            <select onChange={(e)=>setCategoriaEncuesta(e.target.value)}>
              <option value="" disabled>Categoria</option>
              <option value="Salud Mental">Salud Mental</option>
              <option value="Ambiente Laboral">Ambiente Laboral</option>
              <option value="Equilibrio Vida-Trabajo">Equilibrio Vida-Trabajo</option>
              <option value="Beneficios y Compensaciones">Beneficios y Compensaciones</option>
              <option value="Comunicación Interna">Comunicación Interna</option>
              <option value="Oportunidades de Crecimiento">Oportunidades de Crecimiento</option> 
            </select>
            {/* Evento para guardar la descripcion de la encuesta */}
            <input
              className="fiel"
              type="text"
              placeholder="Descripcion"
              onChange={(e) => setdescripcionEncuesta(e.target.value)}
              value={descripcionEncuesta}
            />
            {/* Envía la encuesta */}
            <input
              className="fiel"
              type="text"
              placeholder="Pregunta"
              onChange={(e) => setpreguntaEncuesta(e.target.value)}
              value={preguntaEncuesta}
            />

            <button onClick={enviarEncuesta} className="submit-button">
              Enviar
            </button>
          </div>
          <div className="card">
            <CardPregunta />
          </div>
        </div>
      </div>
    </div>
    </div>
);
}

export default CrearEncuestas;