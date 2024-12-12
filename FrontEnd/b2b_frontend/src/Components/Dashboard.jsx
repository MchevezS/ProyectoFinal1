import BarraLateral from "./BarraLateral"
import DashboardCards from "./DashboardCards"
import Header from "./Header"
import "../Style/Dashboard.css"
import ContenedorGraficos from "./ContenedorGraficos"
import {useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { getFilter } from "../Services/Crud"

const Dashboard = ()=>{
  // const [cookies,setCookies]=useCookies(["empresaId",'usuarioID','nombreEmpresa','token'])
  // const token = cookies.token
  // useEffect(()=>{
  //   const obtenerEmpresa = async()=>{
  //     const empresa = await getFilter("empresa-id/",cookies.usuarioID,'propietario_id')
  //     setCookies('empresaId',empresa.id_empresa)
  //     setCookies('nombreEmpresa',empresa.nombre_empresa)
  //     cookies.empresaId = empresa.id_empresa
  //   }
  //   obtenerEmpresa()
  // },[])

    return(
        <>
      <div className="sidebar" style={{ width: '50px' }}>
        <BarraLateral/>
      </div>
      <div className="d-flex">
      <div className="content flex-grow-1 ">
        <Header />
        <div className="container mt-4 ">
          <DashboardCards />
        </div>
        <div className="container mt-4">
          <ContenedorGraficos/>
        </div>
      </div>
      </div>
        </>
    )
}


export default Dashboard