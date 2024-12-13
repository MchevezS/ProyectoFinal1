import React, { useState } from 'react';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';
import post from '../fetch';
import { mostrarAlerta } from '../Components/MostrarAlerta';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../Style/CardPregunta.css';

const CardPregunta = ({ opcionSeleccionada }) => {
  const urlpagina = useLocation();
  const navigate = useNavigate();
  const [retroalimentacion, setRetroalimentacion] = useState("");
  const [cookie, setcookie] = useCookies(["usuarioID"]);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [alertaVisible, setAlertaVisible] = useState(false);

  const cambiOpcion = (e) => {
    const valor = e.target.value;
    setRespuestaSeleccionada(valor);
  };

  const envioRespuesta = async (e) => {
    // Validación: comprobar si hay respuesta seleccionada
    if (!respuestaSeleccionada) {
      mostrarAlerta("error", "Por favor, selecciona una respuesta.");
      return;
    }
    // Validación: comprobar si la retroalimentación está vacía
    if (retroalimentacion.trim() === "") {
      mostrarAlerta("error", "Por favor, proporciona retroalimentación.");
      return;
    }
    const guardarYenviar = {
      encuesta_referencia: localStorage.getItem("id_encuesta"),
      pregunta_referencia: localStorage.getItem("id_pregunta"),
      usuario_referencia: cookie.usuarioID,
      respuesta_texto: respuestaSeleccionada,
      retroalimentacion: retroalimentacion
    };
    const peticion = await post("respuestas/", guardarYenviar);
    console.log(peticion);
    // Mostrar la alerta de éxito
    mostrarAlerta("success", "Se envió la encuesta con éxito");
    // Mostrar la alerta y ocultarla después de 3 segundos
    setAlertaVisible(true);
    setTimeout(() => {
      setAlertaVisible(false);
    }, 5000);
    navigate("/ResponderEncuestas");
  };

  return (
    <div className="card-container">
      <div className="card">
        <form className="px-4" action="">
          <div className="form-check mb-2">
            <input
              checked={respuestaSeleccionada === "MUY BUENA"}
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
              checked={respuestaSeleccionada === "BUENA"}
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
              checked={respuestaSeleccionada === "REGULAR"}
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
              checked={respuestaSeleccionada === "MALA"}
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
              checked={respuestaSeleccionada === "MUY MALA"}
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
              onChange={(e) => setRetroalimentacion(e.target.value)}
              placeholder='Retroalimentacion'
              className="form-control"
              id="form4Example3"
              rows={4}
              defaultValue={""}
            />
          </div>
          {urlpagina.pathname === "/verEncuesta" &&
            <div className="card-footer text-end">
              <button className='boton' onClick={envioRespuesta}>ENVIAR RESPUESTA</button>
            </div>
          }
        </form>
      </div>
      {/* Mostrar alerta si está activa */}
      {alertaVisible && (
        <div className="alert alert-success">
          <strong>¡Éxito!</strong> Se envió la encuesta con éxito.
        </div>
      )}
    </div>
  );
};
export default CardPregunta;
