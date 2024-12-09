import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { post } from '../Services/Crud';
import { mostrarAlerta } from './MostrarAlerta';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../Style/CardPregunta.css';


const CardPregunta = () => {
const urlpagina = useLocation()
const navigate = useNavigate()
const [retroalimentacion,setRetroalimentacion] = useState("")
const [cookie,setcookie]= useCookies(["usuarioID",'empresaId','token'])
const [respuestaSeleccionada, setRespuestaSeleccionada] = useState ("")
const token = cookie.token
const cambiOpcion = (e)=> {
 const valor = e.target.value 
 setRespuestaSeleccionada(valor)
  console.log(respuestaSeleccionada);
 }

 const envioRespuesta = async (e)=>{
  const guardarYenviar = {
    encuesta_referencia: localStorage.getItem("id_encuesta"),
    pregunta_referencia: localStorage.getItem("id_pregunta"),
    usuario_referencia: cookie.usuarioID,
    respuesta_texto: respuestaSeleccionada, 
    retroalimentacion: retroalimentacion,
    empresa: cookie.empresaId
  }
  const peticion = await post(guardarYenviar,"respuestas/",token)
  console.log(peticion);
  mostrarAlerta("success", "Se envio la encuesta con exito")
  navigate("/VerEncuestas")
 }
 
 
  return (
    <div className="mx-0 mx-sm-auto">
      <div className="card">
          <form className="px-4" action="">
            <div className="form-check mb-2">
              <input 
              checked = {respuestaSeleccionada==="MUY BUENA"}
              onChange={cambiOpcion}
              value={'MUY BUENA'}
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example1"
              />
              <label className="form-check-label" htmlFor="radio3Example1">
                Muy buena
              </label>
            </div>
            <div className="form-check mb-2">
              <input
              checked={respuestaSeleccionada==="BUENA"}
              onChange={cambiOpcion}
              value={"BUENA"}
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example2"
              />
              <label className="form-check-label" htmlFor="radio3Example2">
               Buena
              </label>
            </div>
            <div className="form-check mb-2">
              <input
              checked={respuestaSeleccionada==="REGULAR"}
              onChange={cambiOpcion}
              value={"REGULAR"}
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example3"
              />
              <label className="form-check-label" htmlFor="radio3Example3">
                Regular
              </label>
            </div>
            <div className="form-check mb-2">
              <input
              checked={respuestaSeleccionada==="MALA"}
              onChange={cambiOpcion}
              value={"MALA"}
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example4"
              />
              <label className="form-check-label" htmlFor="radio3Example4">
                Mala
              </label>
            </div>
            <div className="form-check mb-2">
              <input
              checked={respuestaSeleccionada==="MUY MALA"}
              onChange={cambiOpcion}
              value={"MUY MALA"}
                className="form-check-input"
                type="radio"
                name="exampleForm"
                id="radio3Example5"
              />
              <label className="form-check-label" htmlFor="radio3Example5">
                Muy mala
              </label>
            </div>
            <p className="text-center">
              <strong>¿Qué podemos mejorar?</strong>
            </p>
            <div className="form-outline mb-4">
              <textarea
              onChange={(e)=>setRetroalimentacion(e.target.value)}
              placeholder='Retroalimentacion'
                className="form-control"
                id="form4Example3"
                rows={4}
                defaultValue={""}
              />
            </div>
          </form>
        </div>
        {location.pathname === "/responderEncuestas" && 
        <div className="card-footer text-end">
          <button  onClick={envioRespuesta}>ENVIAR RESPUESTA</button>
      </div>
        }
      </div>
  );
};

export default CardPregunta;
