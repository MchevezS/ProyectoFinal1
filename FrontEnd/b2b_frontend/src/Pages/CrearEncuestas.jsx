import React from 'react';
import { useState } from 'react';
import post from '../fetch';
import {useCookies} from 'react-cookie';
import Navbar from '../Components/Navbar';
import { mostrarAlerta } from '../Components/MostrarAlerta';
import { useLocation } from 'react-router-dom';
import '../Style/CrearEncuestas.css'


function CrearEncuestas() {
    //Estados para manejar el cambio de informacion en los inputs
    const [tituloEncuesta,setTituloEncuesta]=useState("")
    const [descripcionEncuesta,setdescripcionEncuesta]=useState("")
    const [preguntaEncuesta,setpreguntaEncuesta]=useState("")
  
    
    //HOOK (creacion de cookies) recibe el nombre de la cookie que va a tener 
    const [cookies,setCookies]=useCookies(["Encuesta"])

    //Funcion que se ejecuta al tocar el boton de enviar, tiene el cuerpo de la encuesta y se envia al endpiont creado en el backend.

async function enviarEncuesta() {
    // Validación de campos vacíos
    if (!tituloEncuesta || !descripcionEncuesta || !preguntaEncuesta) {
      mostrarAlerta("error", "Por favor, complete todos los campos.");
      return; // Detener el envío si algún campo está vacío
    }

    const datosEncuesta = {
        titulo_encuesta : tituloEncuesta,
        descripcion_encuesta:descripcionEncuesta

        //METODO POST 
    }
    const enviarPeticion = await post("encuestas/",datosEncuesta)
    const datosPreguntas = {
      encuesta_referencia : enviarPeticion.id,
      pregunta_texto : preguntaEncuesta
    }

     const enviarPregunta = await post("preguntas/", datosPreguntas)

    if (enviarPeticion){
      mostrarAlerta("success","se agregó la encuesta")
      setTituloEncuesta("")
      setdescripcionEncuesta("")
      setpreguntaEncuesta("")
    }
    else{
      mostrarAlerta("error", "Error al agregar la pregunta.")
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
        <div className="d-flex" style={{ width: '2500px' }}>
          <div className="d-flex flex-column mx-auto w-100 border border-primary form-container">
            <h1 className="encuesta">Crear encuesta</h1>
            {/* Evento para guardar el valor del titulo encuesta */}
            <label className='texto'>Titulo de la encuesta:</label>
            <input
              className="fiel"
              type="text"
              placeholder="Titulo de la encuesta"
              onChange={(e) => setTituloEncuesta(e.target.value)}
              value={tituloEncuesta}
            />
            {/* Evento para guardar la descripcion de la encuesta */}
            <label className='texto'>Descripcion de la encuesta</label>
            <input
              className="fiel"
              type="text"
              placeholder="Descripcion"
              onChange={(e) => setdescripcionEncuesta(e.target.value)}
              value={descripcionEncuesta}
            />
            {/* Envía la encuesta */}
            <label className='texto'>Preguntas de la encuesta</label>
            <input
              className="fiel"
              type="text"
              placeholder="Pregunta"
              onChange={(e) => setpreguntaEncuesta(e.target.value)}
              value={preguntaEncuesta}
            />

            <button onClick={enviarEncuesta} className="submit-button">
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
);
}

export default CrearEncuestas;