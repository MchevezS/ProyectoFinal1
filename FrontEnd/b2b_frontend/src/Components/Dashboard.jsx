import BarraLateral from "./BarraLateral"
import DashboardCards from "./DashboardCards"
import Header from "./Header"
import "../Style/Dashboard.css"
import ContenedorGraficos from "./ContenedorGraficos"
import {useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { getFilter } from "../Services/Crud"

const Dashboard = ()=>{
  const [idEmpresa,setIdEmpresa]=useState([])
  const [cookies,setCookies]=useCookies(["empresaId",'usuarioID'])

  useEffect(()=>{
    console.log('Entrea al useeffect de dashboard') 
    const obtenerEmpresa = async()=>{
      const empresa = await getFilter("empresa-id/",cookies.usuarioID,'propietario_id')
      console.log(empresa)
      setIdEmpresa(empresa.id_empresa) 
      setCookies('empresaId',empresa.id_empresa)
      console.log(empresa.id_empresa);  
      console.log(idEmpresa);
      cookies.empresaId = empresa.id_empresa
    }
    obtenerEmpresa()
  },[])

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