import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const verificarToken = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                mensaje: "Token no proporcionado"
            });
        };

        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ["HS256"] }
        );

        const usuario = await Usuario.findById(decoded.sub);

        if (!usuario || !usuario.estado) {
            return res.status(401).json({
                mensaje: "Usuario no autorizado"
            });
        };

        req.usuario = usuario;
        next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError" ||
            error.name === "CastError"
        ) {
            return res.status(401).json({
                mensaje: "Token inválido o expirado"
            });
        };
        next(error);
    }
};

export default verificarToken;