/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { post } from "../Services/Crud";
import { mostrarAlerta } from "./MostrarAlerta";
import { useNavigate, useLocation } from "react-router-dom";
import "../Style/CardPregunta.css";

/*
 Este componente se encarga de mostrar las opciones de respuesta de una pregunta
*/

const CardPregunta = ({guardarRespuesta}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [retroalimentacion, setRetroalimentacion] = useState("");
  const [cookie, setCookie] = useCookies(["usuarioID", "empresaId", "token"]);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const token = cookie.token;

  // Maneja el cambio de selección de las respuestas
  const cambiOpcion = (e) => {
    const valor = e.target.value;
    setRespuestaSeleccionada(valor);
    console.log(respuestaSeleccionada);
    guardarRespuesta(valor);
  };


  return (
    <form className="px-4">
      {/* Opciones de respuesta */}
      {["MUY BUENA", "BUENA", "REGULAR", "MALA", "MUY MALA"].map((opcion) => (
        <div className="form-check mb-2 text-start" key={opcion}>
          <input
            checked={respuestaSeleccionada === opcion}
            onChange={cambiOpcion}
            value={opcion}
            className="form-check-input"
            type="radio"
            name="exampleForm"
            id={`radio-${opcion}`}
          />
          <label className="form-check-label" htmlFor={`radio-${opcion}`}>
            {opcion.charAt(0) + opcion.slice(1).toLowerCase()}
          </label>
        </div>
      ))}

   

     

    </form>
  );
};

export default CardPregunta;
