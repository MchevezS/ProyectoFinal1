import React from 'react';
import GraficoLineas from './GraficoLineas';
import GraficoBarras from './GraficoBarras';
import TablaGraficos from './TablaGraficos';
import GraficoBarras2 from './GraficoBarras2';
import GraficoBarras3 from './GraficoBarras3';
import GraficoCircular from './GraficoCircular';
import TablaEmpleados from './TablaEmpleados';

function ContenedorGraficos() {
  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <div className="card p-3" style={{height:"55vh"}}>
          <div className="d-flex justify-content-between">
            <h6>Nivel de satisfacción</h6>
            <i className="bi bi-bar-chart fs-5"></i>
          </div>
          <GraficoBarras />
        </div>
      </div>
      <div className="col-md-6">
        <div className="card p-3" style={{height:"55vh"}}>
          <div className="d-flex justify-content-between">
            <h6>Areas de trabajo</h6>
            <i className="bi bi-bar-chart fs-5"></i>
          </div>
          <GraficoBarras3 />
        </div>
      </div>
      <div className="col-md-6">
        <div className="card p-3">
          <div className="d-flex justify-content-between">
            <h6>Retroalimentación según la categoría</h6>
            <i className="bi bi-bar-chart fs-5"></i>
          </div>
          <GraficoBarras2/>
         </div>
      </div>
      <div className="col-md-6">
        <div className="card p-3"> 
          <div className="d-flex justify-content-between">
            <h6>Trabajadores</h6>
            <i className="bi bi-bar-chart fs-5"></i>
          </div>
          <TablaEmpleados/>
         </div>
      </div>
      <div className="col-md-6">
        <div className="card p-3">
          <div className="d-flex justify-content-between">
            <i className="bi bi-bar-chart fs-5"></i>
          </div>
          <GraficoCircular/>
         </div>
      </div>
    
    </div>
    
  );
}

export default ContenedorGraficos;
