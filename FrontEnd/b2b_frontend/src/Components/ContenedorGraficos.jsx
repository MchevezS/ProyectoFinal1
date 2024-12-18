import GraficoLineas from './GraficoLineas';
import GraficoBarras from './GraficoBarras';
import TablaGraficos from './TablaGraficos';
import GraficoBarras2 from './GraficoBarras2';
import GraficoBarras3 from './GraficoBarras3';
import GraficoCircular from './GraficoCircular';
function ContenedorGraficos() {
  return (
    <div className="row" style={{marginLeft:"10vw",position:"relative",bottom:"100px"}}>
      <div className="row-md-6 mb-3">
        <div className="card p-5" style={{height:"50vh",width:"53vw"}}>
          <div className="d-flex justify-content-between">
            <h6>Nivel de satisfacción</h6>
          </div>
          <GraficoBarras />
        </div>
      </div>
      <div className='d-flex gap-3'>
      <div className="column-md-6">
        <div className="card p-3" style={{height:"55vh",width:"39vw"}}>
          <div className="d-flex justify-content-between">
            <h6>Areas de trabajo</h6>
          </div>
          <GraficoBarras3 />
        </div>
      </div>
      <div className="column-md-6" >
        <div className="card p-3" style={{height:"55vh",marginLeft:"1vw"}}>
          <GraficoCircular/>
         </div>
      </div>
      </div>
      <div className="row-md-6 mt-3" >
        <div className="card p-3" style={{width:"80vw"}}>
          <div className="d-flex justify-content-between">
            <h6>Retroalimentación según la categoría</h6>
          </div>
          <GraficoBarras2/>
         </div>
      </div>
   
    </div>
  );
}

export default ContenedorGraficos;
