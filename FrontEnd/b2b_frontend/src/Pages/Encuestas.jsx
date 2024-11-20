import React from 'react';
import { useState } from 'react';
import post from '../fetch';
import {useCookies} from 'react-cookie';


function Encuestas() {
    //Estados para manejar el cambio de informacion en los inputs
    const [tituloEncuesta,setTituloEncuesta]=useState("")
    const [descripcionEncuesta,setdescripcionEncuesta]=useState("")
    //HOOK (creacion de cookies) recibe el nombre de la cookie que va a tener 
    const [cookies,setCookies]=useCookies(["Encuesta"])

    //Funcion que se ejecuta al tocar el boton de enviar, tiene el cuerpo de la encuesta y se envia al endpiont creado en el backend.

async function enviarEncuesta() {
    const datosEncuesta = {
        titulo_encuesta : tituloEncuesta,
        descripcion_encuesta:descripcionEncuesta
    }
    const enviarPeticion = await post("encuestas/",datosEncuesta)
    //creacion de la cookie y detalles (nombre de la cookie, valor,{path donde va a ser accesible} y expiracion)
    setCookies("Encuesta", datosEncuesta,{path:"/",maxAge:60}) //esta en segundos

    console.log(enviarPeticion)
}
    

  return (
    <div>
      <h1>Crear encuesta</h1>
      {/* evento para guardar el valor del titulo encuesta  */}
      <input type="text"placeholder='ingresa el titulo de la encuesta'onChange={(e)=>setTituloEncuesta(e.target.value)}/> 
      {/* evento para guaradar la descripcion de la encuesta */}
      <input type="text"placeholder='descripcion'onChange={(e)=>setdescripcionEncuesta(e.target.value)}/>
      {/* envia la encuesta  */}
      <button onClick={enviarEncuesta}>ENVIAR</button>
    </div>
  );
}

export default Encuestas;
