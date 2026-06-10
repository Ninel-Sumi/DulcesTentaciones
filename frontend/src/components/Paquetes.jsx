import { useEffect, useState } from "react";
import axios from "axios";
import ModalPaquetes from "./ModalPaquetes";

function Paquetes() {

  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/paquetes")
      .then((res) => {
        setPaquetes(res.data);
      })
      .catch((err) => {
        console.log("Error al cargar paquetes:", err);
      });

  }, []);

  return (

    <div id="paquetes">

      <h1 className="borde-texto text-center mb-4">
        Paquetes disponibles
      </h1>

      <div className="row justify-content-center">

        {paquetes.map((paquete) => (

          <div
            key={paquete.id_paquete}
            className="col-md-4 mb-4 d-flex justify-content-center"
          >

            <div className="card" style={{ width: "18rem" }}>

              <img
                src={`/imagenes/${paquete.imagen}`}
                className="card-img-top"
                alt={paquete.nombre_paquete}
              />

              <div className="card-body text-center">

                <h5>
                  {paquete.nombre_paquete}
                </h5>

                <p>
                  Bs. {paquete.precio}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => setPaqueteSeleccionado(paquete)}
                >
                  Ver más
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      <ModalPaquetes
        paquete={paqueteSeleccionado}
        onClose={() => setPaqueteSeleccionado(null)}
      />

    </div>

  );
}

export default Paquetes;