import { useEffect, useState } from "react";
import axios from "axios";

function Referencias({ open, onClose }) {

  const [referencias, setReferencias] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/referencias")
      .then((res) => setReferencias(res.data))
      .catch((err) => console.log(err));

  }, []);

  if (!open) return null;

  return (

    <div className="overlay" onClick={onClose}>

      <div
        className="referencias-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <span className="cerrar-modal" onClick={onClose}>×</span>

        <h2>Referencias</h2>

        <div className="referencias-scroll">

          {referencias.map((ref) => (

            <div key={ref.id_referencia} className="ref-item">

              {ref.imagen && (
                <img
                  src={`/imagenes/${ref.imagen}`}
                  className="ref-img"
                />
              )}

              <div>

                <h5>{ref.nombre}</h5>

                <p>{ref.comentario}</p>

                <p>⭐ {ref.estrellas}/5</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Referencias;