function ModalAvisos({ isOpen, onClose }) {
  if (!isOpen) return null; // 🔥 si está cerrado, no renderiza nada

  return (
    <div className="modal mostrar" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <span className="cerrar" onClick={onClose}>
          &times;
        </span>

        <h2>⚠️ AVISOS ⚠️</h2>

        <ul>
          <li>Se cancelan las entregas en el centro</li>
          <li>No hay galletas con chispas por 2 semanas</li>
          <li>Buscamos personal</li>
          <li>El pan está a 80 ctvs 😱</li>
        </ul>
      </div>
    </div>
  );
}

export default ModalAvisos;