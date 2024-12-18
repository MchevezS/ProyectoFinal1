import React from 'react';
import { useState,useEffect } from 'react';
import { get } from '../Services/Crud';
function DashboardCards() {
  const fecha = new Date().toLocaleDateString()
  const [cantidadEncuestas,setCantidadEncuestas] = useState(0)
  const [encuestasRespondidas,setEncuestasRespondidas] = useState(0)
  const [cantidadRetroalimentacion,setCantidadRetroalimentacion] = useState(0)
  useEffect(()=>{
    const traerCantEncuestas = async () => {
      const cantidad = await get('encuestas')
      setCantidadEncuestas(cantidad.length)
    }
    const traerCantEncuestasRespondidas = async () => {
      const cantidad = await get('respuestas')
      setEncuestasRespondidas(cantidad.length)
    }
    const traerCantRetroalimentacion = async () => {
      const cantidad = await get('respuestas')
      const retroalimentacion = cantidad.filter(cantRetroalimentacion=> cantRetroalimentacion.retroalimentacion !== "")
      setCantidadRetroalimentacion(retroalimentacion.length)
    }
    traerCantEncuestas()
    traerCantEncuestasRespondidas()
    traerCantRetroalimentacion()
  },[])

  const cards = [
    { title: 'Encuestas realizadas', value: cantidadEncuestas, icon: 'bi bi-bar-chart' },
    { title: 'Empleados activos', value: 2, icon: 'bi bi-cash' },
    { title: 'Retroalimentación', value: cantidadRetroalimentacion, icon: 'bi bi-graph-up'},
    { title: 'Encuestas respondidas', value: encuestasRespondidas, icon: 'bi bi-wallet'},
    { title: 'Areas de trabajo', value: 10, icon: 'bi bi-check-circle' },
    { title: 'Fecha actual', value: fecha, icon: 'bi bi-file-earmark' },
  ];

  return (
    <div className="row g-3">
      {cards.map((card, index) => (
        <div className="col-md-4" key={index}>
          <div className="card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <i className={`${card.icon} fs-3 text-primary`}></i>
              {card.flag && <span>{card.flag}</span>}
            </div>
            <h6 className="mt-3">{card.title}</h6>
            <h4>{card.value}</h4>
            {card.info && <small className="text-success">{card.info}</small>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
