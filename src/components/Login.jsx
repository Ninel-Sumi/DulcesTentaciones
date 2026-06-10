import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

  // LOGIN
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [nivelPassword, setNivelPassword] = useState("");

  // CAPTCHA
  const [num1] = useState(
    Math.floor(Math.random() * 10) + 1
  );

  const [num2] = useState(
    Math.floor(Math.random() * 10) + 1
  );

  const [captcha, setCaptcha] = useState("");
  
  // REGISTRO
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevoCorreo, setNuevoCorreo] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaA] = useState(
  Math.floor(Math.random() * 10) + 1
);

const [captchaB] = useState(
  Math.floor(Math.random() * 10) + 1
);

const [captchaRespuesta, setCaptchaRespuesta] =
  useState("");

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!usuario.trim() || !password.trim()) {
      setError("⚠️ Complete todos los campos");
      return;
    }

    if (
      parseInt(captcha) !==
      (num1 + num2)
    ) {
      setError("CAPTCHA incorrecto");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3001/login",
        {
          usuario,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify({
          id: res.data.id,
          usuario: res.data.usuario,
          rol: res.data.rol
        })
      );

      alert(res.data.mensaje);

      onLogin({
        id: res.data.id,
        usuario: res.data.usuario,
        rol: res.data.rol
      });

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.mensaje ||
        "Error al iniciar sesión"
      );

    } finally {

      setLoading(false);

    }

  };

  // REGISTRO
  const handleRegistro = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:3001/usuarios",
        {
          usuario: nuevoUsuario,
          correo: nuevoCorreo,
          password: nuevoPassword
        }
      );

      alert(res.data.mensaje);

      setNuevoUsuario("");
      setNuevoCorreo("");
      setNuevoPassword("");

      setMostrarRegistro(false);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.mensaje ||
        "Error al registrar usuario"
      );

    }

  };
    const evaluarPassword = (pass) => {

    let fuerza = 0;

    if (pass.length >= 6) fuerza++;
    if (/[a-z]/.test(pass)) fuerza++;
    if (/[A-Z]/.test(pass)) fuerza++;
    if (/[0-9]/.test(pass)) fuerza++;
    if (/[^A-Za-z0-9]/.test(pass)) fuerza++;

    if (fuerza <= 2) setNivelPassword("Débil");
    else if (fuerza <= 4) setNivelPassword("Media");
    else setNivelPassword("Fuerte");

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h2>🔐 Iniciar Sesión</h2>

        <p className="login-subtitle">
          Accede al sistema de Dulces Tentaciones 🍰
        </p>

        <form onSubmit={handleLogin}>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="mb-3">

            <label className="form-label">
              Usuario
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Ingrese su usuario"
              value={usuario}
              onChange={(e) =>
                setUsuario(e.target.value)
              }
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                evaluarPassword(value);
              }}
              required
            />
            {password && (
            <small
              style={{
                fontWeight: "bold",
                color:
                  nivelPassword === "Débil"
                    ? "red"
                    : nivelPassword === "Media"
                    ? "orange"
                    : "green"
              }}
            >
              Contraseña: {nivelPassword}
            </small>
          )}

          </div>

          {/* CAPTCHA */}

          <div className="mb-3">

            <label className="form-label">
              CAPTCHA
            </label>

            <div
              style={{
                fontWeight: "bold",
                marginBottom: "10px"
              }}
            >
              ¿Cuánto es {num1} + {num2}?
            </div>

            <input
              type="number"
              className="form-control"
              placeholder="Ingrese el resultado"
              value={captcha}
              onChange={(e) =>
                setCaptcha(e.target.value)
              }
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={loading}
          >
            {
              loading
                ? "Ingresando..."
                : "Ingresar"
            }
          </button>

        </form>

        <hr />

        <p style={{ textAlign: "center" }}>
          ¿No tienes cuenta?
        </p>

        <button
          className="btn btn-outline-primary w-100"
          onClick={() =>
            setMostrarRegistro(!mostrarRegistro)
          }
        >
          Registrarse
        </button>

        {mostrarRegistro && (

          <div style={{ marginTop: "20px" }}>

            <h4>
              👤 Registro de Usuario
            </h4>

            <form onSubmit={handleRegistro}>

              <div className="mb-3">

                <label>
                  Usuario
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={nuevoUsuario}
                  onChange={(e) =>
                    setNuevoUsuario(e.target.value)
                  }
                  required
                />

              </div>

              <div className="mb-3">

                <label>
                  Correo
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={nuevoCorreo}
                  onChange={(e) =>
                    setNuevoCorreo(e.target.value)
                  }
                  required
                />

              </div>

              <div className="mb-3">

                <label>
                  Contraseña
                </label>

                <input
                  type="password"
                  className="form-control"
                  value={nuevoPassword}
                  onChange={(e) =>
                    setNuevoPassword(e.target.value)
                  }
                  required
                />

              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Crear Cuenta
              </button>

            </form>

          </div>

        )}

      </div>

    </div>

  );

}

export default Login;