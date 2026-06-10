function ModalProducto({ producto, onClose }) {

  if (!producto) return null;

  return (

    <div
      className="modal mostrar"
      onClick={onClose}
    >

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

        <h2>{producto.nombre}</h2>

        <img
          src={`/imagenes/${producto.imagen}`}
          alt={producto.nombre}
          style={{
            width: "100%",
            borderRadius: "10px"
          }}
        />

        <p>{producto.descripcion}</p>

        <h4>
          Precio: Bs. {producto.precio}
        </h4>

      </div>

    </div>

  );
}

export default ModalProducto;