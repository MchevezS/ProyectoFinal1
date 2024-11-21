import { useState } from 'react';
import { mostrarAlerta } from './MostrarAlerta';
import { post } from '../Services/Crud';
import { useNavigate } from 'react-router-dom';
import '../Style/RegistroLogin.css'; // Importar el archivo de estilos CSS

function RegistroLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Estados de los formularios
  const [nombreUsuarioL, setNombreUsuarioL] = useState('');
  const [passwordL, setPasswordL] = useState('');

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [cedulaIndentidad, setCedulaIndentidad] = useState('');
  const [emailRegistro, setEmailRegistro] = useState('');
  const [claveRegistro, setClaveRegistro] = useState('');

  // Validaciones
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

  const inicioSesion = async (e) => {
    e.preventDefault();
    const datosLogin = { username: nombreUsuarioL, password: passwordL };
    if (!espaciosVacios()) return;
    if (!longitudPassword(passwordL)) return;

    try {
      const response = await post( datosLogin,"login-usuario");
      if (response.success) {
        mostrarAlerta("success", "Te has logueado de manera exitosa");
        setTimeout(() => {
            navigate("/");
            setNombreUsuarioL('');
            setPasswordL('');
        }, 1000);
      } else {
        mostrarAlerta("error", 'No se ha encontrado un usuario con ese nombre de usuario');
      }
    } catch (error) {
      mostrarAlerta("error", "Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo más tarde.");
    }
  };

  const validarCedulaTica = (cedula) => {
    cedula = cedula.replace(/[^0-9]/g, "");
    if (cedula.length === 9 && !isNaN(cedula)) {
      mostrarAlerta("success", "Cédula ingresada correctamente");
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
    const dataRegister = { username: nombreUsuario, cedula: cedulaIndentidad, email: emailRegistro, password: claveRegistro };

    try {
      const response = await post(dataRegister, "crear-usuario");
      if (response && response.success) {
        mostrarAlerta("success", "Usuario registrado exitosamente");
        setActiveTab('login');
      } else {
        mostrarAlerta("error", "Hubo un problema al registrar al usuario");
      }
    } catch (error) {
      mostrarAlerta("error", "Hubo un error al registrar al usuario. Intenta nuevamente.");
    }
  };

 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="card-title"> Bienvenidos</h2>
        <p className="card-subtitle">Inicia sesión o regístrate para disfrutar de nuestro servicio</p>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Iniciar Sesión
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Registrarse
            </button>
          </li>
        </ul>
        {activeTab === 'login' && (
          <form onSubmit={inicioSesion}>
            <div className="form-group">
              <label htmlFor="loginEmail">Nombre de Usuario</label>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
                id="loginPassword"
                placeholder="••••••••"
                value={passwordL}
                onChange={(e) => setPasswordL(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Cargando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        )}
        {activeTab === 'register' && (
          <form onSubmit={(e) => { e.preventDefault(); validarFormRegister(); }}>
            <div className="form-group">
              <label htmlFor="registerNombre">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="registerNombre"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerCedula">Cédula de Identidad</label>
              <input
                type="text"
                className="form-control"
                id="registerCedula"
                value={cedulaIndentidad}
                onChange={(e) => setCedulaIndentidad(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerEmail">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="registerEmail"
                value={emailRegistro}
                onChange={(e) => setEmailRegistro(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="registerPassword"
                value={claveRegistro}
                onChange={(e) => setClaveRegistro(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Cargando...
                </>
              ) : (
                'Registrarse'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegistroLogin;

