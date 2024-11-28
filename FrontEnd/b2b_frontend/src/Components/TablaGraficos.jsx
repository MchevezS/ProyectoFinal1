import React from 'react';
import { Table, Form } from 'react-bootstrap';

const TablaGraficos = () => {
  const rows = [
    { name: "Horizon UI PRO", progress: 17.5, quantity: 2458, date: "12 Jan 2021" },
    { name: "Horizon UI Free", progress: 10.8, quantity: 1485, date: "21 Feb 2021" },
    { name: "Weekly Update", progress: 21.3, quantity: 1024, date: "13 Mar 2021" },
    { name: "Venus 3D Asset", progress: 31.5, quantity: 858, date: "24 Jan 2021" },
    { name: "Marketplace", progress: 12.2, quantity: 258, date: "24 Oct 2022" },
  ];

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <h5>Check Table</h5>
      <Table bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Progress</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><Form.Check type="checkbox" /></td>
              <td>{row.name}</td>
              <td>{row.progress}</td>
              <td>{row.quantity}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaGraficos;
