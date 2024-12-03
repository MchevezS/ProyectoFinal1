import { useState } from 'react';
import emailjs from 'emailjs-com';
import '../Style/FormularioEmailJS.css';

function FormularioEmailJS() {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clave: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    to_name: ''
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
      to_name: formData.to_name,
      from_email: formData.email,
      from_clave: formData.clave,
      phone: formData.phone,
      company: formData.company,
      subject: formData.subject,
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
    <div className="contacto-form">
    <h2 className="contactos">Credenciales para registrarse</h2>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />

        <label>
          Clave:
          <input
            type="clave"
            name="clave"
            value={formData.clave}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />

        <label>
          Teléfono:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />

        <label>
          Empresa:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />

        <label>
          Asunto:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />

        <label>
          Mensaje:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="textarea-field"
          />
        </label>
        <br />

        <label>
          Destinatario (Nombre):
          <input
            type="text"
            name="to_name"
            value={formData.to_name}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />

        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </div>
  </div>
  );
}

export default FormularioEmailJS;
