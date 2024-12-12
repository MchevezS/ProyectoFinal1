import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { get } from "../Services/Crud";
import CardEncuesta from "../Components/CardEncuesta";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BarraLateral from "../Components/BarraLateral";
import Header from "../Components/Header";

const ResponderEncuestas =()=>{
    const [encuestas, setEncuestas]= useState([])
    const [cookie,setcookie]= useCookies(["id_encuesta",'empresaId'])
    const navigate = useNavigate()
    useEffect(()=>{
        const traerEncuestas = async()=>{
            const peticion = await get("encuestas")
            const encuestasEmpresa = peticion.filter((encuesta)=>encuesta.empresa===cookie.empresaId)
            setEncuestas(encuestasEmpresa)                                                                                      
        }
        traerEncuestas()
    },[])

    return(
        <>
 {encuestas.map((encuesta)=>{
    return(
    <CardEncuesta key={encuesta.id}
    titulo={encuesta.titulo_encuesta}
    descripcion={encuesta.descripcion_encuesta}
    fechaSubida={encuesta.fecha_creacion}
    responder={()=> { 

     localStorage.setItem("id_encuesta", encuesta.id)
        navigate("/verEncuesta")
    
    }}
    />)


 })}

        </>
    )
}
export default ResponderEncuestas