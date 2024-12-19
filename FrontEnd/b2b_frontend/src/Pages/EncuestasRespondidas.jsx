import BarraLateralNuevo from '../Components/BarraLateralNuevo';
import { useState, useEffect } from 'react';
import { get } from "../Services/Crud";
import { useCookies } from 'react-cookie';
import { Card, Button } from 'react-bootstrap';

const EncuestasRespondidas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const [cookies] = useCookies(['empresaId']);
    
    useEffect(() => {
        const traerEncuestas = async () => {
            const peticion = await get('encuestas-respondidas-empresa', cookies.empresaId);
            setEncuestas(peticion);
            console.log(peticion);
        };
        traerEncuestas();
    }, []);

    return (
        <div style={{backgroundColor:"#e2e2e2"}}>
            <div>
                <BarraLateralNuevo />
            </div>
            <div className="container mt-5 d-flex gap-3" style={{ position: 'absolute', left: '10%',width:"50%", top: '0%' }}>
                {encuestas.map((encuesta, index) => (
                    <Card className="mb-4 shadow-sm" key={index} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        <Card.Header className="text-white" style={{ backgroundColor: '#5c3ac0' }}>
                            <h5>Encuesta: {encuesta.encuesta.categoria_encuesta}</h5>
                            <small className="text-light">Creada el: {encuesta.encuesta.fecha_creacion}</small>
                        </Card.Header>
                        <Card.Body>
                            <h6 className="mb-3">Preguntas y Respuestas:</h6>
                            {encuesta.preguntas.map((pregunta) => (
                                <div key={pregunta.id} className="mb-3">
                                    <strong>{pregunta.pregunta_texto}</strong>
                                    <ul className="mt-2">
                                        {encuesta.respuestas
                                            .filter(respuesta => respuesta.pregunta_referencia === pregunta.id)
                                            .map(respuesta => (
                                                <>
                                                <li style={{color:"blue"}} key={respuesta.id}>{respuesta.respuesta_texto}</li>
                                                <hr />
                                                </>
                                            ))}
                                    </ul>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default EncuestasRespondidas;
