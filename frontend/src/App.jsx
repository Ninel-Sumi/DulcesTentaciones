import { useState, useEffect } from "react";

import "./App.css";

import Login from "./components/Login";

import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Inicio from "./components/Inicio";
import Productos from "./components/Productos";
import Paquetes from "./components/Paquetes";
import Footer from "./components/Footer";

import Referencias from "./components/Referencias";
import ModalExperiencia from "./components/ModalExperiencia";
import ModalAvisos from "./components/ModalAvisos";
import ModalPedidos from "./components/ModalPedidos";
import ModalGrafico from "./components/ModalGrafico";

function App() {

  const [usuario, setUsuario] = useState(null);

  const [avisosOpen, setAvisosOpen] = useState(false);
  const [pedidosOpen, setPedidosOpen] = useState(false);
  const [referenciasOpen, setReferenciasOpen] = useState(false);
  const [experienciaOpen, setExperienciaOpen] = useState(false);
  const [graficoOpen, setGraficoOpen] = useState(false);

  useEffect(() => {

    const usuarioGuardado =
      localStorage.getItem("usuario");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }

  }, []);

  const cerrarSesion = () => {

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    setUsuario(null);

  };

  if (!usuario) {
    return (
      <Login
        onLogin={(datosUsuario) =>
          setUsuario(datosUsuario)
        }
      />
    );
  }

  return (

    <div
      style={{
        background: "#FFF0F5",
        minHeight: "100vh"
      }}
    >

      {/* DATOS DEL USUARIO */}
      <div
        style={{
          textAlign: "right",
          padding: "12px 20px",
          background: "#FADADD",
          borderBottom: "2px solid #F4B6C2",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}
      >

        <span
          style={{
            fontWeight: "bold",
            color: "#5C374C"
          }}
        >
          👤 {usuario.usuario} ({usuario.rol})
        </span>

        <button
          onClick={cerrarSesion}
          style={{
            marginLeft: "15px",
            background: "#E89CA9",
            border: "none",
            color: "white",
            padding: "8px 15px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Cerrar sesión
        </button>

      </div>

      {/* NAVBAR */}
      <Navbar
        onOpenAvisos={() => setAvisosOpen(true)}
        onOpenPedidos={() => setPedidosOpen(true)}
        onOpenReferencias={() => setReferenciasOpen(true)}
      />

      {/* CONTENIDO */}
      <Banner />

      <Inicio />

      <Productos />

      <Paquetes />

            {/* BOTONES PDF Y GRÁFICO SOLO PARA ADMIN */}
      {
        usuario.rol === "admin" && (

          <div
            style={{
              textAlign: "center",
              margin: "40px auto",
              background: "#FADADD",
              padding: "25px",
              borderRadius: "15px",
              width: "90%",
              maxWidth: "700px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          >

            <h3
              style={{
                color: "#B56576",
                marginBottom: "20px"
              }}
            >
            </h3>

            <button
              onClick={() => setGraficoOpen(true)}
              style={{
                background: "#F8BBD0",
                border: "none",
                color: "#5C374C",
                padding: "12px 20px",
                borderRadius: "10px",
                fontWeight: "bold",
                marginRight: "10px",
                cursor: "pointer"
              }}
            >
              📊 Ver Gráfico Estadístico
            </button>

            <a
              href="http://localhost:3001/reporte-pedidos"
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{
                  background: "#F4C2C2",
                  border: "none",
                  color: "#5C374C",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                📄 Generar Reporte PDF
              </button>
            </a>

          </div>

        )
      }

      {/* FOOTER */}
      <Footer
        onOpenModal={() => setExperienciaOpen(true)}
      />

      {/* MODALES */}
      <ModalExperiencia
        isOpen={experienciaOpen}
        onClose={() => setExperienciaOpen(false)}
      />

      <ModalAvisos
        isOpen={avisosOpen}
        onClose={() => setAvisosOpen(false)}
      />

      <ModalPedidos
        isOpen={pedidosOpen}
        onClose={() => setPedidosOpen(false)}
      />

      <Referencias
        open={referenciasOpen}
        onClose={() => setReferenciasOpen(false)}
      />

      <ModalGrafico
        isOpen={graficoOpen}
        onClose={() => setGraficoOpen(false)}
      />

    </div>

  );

}

export default App;