import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Grafico() {

  const [datos, setDatos] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3001/estadisticas-productos")
      .then((res) => {
        setDatos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const data = {
    labels: datos.map(item => item.producto),
    datasets: [
      {
        label: "Cantidad Vendida",
        data: datos.map(item => item.total)
      }
    ]
  };

  return (

    <div
      style={{
        width: "80%",
        margin: "50px auto"
      }}
    >

      <h2>
        📊 Productos Más Pedidos
      </h2>

      <Bar data={data} />

    </div>

  );

}

export default Grafico;