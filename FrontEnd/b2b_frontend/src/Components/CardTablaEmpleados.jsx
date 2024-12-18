import { Table} from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import { getFilter,get,patch } from "../Services/Crud"
import { useCookies } from "react-cookie"

const CardTablaEmpleados = () => {
  const [empleados,setEmpleados] = useState([])
  const [cookies]=useCookies(["empresaId",'token'])
  const token = cookies.token
  const [carga,setCarga] = useState(false) // Estado de recarga, para que se actualice la tabla de empleados
  
  useEffect(()=>{
      const traerEmpleados = async()=>{
       const peticion = await  getFilter('traer-empleados',cookies.empresaId,'empresa_id')
       setEmpleados(peticion)
      }
      traerEmpleados()
  },[carga]) // Se ejecuta el useEffect cada vez que cambia el estado

    const cambiarEstado = async(nombre_usuario)=>{
      const peticion = await patch('estado-usuario','',nombre_usuario,token)
      console.log(peticion)
      setCarga(!carga) // Cambiamos el estado cada vez que tocamos el botoncito
    }
    return (
        <>
      <Table
  className="align-middle"
  style={{
   
    width: "32vw",
  }}
>
        <thead style={{backgroundColor:"#262a39",border:"none"}}>
          <tr style={{backgroundColor:"#262a39",border:"none"}}>
            <th style={{backgroundColor:"#262a39","color":"#fff"}}>Nombre</th>
            <th style={{backgroundColor:"#262a39","color":"#fff"}}>Estado</th>
            <th style={{backgroundColor:"#262a39","color":"#fff"}}>Fecha contratación</th>
            <th style={{backgroundColor:"#262a39","color":"#fff"}}>Cambiar estado</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:"#262a39",border:"none"}}>
          {empleados.map((empleado) => (
            <tr key={empleado.id} style={{backgroundColor:"#262a39",border:"none"}}>
              <td style={{backgroundColor:"#262a39","color":"#fff",border:"none"}}>{empleado.username}</td>
              <td style={{backgroundColor:"#262a39","color":"#fff",border:"none"}}>
               {empleado.is_active ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
                {empleado.is_active ? 'Activo' : 'Inactivo'}
              </td>
              <td style={{backgroundColor:"#262a39","color":"#fff",border:"none"}}>{new Date(empleado.date_joined).toISOString().split('T')[0]}</td>
              <td style={{backgroundColor:"#262a39","color":"#fff",border:"none"}}>
              <button onClick={()=>cambiarEstado({username:empleado.username})} className="btn btn-sm btn-outline-primary" style={{backgroundColor:"#EFEFEF",color:"#000",border:"none"}}>
                    Cambiar
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        </>
    )
}
export default CardTablaEmpleados;