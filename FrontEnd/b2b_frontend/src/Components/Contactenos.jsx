import { useState } from 'react';
import emailjs from 'emailjs-com';
import '../Style/Contactenos.css';

function Contactenos() {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    // Maneja los cambios en los inputs
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    // Enviar formulario y correo electrónico
    const handleSubmit = (e) => {
      e.preventDefault(); // Evita el comportamiento por defecto del formulario
  
      // Validación de campos vacíos
      for (const key in formData) {
        if (formData[key] === '') {
          alert(`El campo ${key} no puede estar vacío`);
          return;
        }
      }
  
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };
  
      // Actualiza el Template ID con el correcto
      const serviceId = 'service_cvogllr';  // Este es tu Service ID
      const templateId = 'template_uqr3wws'; // Asegúrate de usar el Template ID correcto
      const userId = '9nP9871r_skB3APl8';  // Este es tu Public Key (User ID)
  
      // Envía el correo a través de EmailJS
      emailjs.send(serviceId, templateId, templateParams, userId)
        .then((response) => {
          console.log('Correo enviado exitosamente', response.status, response.text);
          alert('Correo enviado exitosamente');
        })
        .catch((error) => {
          console.error('Error al enviar el correo', error);
          alert('Hubo un error al enviar el correo, por favor intenta de nuevo');
        });
    };

  return (
    <div className="contactenos-container">
      <div className="header">
        <h1 className='bienvenidos'><p>Bienvenidos...</p></h1>
        <h1>¿Cómo podemos ayudarte?</h1>
      </div>

      <div className="table-container">
        <table className="contactenos-table">
          <thead>
            <tr>
              <th><h2>¿Como podemos ayudarte?</h2></th>
              <th><h2>Preguntas frecuentes</h2></th>
              <th><h2>¡Contáctenos!</h2></th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td className="service-column">
                <div id="servicio-al-cliente">
                  {/* Formulario de contacto */}
                  <form id="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Nombre:</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Ingresa tu nombre" 
                        value={formData.name} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Correo Electrónico:</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Ingresa tu correo electrónico"
                        value={formData.email} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Mensaje:</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Escribe tu mensaje"
                        value={formData.message} 
                        onChange={handleChange} 
                      />
                    </div>
                    <button type="submit" className="submit-button">Enviar</button>
                  </form>
                </div>
              </td>

              <td className="faq-column">
                {/* Preguntas Frecuentes */}
                <div id="preguntas-frecuentes">
                  <div className="accordion" id="accordionPanelsStayOpenExample">
                    {/* Repite para cada pregunta */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                          ¿Cuál es el horario de atención?
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          Nuestros horarios de atención son de lunes a viernes de 7:00 AM a 5:30 PM.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          ¿Cuáles son los benefios de ser parte de B2B?
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          Nuestros horarios de atención son de lunes a viernes de 7:00 AM a 5:30 PM.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                          ¿Un usuario que no tiene una empresa puede usar este servicio?
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          Nuestros horarios de atención son de lunes a viernes de 7:00 AM a 5:30 PM.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                          ¿Quienes pueden usar este servio?
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                        <div className="accordion-body">
                          Nuestros horarios de atención son de lunes a viernes de 7:00 AM a 5:30 PM.
                        </div>
                      </div>
                    </div>
                    {/* aqui agrego mas si quiero siguiendo el patron */}
                  </div>
                </div>
              </td>

              <td className="contact-column">
                {/* Llamar */}
                <div id="llamar">
                  <h2>Llamar</h2>
                  <p>Puedes llamarnos al siguiente número:</p>
                  <p><strong>+1 800 123 4567</strong></p>
                  <p>Horario de atención telefónica: 7:00 AM - 5:30 PM, lunes a viernes.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
        <h1>¿Dónde estamos ubicados?</h1>
              {/* Insertar el mapa aquí */}
      <div className="map-container">
        <iframe
          title="Ubicación en Google Maps"
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.040432013834!2d-84.199473!3d9.935002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0ff54cadb3cad%3A0xea26cfab491eb544!2sHub+Comunal+Santa+Ana!5e0!3m2!1ses-419!2scr!4v1698354652865!5m2!1ses-419!2scr"
        ></iframe>
      </div>
    </div>
  );
}

export default Contactenos;