import jwt from "jsonwebtoken";

const generarToken = (usuario) => {
    return jwt.sign({
        rol: usuario.rol
    },
        process.env.JWT_SECRET,
        {
            subject: usuario._id.toString(),
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            algorithm: "HS256"
        }
    );
};

export default generarToken;