import Usuario from "../models/Usuario.js";
import generarToken from "../utils/generarToken.js";

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
      nombre,
      apellido,
      direccion,
      celular,
      correo,
      password
    };

    const datosValidos = Object.values(campos).every(
      valor => typeof valor === "string" && valor.trim() !== ""
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

    const usuario = await Usuario.create({
      nombre,
      apellido,
      direccion,
      celular,
      correo: correoNormalizado,
      password,
      rol: "veterinario"
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
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

    console.error("Error al registrar:", error);

    res.status(500).json({
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

export {
  registrarUsuario,
  iniciarSesion,
  obtenerPerfil
};