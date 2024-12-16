import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
const Footer = ({}) => {
  return (
    <>
      <footer
        className="footer"
        style={{
          marginTop: "150px",
          padding: "20px 0",
        }}
      >
        <>
          {/* Footer */}
          <footer className="text-center text-lg-start bg-body-tertiary text-muted">
            {/* Section: Social media */}
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              {/* Left */}
              <div className="me-5 d-none d-lg-block">
                <span>Obten contenido en nuestras redes sociales:</span>
              </div>
              {/* Left */}
              {/* Right */}
              <div>
                <a href="" className="me-4 text-reset">
                <FaFacebook />
                </a>
                <a href="" className="me-4 text-reset">
                <FaXTwitter />
                </a>
                <a href="" className="me-4 text-reset">
                <FaInstagram />
                </a>
                <a href="" className="me-4 text-reset">
                <FaLinkedinIn />
                </a>
                <a href="" className="me-4 text-reset">
                <FaGithub />
                </a>
              </div>
            </section>
            <section className="">
              <div className="container text-center text-md-start mt-5">
                <div className="row mt-3">
                  <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      <i className="fas fa-gem me-3" />
                      B2B
                    </h6>
                    <div className="d-flex flex-column gap-3">
                  <img src="https://www.betterup.com/hubfs/Core%20Redesign/footer/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width="120" height="40" loading="lazy"/>
                  <img src="https://www.betterup.com/hubfs/Core%20Redesign/footer/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" alt="Download on the App Store" width="120" height="40" loading="lazy"/>
                  </div>
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold mb-4">¿Qué ofrecemos?</h6>
                    <p>
                      <a  className="text-reset">
                        Confidencialidad
                      </a>
                    </p>
                    <p>
                      <a className="text-reset">
                        Confiabilidad
                      </a>
                    </p>
                    <p>
                      <a  className="text-reset">
                        Organización
                      </a>
                    </p>
                    <p>
                      <a className="text-reset">
                        Ayuda y soporte
                      </a>
                    </p>
                  </div>

                  <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <h6 className="text-uppercase fw-bold mb-4">
                      Organización
                    </h6>
                    <p>
                      <a  className="text-reset">
                        Configuración de cookies
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Preferencias de cookies
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Ajustes de publicidad
                      </a>
                    </p>
                    <p>
                      <a href="#!" className="text-reset">
                        Ayuda
                      </a>
                    </p>
                  </div>
                  <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    {/* Links */}
                    <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
                    <p>
                    <FaLocationDot />
                    New York, NY 10012, US
                    </p>
                    <p>
                    <MdEmail />
                      b2b@gmail.com
                    </p>
                    <p>
                    <FaPhoneAlt />
                    40804000
                    </p>
                  </div>
                  {/* Grid column */}
                </div>
                {/* Grid row */}
              </div>
            </section>
            {/* Section: Links  */}
            {/* Copyright */}
            <div
              className="text-center p-4"
              style={{ backgroundColor: "#000",color: "white" }}
            >
              © 2024 B2B Todos los derechos reservados
            </div>
          </footer>
        </>
      </footer>
    </>
  );
};
export default Footer;
