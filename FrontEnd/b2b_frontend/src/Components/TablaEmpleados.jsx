import React from 'react';
import { Table, ProgressBar } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import { getFilter,get,patch } from "../Services/Crud"
import { useCookies } from "react-cookie"

const TablaEmpleados = () => {
  const [empleados,setEmpleados] = useState([])
  const [cookies]=useCookies(["empresaId"])
  const [carga,setCarga] = useState(false) // Estado de recarga, para que se actualice la tabla de empleados
  
  useEffect(()=>{
      const traerEmpleados = async()=>{
       const peticion = await  getFilter('traer-empleados',cookies.empresaId,'empresa_id')
       setEmpleados(peticion)
      }
      traerEmpleados()
  },[carga]) // Se ejecuta el useEffect cada vez que cambia el estado

    const cambiarEstado = async(nombre_usuario)=>{
      const peticion = await patch('estado-usuario','',nombre_usuario)
      console.log(peticion)
      setCarga(!carga) // Cambiamos el estado cada vez que tocamos el botoncito
    }
  return (
        <div className="p-4 bg-white rounded shadow-sm" style={{height:'100vh'}} >
        <h5>Estado de los empleados</h5>
        <Table bordered hover className="align-middle w-100">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha contratación</th>
            <th>Cambiar estado</th>
          </tr>
        </thead>
        <tbody >
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.username}</td>
              <td >
               {empleado.is_active ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
                {empleado.is_active ? 'Activo' : 'Inactivo'}
              </td>
              <td>{new Date(empleado.date_joined).toISOString().split('T')[0]}</td>
              <td>
                <button onClick={()=>cambiarEstado({username:empleado.username})} className="btn btn-sm btn-outline-primary">Cambiar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaEmpleados;
