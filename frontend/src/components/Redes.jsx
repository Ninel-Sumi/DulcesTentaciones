import { useState } from "react";

function Redes() {

  const [modal, setModal] = useState(false);

  return (

    <div className="redes">

      {/* SIGUENOS */}
      <div className="siguenos">
        <h4>Síguenos en:</h4>

        <a href="#"><img src="/imagenes/ig.png" alt="Instagram" /></a>
        <a href="#"><img src="/imagenes/tiktok.png" alt="TikTok" /></a>
        <a href="#"><img src="/imagenes/face.png" alt="Facebook" /></a>

      </div>

      {/* CONTACTOS */}
      <div className="contactos">

        <h4>Contáctanos:</h4>

        <div className="info">
          <img src="/imagenes/icons8-whatsapp-480.png" alt="WhatsApp" />
          <h6>+591 73730201</h6>
        </div>

        <div className="info">
          <img src="/imagenes/pngwing.com.png" alt="Teléfono" />
          <h6>221789320</h6>
        </div>

      </div>

      {/* UBICACIÓN */}
      <div className="ubi">

        <h4>Nos ubicamos en:</h4>

        <div className="info">
          <img src="/imagenes/ubi.png" alt="Ubicación" />
          <h6>
            Calle 10 Candelaria #161 <br />
            Zona Vila Tunari El Alto
          </h6>
        </div>

      </div>

      {/* EXPERIENCIA */}
      <div className="logo">

        <h5>Registra tu experiencia:</h5>

        <img
          src="/imagenes/logo.png"
          alt="logo"
          onClick={() => setModal(true)}
          style={{ cursor: "pointer" }}
        />

      </div>

      {/* MODAL */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>

          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >

            <span
              className="cerrar"
              onClick={() => setModal(false)}
            >
              ×
            </span>

            <h4>Registra tu experiencia</h4>

            <div className="mb-3">
              <label>Ingrese su nombre completo</label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label>¿Cómo fue su experiencia?</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>

            <button className="btn btn-danger">
              Enviar
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Redes;