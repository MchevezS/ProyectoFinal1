import CardPregunta from "../Components/CardPregunta";
import { useState, useEffect } from "react";
import { get, post } from "../Services/Crud";
import "../Style/VerEncuesta.css";
import { useCookies } from "react-cookie";
import BarraLateralNuevo from "../Components/BarraLateralNuevo";
import { mostrarAlerta } from "../Components/MostrarAlerta";
import {useNavigate} from 'react-router-dom';
const VerEncuesta = () => {
  const [encuesta, setEncuesta] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaRespuestaE, setPreguntaRespuestaE] = useState("");
  const [cookie] = useCookies(["usuarioID", "empresaId", "token"]);
  const [retroalimentacion, setRetroalimentacion] = useState("");
  const token = cookie.token;
  const navigate = useNavigate();
  useEffect(() => {
    const traerEncuestas = async () => {
      const peticion = await get(
        "encuestas",
        localStorage.getItem("id_encuesta")
      );
      setEncuesta(peticion.encuesta);
      setPreguntas(peticion.preguntas);
    };
    traerEncuestas();
  }, []);

  const guardarRespuesta = async (id_pregunta, respuesta) => {
    const preguntaRespuesta = {
      pregunta_referencia: id_pregunta,
      usuario_referencia: cookie.usuarioID,
      respuesta_texto: respuesta,
      empresa: cookie.empresaId,
      encuesta_referencia: localStorage.getItem("id_encuesta"),
    };
    const listaRespuestas = localStorage.getItem("infoRespuesta")
      ? JSON.parse(localStorage.getItem("infoRespuesta"))
      : [];
    const nuevaListaRespuestas = listaRespuestas.filter(
      (item) => item.pregunta_referencia !== id_pregunta
    );
    nuevaListaRespuestas.push(preguntaRespuesta);
    localStorage.setItem("infoRespuesta", JSON.stringify(nuevaListaRespuestas));
    setPreguntaRespuestaE(nuevaListaRespuestas);
  };

  const enviarRespuesta = async () => {
    const listaRespuestas = localStorage.getItem("infoRespuesta")
      ? JSON.parse(localStorage.getItem("infoRespuesta"))
      : [];
    console.log(listaRespuestas);
    for (let i = 0; i < listaRespuestas.length; i++) {
      const respuesta = listaRespuestas[i];
      await post(respuesta, "respuestas/", token);
    }
    mostrarAlerta('success', 'Respuestas enviadas correctamente');
    navigate("/VerEncuestas");
  };

  return (
    <div style={{backgroundColor:"#e2e2e2"}}>
    <BarraLateralNuevo />
      <div
        style={{
          position: "absolute",
          left: "31%",
          top: "10%",
          width: "50%",
          height: "80%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        className="card"
      >
        <h1 style={{ textAlign: "center",fontFamily:"serif" }}>{encuesta.categoria_encuesta}</h1>

        <p style={{ marginBottom: "20px" }}>{encuesta.descripcion_encuesta}</p>

        <ul
          style={{
            flex: "1",
            overflowY: "auto",

            padding: "0 10px",
            margin: "0",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          {preguntas.map((pregunta) => (
            <li
              key={pregunta.id}
              className="list-group-item"
              style={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
              }}
            >
              <p style={{fontSize:"1.2rem"}}>{pregunta.pregunta_texto}</p>
              <CardPregunta
                guardarRespuesta={(respuesta) => guardarRespuesta(pregunta.id, respuesta)}
              />
            </li>
          ))}
        </ul>

        <p className="text-start" style={{ margin: "20px 0 10px" }}>
          <strong>¿Qué podemos mejorar?</strong>
        </p>
        <div className="form-outline mb-4">
          <input
            style={{
              padding: "10px",
            }}
            onChange={(e) => setRetroalimentacion(e.target.value)}
            placeholder="Retroalimentación"
            className="field"
            id="form4Example3"
          />
        </div>
        <div
          className="card-footer text-end"
          style={{
            marginTop: "10px",
          }}
        >
          <button
            className="btn btn-primary"
            onClick={enviarRespuesta}
            style={{
              padding: "10px 20px",
              backgroundColor: "#c91459",
              color: "#fff",
              border: "none",
            }}
          >
            Enviar respuesta
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerEncuesta;
