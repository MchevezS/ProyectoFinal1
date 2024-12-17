import { useCookies } from "react-cookie";

const CardPerfil = () => {
  const [cookie] = useCookies(["nombreUsuario",'areaUsuario','empresaId','token'])
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div
            className="card text-white shadow-lg"
            style={{
              maxWidth: "350px",
              borderRadius: "15px",
            }}
          >
            <div
              className="card-header py-2 px-3"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                background: "linear-gradient(135deg, #6b7cff, #3b4cca)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-uppercase fw-bold">Perfil</span>
                <span
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    width: "20px",
                  }}
                >
                  <i
                    className="bi bi-pencil-fill"
                    style={{ fontSize: "12px", color: "white" }}
                  ></i>
                </span>
              </div>
            </div>
    
            <div className="card-body text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="profile"
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "130px" }}
              />
              <h5 className="fw-bold mb-1">Wendy Tatiana Barrantes Romero</h5>
              <p className="mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
                {cookie.nombreUsuario}
              </p>
              <hr className="my-3 text-muted" />
            </div>
          </div>
        </div>
      );
    };
export default CardPerfil;