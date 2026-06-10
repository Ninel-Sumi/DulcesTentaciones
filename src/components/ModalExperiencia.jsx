import { useState } from "react";
import axios from "axios";

function ModalExperiencia({ isOpen, onClose }) {

  const [form, setForm] = useState({
    nombre: "",
    comentario: "",
    estrellas: 5,
    imagen: "cinco.jpg"
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const enviar = () => {

    let imagen = "cinco.jpg";

    if (form.estrellas == 4) imagen = "cuatro.jpg";
    if (form.estrellas == 3) imagen = "tres.jpg";
    if (form.estrellas == 2) imagen = "dos.jpg";
    if (form.estrellas == 1) imagen = "uno.jpg";

    axios.post(
      "http://localhost:3001/referencias",
      {
        ...form,
        imagen
      }
    )
    .then(() => {

      alert("Experiencia registrada correctamente");

      onClose();

      window.location.reload();

    })
    .catch((err) => {
      console.log(err);
      alert("Error al guardar");
    });

  };

  return (

    <div className="overlay">

      <div className="modal-experiencia-contenido">

        <span
          className="cerrar-experiencia"
          onClick={onClose}
        >
          ×
        </span>

        <h3>Registrar experiencia</h3>

        <div className="mb-3">

          <label className="form-label">
            Ingrese su nombre completo
          </label>

          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            ¿Cómo fue su experiencia con Dulces Tentaciones?
          </label>

          <textarea
            className="form-control"
            rows="4"
            name="comentario"
            value={form.comentario}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Calificación
          </label>

          <select
            className="form-control"
            name="estrellas"
            value={form.estrellas}
            onChange={handleChange}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

        </div>

        <button
          className="btn btn-danger"
          onClick={enviar}
        >
          Enviar
        </button>

      </div>

    </div>

  );

}

export default ModalExperiencia;