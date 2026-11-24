import Usuario from "../models/Usuario.js";
import generarToken from "../utils/generarToken.js";
import crypto from "node:crypto";
import enviarCorreo from "../utils/enviarCorreo.js";


const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      direccion,
      celular,
      correo,
      password
    } = req.body;

    const campos = {
      nombre, apellido, direccion,
      celular, correo, password
    };

    const datosValidos = Object.values(campos).every(
      valor =>
        typeof valor === "string" &&
        valor.trim() !== ""
    );

    if (!datosValidos) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    const correoNormalizado = correo.trim().toLowerCase();

    const existeUsuario = await Usuario.findOne({
      correo: correoNormalizado
    });

    if (existeUsuario) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado"
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const expiracion = new Date(
      Date.now() + 30 * 60 * 1000
    );

    const usuario = await Usuario.create({
      nombre,
      apellido,
      direccion,
      celular,
      correo: correoNormalizado,
      password,
      rol: "veterinario",
      correoConfirmado: false,
      tokenConfirmacion: tokenHash,
      tokenConfirmacionExpira: expiracion
    });

    const enlace = `${process.env.FRONTEND_URL}/confirm/${token}`;

    try {
      await enviarCorreo(usuario.correo, enlace);
    } catch (errorCorreo) {
      console.error("Error al enviar correo:", errorCorreo);

      return res.status(503).json({
        mensaje:
          "La cuenta fue creada, pero no se pudo enviar el correo de confirmación. Contacta al administrador para reintentar el envío."
      });
    }

    return res.status(201).json({
      mensaje:
        "Usuario registrado. Revisa tu correo para confirmar tu cuenta.",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        correoConfirmado: usuario.correoConfirmado
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: error.message
      });
    }

    console.error("Error al registrar usuario:", error);

    return res.status(500).json({
      mensaje: "Error al registrar usuario"
    });
  }
};


const iniciarSesion = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (
      typeof correo !== "string" ||
      typeof password !== "string" ||
      !correo.trim() ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios"
      });
    }

    const usuario = await Usuario.findOne({
      correo: correo.trim().toLowerCase()
    }).select("+password");

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const passwordCorrecto =
      await usuario.compararPassword(password);

    if (!passwordCorrecto) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    if (!usuario.correoConfirmado) {
      return res.status(403).json({
        mensaje: "Debes confirmar tu correo electrónico antes de iniciar sesión"
      });
    }

    if (!usuario.estado) {
      return res.status(403).json({
        mensaje: "Usuario inactivo"
      });
    }

    const token = generarToken(usuario);

    res.json({
      mensaje: "Inicio de sesión correcto",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        direccion: usuario.direccion,
        celular: usuario.celular,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    res.status(500).json({
      mensaje: "Error al iniciar sesión"
    });
  }
};

const obtenerPerfil = async (req, res) => {
  res.status(200).json({
    mensaje: "Perfil obtenido correctamente",
    usuario: {
      id: req.usuario._id,
      nombre: req.usuario.nombre,
      apellido: req.usuario.apellido,
      direccion: req.usuario.direccion,
      celular: req.usuario.celular,
      correo: req.usuario.correo,
      rol: req.usuario.rol,
      estado: req.usuario.estado
    }
  });
};

const confirmarCuenta = async (req, res) => {
  try {
    const { token } = req.params;

    if (!/^[a-f0-9]{64}$/.test(token || "")) {
      return res.status(400).json({
        mensaje: "Enlace de confirmación inválido"
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const usuario = await Usuario.findOneAndUpdate(
      {
        tokenConfirmacion: tokenHash,
        tokenConfirmacionExpira: {
          $gt: new Date()
        },
        correoConfirmado: false
      },
      {
        $set: {
          correoConfirmado: true
        },
        $unset: {
          tokenConfirmacion: "",
          tokenConfirmacionExpira: ""
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!usuario) {
      return res.status(400).json({
        mensaje: "El enlace es inválido, ya fue usado o ha expirado"
      });
    }

    return res.status(200).json({
      mensaje: "Correo confirmado correctamente"
    });

  } catch (error) {
    console.error("Error al confirmar correo:", error);

    return res.status(500).json({
      mensaje: "Error al confirmar la cuenta"
    });
  }
};


export {
  registrarUsuario,
  iniciarSesion,
  obtenerPerfil,
  confirmarCuenta
};