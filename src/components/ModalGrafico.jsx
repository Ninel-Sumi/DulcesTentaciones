import Grafico from "./Grafico";

function ModalGrafico({ isOpen, onClose }) {

  if (!isOpen) return null;

  return (

    <div
      className="modal mostrar"
      onClick={onClose}
    >

      <div
        className="modal-contenido"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "900px",
          width: "95%"
        }}
      >

        <span
          className="cerrar"
          onClick={onClose}
        >
          &times;
        </span>

        <h2
          style={{
            textAlign: "center"
          }}
        >
          📊 Estadísticas de Ventas
        </h2>

        <Grafico />

      </div>

    </div>

  );

}

export default ModalGrafico;