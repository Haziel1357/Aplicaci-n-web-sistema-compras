import Usuario from "../models/Usuario.js";
import generarToken from "../utils/generarToken.js";

const registrarUsuario = async (req, res) => {
    try {
        const {nombre, correo, password} = req.body;

        if (!nombre || !correo || !password){
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const existeUsuario = await Usuario.findOne({
            correo: correo.trim().toLowerCase()
        });

        if (existeUsuario){
            return res.status(409).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const usuario = await Usuario.create({
            nombre,
            correo,
            password,
            rol: "veterinario"
        });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    }catch(error){
        if (error.code === 11000) {
            return res.status(409).json({
                mensaje: "El correo ya está registrado"
            });
        };

        if (error.name === "ValidationError") {
            return res.status(400).json({
                mensaje: error.message
            });
        };

        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });
    };
};

const iniciarSesion = async (req, res) => {
    try {
        const {correo, password} = req.body;

        if (
            typeof correo !== "string" || 
            typeof password !== "string" ||
            !correo.trim() || 
            !password
        ) {
            return res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios"
            });
        };

        const usuario = await Usuario.findOne({
            correo: correo.trim().toLowerCase()
        }).select("+password");

        if (!usuario){
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        };

        const passwordCorrecto = await usuario.compararPassword(password);

        if (!passwordCorrecto){
            return res.status(401).json({
                mensaje: "Credenciales incorrectas"
            });
        };

        if (!usuario.estado){
            return res.status(403).json({
                mensaje: "Usuario inactivo"
            });
        };

        const token = generarToken(usuario);

        res.json({
            mensaje: "Inicio de sesión correcto",
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    }catch(error){
        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    };
}

export {
    registrarUsuario,
    iniciarSesion
};