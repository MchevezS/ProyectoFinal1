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
             <div className="sidebar" style={{ width: '50px' }}>
        <BarraLateral/>
      </div>
      <div className="d-flex">
      <div className="content flex-grow-1 ">
        <Header />
        </div>
        </div>
        <div className="d-flex flex-row">
 {encuestas.map((encuesta,index)=>{
    return(
    <div key={index} className="mx-auto">
    <CardEncuesta key={encuesta.id}
    titulo={encuesta.categoria_encuesta}
    descripcion={encuesta.descripcion_encuesta}
    fechaSubida={encuesta.fecha_creacion}
    responder={()=> { 

     localStorage.setItem("id_encuesta", encuesta.id)
     localStorage.setItem('categoria_encuesta', encuesta.categoria_encuesta)
        navigate("/responderEncuestas")
    
    }}
    />
    </div>
)


 })}
 </div>

        </>
    )
}
export default ResponderEncuestas