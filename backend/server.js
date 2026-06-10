const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const SECRET = "mi_clave_secreta";
const PDFDocument = require("pdfkit");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// 🔥 CONFIGURACIÓN MULTER
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  }

});

const upload = multer({ storage });

// 🔥 CONEXIÓN MYSQL
const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dulces_tentaciones"
});

conexion.connect(() => {
  console.log("MySQL conectado 😎");
});

// 🔥 FUNCIÓN NIVEL PASSWORD
function nivelPassword(password) {

  const tieneMayus = /[A-Z]/.test(password);
  const tieneMinus = /[a-z]/.test(password);
  const tieneNumero = /[0-9]/.test(password);
  const tieneSimbolo = /[^A-Za-z0-9]/.test(password);

  if (password.length < 6) return "baja";

  if (
    password.length >= 6 &&
    (tieneNumero && (tieneMinus || tieneMayus))
  ) {

    if (
      password.length >= 8 &&
      tieneMayus &&
      tieneMinus &&
      tieneNumero &&
      tieneSimbolo
    ) {
      return "fuerte";
    }

    return "media";
  }

  return "baja";
}

// 🔥 RUTA PRINCIPAL
app.get("/", (req, res) => {
  res.send("Servidor funcionando 😎");
});

// 🔥 PRODUCTOS
app.get("/productos", (req, res) => {

  const sql =
    "SELECT * FROM productos WHERE estado = 1";

  conexion.query(sql, (err, resultados) => {

    if (err) {
      return res
        .status(500)
        .json({ mensaje: "Error en productos" });
    }

    res.json(resultados);

  });

});
app.post("/productos", (req, res) => {

  const {
    nombre,
    descripcion,
    precio,
    imagen
  } = req.body;

  const sql = `
    INSERT INTO productos
    (
      nombre,
      descripcion,
      precio,
      imagen,
      estado
    )
    VALUES (?, ?, ?, ?, 1)
  `;

  conexion.query(
    sql,
    [
      nombre,
      descripcion,
      precio,
      imagen
    ],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          mensaje: "Error al crear producto"
        });
      }

      res.json({
        mensaje: "Producto creado correctamente"
      });

    }
  );

});
app.put("/productos/:id", (req, res) => {

  const { id } = req.params;

  const {
    nombre,
    descripcion,
    precio,
    imagen
  } = req.body;

  const sql = `
    UPDATE productos
    SET
      nombre = ?,
      descripcion = ?,
      precio = ?,
      imagen = ?
    WHERE id = ?
  `;

  conexion.query(
    sql,
    [
      nombre,
      descripcion,
      precio,
      imagen,
      id
    ],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          mensaje: "Error al actualizar producto"
        });
      }

      res.json({
        mensaje: "Producto actualizado correctamente"
      });

    }
  );

});
app.delete("/productos/:id", (req, res) => {

  const { id } = req.params;

  const sql = `
    UPDATE productos
    SET estado = 0
    WHERE id = ?
  `;

  conexion.query(
    sql,
    [id],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          mensaje: "Error al eliminar producto"
        });
      }

      res.json({
        mensaje: "Producto eliminado correctamente"
      });

    }
  );

});

