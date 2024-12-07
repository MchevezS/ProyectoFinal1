import { useState } from "react";
const CambioCredencialesUsuario = ({})=>{
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar los datos
        console.log("Datos del formulario:", formData);
      };
    
      return (
        <>
            <div className='d-flex flex-column gap-3'>
            <label className='mt-3'>Cambio de credenciales</label>
            <input placeholder={"Contraseña actual"}/>
            <input placeholder={"Nueva contraseña"}/>
            <input placeholder={"Confirmar nueva contraseña"}/>
            <button className='btn btn-primary'>Confirmar cambio</button>
            </div>
        </>
      );
    };
export default CambioCredencialesUsuario;