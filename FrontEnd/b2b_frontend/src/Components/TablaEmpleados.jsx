import React from 'react';
import { Table, ProgressBar } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';

const TablaEmpleados = () => {
  const rows = [
    {
      name: "Michelle Chévez",
      status: "Activo",
      statusIcon: <FaCheckCircle className="text-success" />,
      date: "18 Apr 2025",
    },
    {
      name: "Wendy Barrantes",
      status: "Activo",
      statusIcon: <FaTimesCircle className="text-danger" />,
      date: "03 Jun 2025"
    },
    {
      name: "Moha Chávez",
      status: "Activo",
      statusIcon: <FaCheckCircle className="text-success" />,
      date: "15 Feb 2025",
    }
  ];

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
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td >
                {row.statusIcon} {row.status}
              </td>
              <td>{row.date}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary">Cambiar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaEmpleados;
