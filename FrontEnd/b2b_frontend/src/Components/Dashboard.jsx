import BarraLateral from "./BarraLateral"
import DashboardCards from "./DashboardCards"
import Header from "./Header"
import "../Style/Dashboard.css"
import ContenedorGraficos from "./ContenedorGraficos"

const Dashboard = ()=>{
    return(
        <>
           <div className="d-flex">
      <div className="sidebar" style={{ width: '250px' }}>
        <BarraLateral/>
      </div>
      <div className="content flex-grow-1">
        <Header />
        <div className="container mt-4">
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