// 🔥 USUARIOS
app.post("/usuarios", async (req, res) => {

  const { usuario, correo, password } = req.body;

  if (!usuario || !correo || !password) {
    return res.status(400).json({
      mensaje: "Faltan datos"
    });
  }

  const nivel = nivelPassword(password);
  const hash = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO usuarios
    (usuario, correo, password_hash, rol, estado)
    VALUES (?, ?, ?, 'usuario', 1)
  `;

  conexion.query(sql,
    [usuario, correo, hash],
    (err) => {

      if (err) {
        console.log("ERROR MYSQL:", err);

        return res.status(500).json({
          mensaje: "Error al guardar usuario",
          error: err.sqlMessage
        });
      }

      res.json({
        mensaje: "Usuario registrado correctamente 😎",
        nivel_password: nivel
      });

    }
  );
});
app.get("/usuarios", (req, res) => {
  const sql = `
    SELECT
      id,
      usuario,
      correo,
      rol,
      estado,
      fecha_creacion
    FROM usuarios
    WHERE estado = 1
  `;
  conexion.query(sql, (err, resultados) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        mensaje: "Error al obtener usuarios"
      });
    }
    res.json(resultados);
  });
});
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT
      id,
      usuario,
      correo,
      rol,
      estado,
      fecha_creacion
    FROM usuarios
    WHERE id = ?
  `;
  conexion.query(sql, [id], (err, resultados) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        mensaje: "Error al buscar usuario"
      });
    }
    if (resultados.length === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }
    res.json(resultados[0]);
  });
});
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const {
    usuario,
    correo,
    rol
  } = req.body;
  const sql = `
    UPDATE usuarios
    SET
      usuario = ?,
      correo = ?,
      rol = ?
    WHERE id = ?
  `;
  conexion.query(
    sql,
    [
      usuario,
      correo,
      rol,
      id
    ],
    (err, resultado) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          mensaje: "Error al actualizar usuario"
        });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "Usuario no encontrado"
        });
      }
      res.json({
        mensaje: "Usuario actualizado correctamente"
      });
    }
  );
});
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    UPDATE usuarios
    SET estado = 0
    WHERE id = ?
  `;
  conexion.query(sql, [id], (err, resultado) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        mensaje: "Error al eliminar usuario"
      });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }
    res.json({
      mensaje: "Usuario eliminado correctamente"
    });
  });
});

// 🔥 PAQUETES
app.get("/paquetes", (req, res) => {

  const sql = "SELECT * FROM paquete";

  conexion.query(sql, (err, resultados) => {

    if (err) {
      return res.status(500).json({
        mensaje: "Error paquetes"
      });
    }

    res.json(resultados);

  });

});

// 🔥 REFERENCIAS
app.post("/referencias", (req, res) => {

  const {
    nombre,
    comentario,
    estrellas,
    imagen
  } = req.body;

  const sql = `
    INSERT INTO referencia
    (
      nombre,
      comentario,
      estrellas,
      imagen
    )
    VALUES (?, ?, ?, ?)
  `;

  conexion.query(
    sql,
    [nombre, comentario, estrellas, imagen],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          mensaje: "Error al guardar referencia"
        });
      }

      res.json({
        mensaje: "Guardado correctamente"
      });

    }
  );

});

app.get("/referencias", (req, res) => {

  const sql = "SELECT * FROM referencia";

  conexion.query(sql, (err, resultados) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        mensaje: "Error"
      });
    }

    res.json(resultados);

  });

});

// 🔥 PEDIDOS
app.post(
  "/pedidos",
  upload.single("comprobante"),
  (req, res) => {

    const {
      nombre,
      email,
      celular,
      producto,
      cantidad,
      paquete
    } = req.body;

    const comprobante =
      req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO pedido
      (
        nombre,
        email,
        celular,
        producto,
        cantidad,
        paquete,
        comprobante
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    conexion.query(
      sql,
      [
        nombre,
        email,
        celular,
        producto,
        cantidad,
        paquete,
        comprobante
      ],
      (err) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            mensaje: "Error al guardar pedido"
          });
        }

        res.json({
          mensaje: "Pedido registrado correctamente 🧁🍭"
        });

      }
    );

  }
);

// 🔥 OBTENER PEDIDOS
app.get("/pedidos", (req, res) => {

  const sql = "SELECT * FROM pedido";

  conexion.query(sql, (err, resultados) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        mensaje: "Error al obtener pedidos"
      });
    }

    res.json(resultados);

  });

});

// 🔥 LOGIN
app.post("/login", (req, res) => {

  const { usuario, password, captcha, resultadoCaptcha } = req.body;

  const sql = `
    SELECT *
    FROM usuarios
    WHERE usuario = ? AND estado = 1
  `;

  conexion.query(
    sql,
    [usuario],
    async (err, results) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          mensaje: "Error en login"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          mensaje: "Usuario no encontrado"
        });
      }
      if (parseInt(captcha) !== parseInt(resultadoCaptcha)) {
        return res.status(400).json({
          mensaje: "CAPTCHA incorrecto"
        });
      }
      const user = results[0];

      const match = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!match) {
        return res.status(401).json({
          mensaje: "Contraseña incorrecta"
        });
      }

      // 🔥 REGISTRAR INGRESO

      const ip =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;

      const browser =
        req.headers["user-agent"];

      const sqlLog = `
        INSERT INTO log_accesos
        (
          id_usuario,
          usuario,
          ip,
          evento,
          browser
        )
        VALUES (?, ?, ?, ?, ?)
      `;

      conexion.query(
        sqlLog,
        [
          user.id,
          user.usuario,
          ip,
          "ingreso",
          browser
        ]
      );

      // 🔥 CREAR TOKEN

      const token = jwt.sign(
        {
          id: user.id,
          usuario: user.usuario,
          rol: user.rol
        },
        SECRET,
        {
          expiresIn: "2h"
        }
      );
      console.log("Usuario logueado:", user.usuario);
      res.json({
        mensaje: "Login correcto",
        token,
        usuario: user.usuario,
        rol: user.rol,
        id: user.id
      });

    }
  );

});

// 🔥 LOGOUT

app.post("/logout", (req, res) => {

  const {
    id_usuario,
    usuario
  } = req.body;

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  const browser =
    req.headers["user-agent"];

  const sql = `
    INSERT INTO log_accesos
    (
      id_usuario,
      usuario,
      ip,
      evento,
      browser
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  conexion.query(
    sql,
    [
      id_usuario,
      usuario,
      ip,
      "salida",
      browser
    ],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          mensaje: "Error al registrar salida"
        });
      }

      res.json({
        mensaje: "Salida registrada"
      });

    }
  );

});

