function ModalPaquetes({ paquete, onClose }) {

  if (!paquete) return null;

  return (

    <div className="modal mostrar" onClick={onClose}>

      <div
        className="modal-contenido"
        onClick={(e) => e.stopPropagation()}
      >

        {/* BOTÓN CERRAR */}
        <span
          className="cerrar"
          onClick={onClose}
        >
          ×
        </span>

        {/* NOMBRE MYSQL */}
        <h2>{paquete.nombre_paquete}</h2>

        {/* IMAGEN */}
        <img
          src={`/imagenes/${paquete.imagen}`}
          alt={paquete.nombre_paquete}
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "10px"
          }}
        />

        {/* DESCRIPCIÓN MYSQL */}
        <p>{paquete.descripcion}</p>

        {/* PRECIO */}
        <h3>Bs. {paquete.precio}</h3>

      </div>

    </div>

  );
}

export default ModalPaquetes;