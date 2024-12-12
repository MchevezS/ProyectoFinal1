import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { get } from "../Services/Crud";
import CardEncuesta from "../Components/CardEncuesta";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const ResponderEncuestas =()=>{
    const [encuestas, setEncuestas]= useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const traerEncuestas = async()=>{
            const peticion = await get("encuestas") 
            setEncuestas(peticion)                                                                                      
        }
        traerEncuestas()
    },[])

    const [cookie,setcookie]= useCookies(["id_encuesta"])
    return(
        <div className="encuestas-container">
        {encuestas.map((encuesta) => {
          return (
            <CardEncuesta
              key={encuesta.id}
              titulo={encuesta.titulo_encuesta}
              descripcion={encuesta.descripcion_encuesta}
              fechaSubida={encuesta.fecha_creacion}
              responder={() => {
                localStorage.setItem("id_encuesta", encuesta.id);
                navigate("/verEncuesta");
              }}
            />
          );
        })}
      </div>
    )
}
export default ResponderEncuestas