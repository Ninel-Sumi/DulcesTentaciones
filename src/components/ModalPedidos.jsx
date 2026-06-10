import { useState, useEffect } from "react";
import axios from "axios";

function ModalPedidos({ isOpen, onClose }) {

  const [productos, setProductos] = useState([]);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");

  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const [paquete, setPaquete] = useState("");

  const [comprobante, setComprobante] = useState(null);

  useEffect(() => {

    if (!isOpen) return;

    axios
      .get("http://localhost:3001/productos")
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!producto && !paquete) {
      alert("Debe seleccionar un producto o un paquete.");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("nombre", nombre);
      formData.append("email", email);
      formData.append("celular", celular);
      formData.append("producto", producto);
      formData.append("cantidad", cantidad);
      formData.append("paquete", paquete);

      if (comprobante) {
        formData.append("comprobante", comprobante);
      }

      const res = await axios.post(
        "http://localhost:3001/pedidos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(res.data.mensaje);

      setNombre("");
      setEmail("");
      setCelular("");
      setProducto("");
      setCantidad(1);
      setPaquete("");
      setComprobante(null);

      onClose();

    } catch (error) {

      console.log(error);

      alert("Error al registrar pedido");

    }

  };

  return (

    <div
      className="modal mostrar"
      onClick={onClose}
    >

      <div
        className="modal-contenido"
        onClick={(e) => e.stopPropagation()}
      >

        <span
          className="cerrar"
          onClick={onClose}
        >
          &times;
        </span>

        <div className="formulario">

          <div className="qr">
            <img
              src="/imagenes/qr.jpg"
              alt="QR"
            />
            <h6>Pague aquí</h6>
          </div>

          <h3>🍰 Registrar Pedido</h3>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Nombre completo
              </label>

              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Correo electrónico
              </label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@gmail.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Número de celular
              </label>

              <input
                type="text"
                className="form-control"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>

            <hr />

            <h5>🍩 Seleccione un producto</h5>

            <div className="mb-3">

              <select
                className="form-select"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
              >

                <option value="">
                  Seleccione un producto
                </option>

                {productos.map((item) => (

                  <option
                    key={item.id_producto}
                    value={item.nombre}
                  >
                    🧁 {item.nombre} - Bs. {item.precio}
                  </option>

                ))}

              </select>

            </div>

            <div className="mb-3">

              <label className="form-label">
                Cantidad
              </label>

              <input
                type="number"
                className="form-control"
                min="1"
                max="100"
                value={cantidad}
                onChange={(e) =>
                  setCantidad(parseInt(e.target.value))
                }
              />

            </div>

            <hr />

            <h5>🎁 O seleccione un paquete</h5>

            <div className="mb-3">

              <select
                className="form-select"
                value={paquete}
                onChange={(e) => setPaquete(e.target.value)}
              >

                <option value="">
                  Seleccione un paquete
                </option>

                <option value="Boda">
                  💍 Boda
                </option>

                <option value="Cumpleaños">
                  🎂 Cumpleaños
                </option>

                <option value="Bautizo">
                  👶 Bautizo
                </option>

                <option value="15 años">
                  👑 15 años
                </option>

                <option value="Graduación">
                  🎓 Graduación
                </option>

                <option value="Baby Shower">
                  🍼 Baby Shower
                </option>

              </select>

            </div>

            <hr />

            <h6>
              Adjunte su comprobante de pago
              (40% de adelanto)
            </h6>

            <div className="mb-3">

              <input
                type="file"
                className="form-control"
                accept="image/*"
                required
                onChange={(e) =>
                  setComprobante(e.target.files[0])
                }
              />

            </div>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >

              <button
                type="submit"
                className="btn btn-danger"
              >
                Enviar Pedido
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default ModalPedidos;