import BarraLateral from "./BarraLateral"
import DashboardCards from "./DashboardCards"
import Header from "./Header"
import "../Style/Dashboard.css"
import ContenedorGraficos from "./ContenedorGraficos"

const Dashboard = ()=>{
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