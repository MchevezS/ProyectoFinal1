import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { get } from "../Services/Crud";
import CardEncuesta from "../Components/CardEncuesta";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import BarraLateralNuevo from "../Components/BarraLateralNuevo";

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
        <div style={{backgroundColor:"#e2e2e2"}}>
        <div>
          <BarraLateralNuevo/>
        </div>
  
        <div className="d-flex flex-row" style={{position:"absolute",left:"30%",top:"20%",width:"70%"}}>
        {encuestas.map((encuesta,index)=>{
    return(
    <div key={index} style={{position:"relative",right:"20vw",bottom:"8vw",display:"flex",marginLeft:"20px",marginRight:"20px"}} >
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

        </div>
    )
}
export default ResponderEncuestas