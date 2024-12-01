import { useNavigate } from "react-router-dom"


const NavbarEncuestas =({})=>{
    const navigate = useNavigate()
    return(

    <>
        <nav className="navbar" id='Inicio'>
        <div className="navbar-container">
        
      
        {/* Links del menú */}
        <ul className="nav-links">


        <li className="text-light"><a onClick={()=>{navigate("/ResponderEncuestas")}}> Encuestas </a></li>
          
         </ul>

        </div>
        </nav>


    </>

    )
}
export default NavbarEncuestas