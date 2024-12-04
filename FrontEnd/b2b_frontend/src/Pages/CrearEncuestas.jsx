import React from 'react';
import { useState } from 'react';
import post from '../fetch';
import {useCookies} from 'react-cookie';
import Navbar from '../Components/Navbar';
import { mostrarAlerta } from '../Components/MostrarAlerta';
import CardPregunta from '../Components/CardPregunta';


function CrearEncuestas() {
    //Estados para manejar el cambio de informacion en los inputs
    const [tituloEncuesta,setTituloEncuesta]=useState("")
    const [descripcionEncuesta,setdescripcionEncuesta]=useState("")
    const [preguntaEncuesta,setpreguntaEncuesta]=useState("")
  
    
    //HOOK (creacion de cookies) recibe el nombre de la cookie que va a tener 
    const [cookies,setCookies]=useCookies(["Encuesta"])

    //Funcion que se ejecuta al tocar el boton de enviar, tiene el cuerpo de la encuesta y se envia al endpiont creado en el backend.

async function enviarEncuesta() {
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
      mostrarAlerta("error", "error")
    }
    //creacion de la cookie y detalles (nombre de la cookie, valor,{path donde va a ser accesible} y expiracion)
    setCookies("Encuesta", datosEncuesta,{path:"/",maxAge:600}) //esta en segundos
}
    

  return (
    <div>
        <Navbar/>
      

      <div className='d-flex flex-column gap-3 mx-auto w-25 border border-primary'>
      <h1>Crear encuesta</h1>
      {/* evento para guardar el valor del titulo encuesta  */}
      <input type="text"placeholder='Titulo de la encuesta'onChange={(e)=>setTituloEncuesta(e.target.value)} value={tituloEncuesta}/> 
      {/* evento para guaradar la descripcion de la encuesta */}
      <input type="text"placeholder='Descripcion'onChange={(e)=>setdescripcionEncuesta(e.target.value)} value={descripcionEncuesta}/>
      {/* envia la encuesta  */}
      <input type="text"placeholder='Pregunta'onChange={(e)=>setpreguntaEncuesta(e.target.value)} value={preguntaEncuesta}/>
        
      
      <button onClick={enviarEncuesta} className='btn btn-success'>ENVIAR</button>
  
  
      </div>
          
      <CardPregunta/>
    </div>
  );
}

export default CrearEncuestas;
