function Footer({ onOpenModal }) {

  return (

    <footer className="footer">

      {/* VIDEO */}
      <video
        className="mi-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/imagenes/video.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta videos.
      </video>

      {/* SEPARACIÓN */}
      <div className="separacion"></div>

      {/* CONTENIDO FOOTER */}
      <div className="redes">

        <div className="siguenos">

          <h4>Síguenos en:</h4>

          <a href="#">
            <img src="/imagenes/ig.png" alt="Instagram" />
          </a>

          <a href="#">
            <img src="/imagenes/tiktok.png" alt="TikTok" />
          </a>

          <a href="#">
            <img src="/imagenes/face.png" alt="Facebook" />
          </a>

        </div>

        <div className="contactos">

          <h4>Contáctanos:</h4>

          <div className="info">
            <img
              src="/imagenes/icons8-whatsapp-480.png"
              alt="WhatsApp"
            />
            <h6>+591 73730201</h6>
          </div>

          <div className="info">
            <img
              src="/imagenes/pngwing.com.png"
              alt="Teléfono"
            />
            <h6>221789320</h6>
          </div>

        </div>

        <div className="ubi">

          <h4>Nos ubicamos en:</h4>

          <div className="info">

            <img
              src="/imagenes/ubi.png"
              alt="Ubicación"
            />

            <h6>
              Calle 10 Candelaria #161
              <br />
              Zona Villa Tunari El Alto
            </h6>

          </div>

        </div>

        <div className="logo">

          <h5>Registra tu experiencia en:</h5>

          <img
            src="/imagenes/Imagen_de_WhatsApp_2025-09-29_a_las_21.58.25_35a63155-removebg-preview.png"
            alt="Registrar experiencia"
            className="logo-btn"
            onClick={onOpenModal}
          />

        </div>

      </div>

    </footer>

  );

}

export default Footer;