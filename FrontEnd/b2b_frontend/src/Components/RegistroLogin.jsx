import { useState } from 'react';
import { mostrarAlerta } from './MostrarAlerta';
import { loginPost, subirImagenPerfil } from '../Services/Crud';
import { useNavigate } from 'react-router-dom';
import '../Style/RegistroLogin.css'; 
import NavbarNuevo from './NavbarNuevo';
import { useCookies } from 'react-cookie';
import LoadingSpinner from "../Components/LoadingSpinner.jsx"


//Usamos las cookies para guardar la infomcion del usuario que inicia sesion.
//estado para cambio login-registrarse.
function RegistroLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el loading
  const [cookie, setCookie] = useCookies(["usuarioID", "nombreUsuario", "rolUsuario", 'areaUsuario', 'token', 'empresaId','foto']);
  const token = cookie.token;
  const navigate = useNavigate();


  // Estados de los formularios
  const [nombreUsuarioL, setNombreUsuarioL] = useState('');
  const [passwordL, setPasswordL] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [cedulaIndentidad, setCedulaIndentidad] = useState('');
  const [emailRegistro, setEmailRegistro] = useState('');
  const [claveRegistro, setClaveRegistro] = useState('');
  const [imagen, setImagen] = useState(null);
  const [foto, setFoto]= useState("")
  const espaciosVacios = () => {
    if (nombreUsuarioL.trim() === "" || passwordL.trim() === "") {
      mostrarAlerta("error", "Llenar espacios vacíos");
      return false;
    }
    return true;
  };

  const longitudPassword = (password) => {
    if (password.length < 4) {
      mostrarAlerta("error", "La contraseña debe tener al menos 4 caracteres");
      return false;
    }
    return true;
  };

  const subirImagen = async (e) => {
    try {
      if (imagen) {
        const peticion = await subirImagenPerfil(imagen, 'upload-image');
        setFoto(peticion.url)
        return peticion.url
      }
    } catch (e){
      console.error(e);
    }
  };

  const inicioSesion = async (e) => {
    e.preventDefault();
    const datosLogin = { 
      username: nombreUsuarioL.trim(),
      password: passwordL.trim(),
    };

    setNombreUsuarioL(datosLogin.username);
    setPasswordL(datosLogin.password);

    if (!espaciosVacios()) return;
    if (!longitudPassword(passwordL)) return;

    setIsLoading(true); // Activar el spinner al iniciar la solicitud

    try {
      const admin = await loginPost(datosLogin,"loginAdmin/");
      if(admin.success && admin.super){
        setCookie("rolUsuario", admin.rol);
        setCookie("token", admin.token);
        
        navigate ("/administrador")
        return

      }

      const response = await loginPost(datosLogin, "login-usuario/");


      if (response.success) {
        // mostrarAlerta("success", "Te has logueado de manera exitosa");
        setCookie("usuarioID", response.id);
        setCookie("nombreUsuario", response.nombre);
        setCookie("rolUsuario", response.rol);
        setCookie("areaUsuario", response.area);
        setCookie("empresaId", response.id_empresa);
        setCookie("token", response.token_acceso);
        setCookie("foto",response.imagen)
        localStorage.setItem("rol",response.rol)
        setTimeout(() => {
          setNombreUsuarioL('');
          setPasswordL('');
         

          if (cookie.rolUsuario === "usuario" || response.rol == 'usuario' || localStorage.getItem("rol") == "usuario") {
            navigate("/empresas");
          }

          if (cookie.rolUsuario == "propietario" || response.rol == 'propietario' || localStorage.getItem("rol") == "propietario") {
            navigate("/dashboard");
          }

          if (cookie.rolUsuario == "trabajador" || response.rol == 'trabajador' ||localStorage.getItem("rol") == "trabajador") {
            localStorage.clear();
            navigate("/verEncuestas");
          }

          if (cookie.rolUsuario === "recursos_humanos" || response.rol === 'recursos_humanos' ||localStorage.getItem("rol") === "recursos_humanos") {
            localStorage.clear();
            navigate("/CrearEncuestas");
          }
        }, 1000);
      } else {
        mostrarAlerta("error", 'Creedenciales incorrectas');
      }
    } catch (error) {
      mostrarAlerta("error", "Creedenciales incorrectas.");
      console.error(error);
    } finally {
      setIsLoading(false); // Desactivar el spinner después de la solicitud
    }
  };

  const validarCedulaTica = (cedula) => {
    cedula = cedula.replace(/[^0-9]/g, "");
    if (cedula.length === 9 && !isNaN(cedula)) {
      return true;
    } else {
      mostrarAlerta("error", "La cédula no es válida");
      return false;
    }
  };

  const validarFormRegister = () => {
    if (nombreUsuario.trim() === "" || cedulaIndentidad.trim() === "" || emailRegistro.trim() === "" || claveRegistro.trim() === "") {
      mostrarAlerta("error", "Por favor, llena todos los campos.");
      return;
    }
    if (!validarCedulaTica(cedulaIndentidad)) return;
    registroUsuario();
  };

  const registroUsuario = async () => {
    const dataRegister = { 
      username: nombreUsuario.trim(), 
      cedula: cedulaIndentidad.trim(), 
      email: emailRegistro.trim(), 
      password: claveRegistro.trim(),
      imagen_perfil: null // Inicialmente se envía sin imagen
    };
  
    setNombreUsuario(dataRegister.username);
    setCedulaIndentidad(dataRegister.cedula);
    setEmailRegistro(dataRegister.email);
    setClaveRegistro(dataRegister.password);
  
    setIsLoading(true); // Activar el spinner al iniciar la solicitud
  
    try {
      const response = await loginPost(dataRegister, "crear-usuario/"); // Conexión a backend
  
      if (response && response.success) {
        // Subir la imagen si fue seleccionada
        if (imagen) {
          try {
            const peticion = await subirImagenPerfil(imagen, 'upload-image');
            const imagenUrl = peticion.url;
  
            // Actualizar el perfil del usuario con la URL de la imagen
            await loginPost({ imagen_perfil: imagenUrl }, `actualizar-imagen-usuario/${response.id}`);
          } catch (error) {
            console.error("Error al subir la imagen:", error);
          }
        }
  
        setActiveTab('login'); // Cambiar a la pestaña de login
      } else {
        mostrarAlerta("error", response.error);
      }
    } catch (error) {
      mostrarAlerta("error", "Hubo un error al registrar al usuario. Intenta nuevamente.");
      console.error(error);
    } finally {
      setIsLoading(false); // Desactivar el spinner después de la solicitud
    }
  };
  

  return (
    <>
      <NavbarNuevo />
      <div className="modal-overlay1 ">
        <div className="modal-conten1t" style={{border: "2px solid #cccc", padding: "2em", borderRadius: "15px"}}>
          <h2 className="card-title1">Bienvenidos</h2>
          <p className="card-subtitle1">Inicia sesión o regístrate para disfrutar de nuestro servicio</p>
          <ul className="nav nav-tabs1">
            <li className="nav-item1">
              <button
                className={`nav-link ${activeTab === 'login' ? 'btn-login' : 'btn-login-f'}`}
                onClick={() => setActiveTab('login')}
              >
                Iniciar Sesión
              </button>
            </li>
            <li className="nav-item1">
              <button
                className={`nav-link ${activeTab === 'register' ? 'btn-login' : 'btn-login-f'}`}
                onClick={() => setActiveTab('register')}
                style={{backgroundColor: "#5c3ac0", color: "white"}}
              >
                Registrarse
              </button>
            </li>
          </ul>
          {activeTab === 'login' && (
            <form onSubmit={inicioSesion}>
              <div className="form-group1">
                <label htmlFor="loginEmail1">Nombre de Usuario</label>
                <input
                  type="text"
                  className="form-control1"
                  id="loginEmail"
                  placeholder="Nombre de Usuario"
                  value={nombreUsuarioL}
                  onChange={(e) => setNombreUsuarioL(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Contraseña</label>
                <input
                  type="password"
                  className="form-control1"
                  id="loginPassword"
                  placeholder="Contraseña"
                  value={passwordL}
                  onChange={(e) => setPasswordL(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary1" disabled={isLoading} style={{backgroundColor: "#dd1a57"}}>
                {isLoading ? (
                  <LoadingSpinner /> // Aquí insertamos el componente de LoadingSpinner
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>
          )}
          {activeTab === 'register' && (
            <form onSubmit={(e) => { e.preventDefault(); validarFormRegister(); }}>
              <div className="form-group1">
                <label htmlFor="registerNombre">Nombre Completo</label>
                <input
                  type="text"
                  placeholder='Nombre Completo'
                  className="form-control1"
                  id="registerNombre"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                />
              </div>
              <div className="form-group1">
                <label htmlFor="registerCedula">Cédula de Identidad</label>
                <input
                  type="text"
                  placeholder='Cédula de Identidad'
                  className="form-control1"
                  id="registerCedula"
                  value={cedulaIndentidad}
                  onChange={(e) => setCedulaIndentidad(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder='Correo Electrónico'
                  className="form-control1"
                  id="registerEmail"
                  value={emailRegistro}
                  onChange={(e) => setEmailRegistro(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail1">Imagen de perfil</label>
                <input
                  type="file"
                  placeholder='imagen'
                  className="form-control1"
                  id="registerEmail"
                  onChange={(e) => setImagen(e.target.files[0])}
                />
              </div>
              <div className="form-group1">
                <label htmlFor="registerPassword">Contraseña</label>
                <input
                  type="password"
                  placeholder='Contraseña'
                  className="form-control1"
                  id="registerPassword"
                  value={claveRegistro}
                  onChange={(e) => setClaveRegistro(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success1" disabled={isLoading} style={{backgroundColor: "#dd1a57"}}>
                {isLoading ? (
                  <LoadingSpinner /> // Aquí insertamos el componente de LoadingSpinner
                ) : (
                  'Registrarse'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default RegistroLogin;
