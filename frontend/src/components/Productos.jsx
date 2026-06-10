import { useEffect, useState } from "react";
import axios from "axios";
import ModalProducto from "./ModalProducto";

function Productos() {

  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {

    axios
      .get("http://localhost:3001/productos")
      .then((res) => {
        setProductos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div id="productos" className="netflix-container">

      <h1 className="borde-texto">
        Nuestros Productos
      </h1>

      {/* 🎬 FILA NETFLIX */}
      <div className="netflix-row">

        {productos.map((producto) => (

          <div
            key={producto.id_producto}
            className="netflix-card"
          >

            {/* IMAGEN */}
            <img
              src={`/imagenes/${producto.imagen}`}
              alt={producto.nombre_producto}
            />

            <div className="netflix-info">

              <h5>{producto.nombre_producto}</h5>

              <p>Bs. {producto.precio}</p>

              <button
                className="btn btn-dark btn-sm"
                onClick={() =>
                  setProductoSeleccionado(producto)
                }
              >
                Ver más
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* 🔥 MODAL */}
      <ModalProducto
        producto={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
      />

    </div>
  );
}

export default Productos;