// 🔥 VERIFICAR TOKEN

function verificarToken(req, res, next) {

  const authHeader =
    req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({
      mensaje: "No hay token"
    });
  }

  const token =
    authHeader.split(" ")[1];

  try {

    const decoded =
      jwt.verify(token, SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      mensaje: "Token inválido"
    });

  }

}

// 🔥 SOLO ADMIN

function soloAdmin(req, res, next) {

  if (req.user.rol !== "admin") {

    return res.status(403).json({
      mensaje: "No autorizado"
    });

  }

  next();

}

// 🔥 REPORTE PDF
app.get("/reporte-pedidos", (req, res) => {

  const sql = "SELECT * FROM pedido";

  conexion.query(sql, (err, resultados) => {

    if (err) {
      return res.status(500).send("Error al generar reporte");
    }

    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reporte_pedidos.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(18)
      .text(
        "REPORTE DE PEDIDOS",
        {
          align: "center"
        }
      );

    doc.moveDown();

    resultados.forEach((pedido) => {

      doc.text(`Cliente: ${pedido.nombre}`);
      doc.text(`Email: ${pedido.email}`);
      doc.text(`Producto: ${pedido.producto}`);
      doc.text(`Cantidad: ${pedido.cantidad}`);
      doc.text(`Paquete: ${pedido.paquete}`);

      doc.moveDown();

    });

    doc.end();

  });

});

// 🔥 GRÁFICOS
app.get("/estadisticas-productos", (req, res) => {

  const sql = `
    SELECT
      producto,
      SUM(cantidad) AS total
    FROM pedido
    GROUP BY producto
  `;

  conexion.query(sql, (err, resultados) => {

    if (err) {
      return res.status(500).json({
        mensaje: "Error al obtener estadísticas"
      });
    }

    res.json(resultados);

  });

});

// 🔥 SERVIDOR
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Servidor en puerto " + PORT);
});