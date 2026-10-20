const express = require("express"); //Importa el framework Express para utilizar sus funcionalidades
const app = express(); //Crea una instancia de Express, permite configurar las rutas

const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Configurar el puerto
const PORT = process.env.PORT || 3000; 

//Obtener la clave secreta
const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error("Falta configurar el JWT en .env");
}

//Configurar CORS
app.use(cors({
    origin: "http://localhost:5173"
}));

//Recibir datos JSON
app.use(express.json());

//Usuario de demostración
const usuario = {
    id: 1,
    nombre: "Haziel Moncayo",
    correo: "haziel@tienda.com",
    rol: "admin",
    passwordHash: bcrypt.hashSync("haziel123*", 10)
};

//Ruta principal
app.get("/", (req, res) => { //Define una ruta que corresponde a solicitudes GET
    res.send("API de producto funcionando"); // Envia una respuesta al cliente
});

//Endpoint de inicio de sesión
app.post("/api/auth/login", async (req, res) => {
    const { correo, password } = req.body || {};

    // Verificando que no se envíen datos vacíos
    if (typeof correo !== "string" || 
        typeof password !== "string" || 
        !correo.trim() || !password) {
        return res.status(400).json({
            mensaje: "Correo y contraseña son obligatorios"
        });
    }

    //Verificar el correo
    if (correo !== usuario.correo) {
        return res.status(401).json({
            mensaje: "Credenciales incorrectas"
        });
    }

    //Verificar la contraseña
    const passwordCorrecta = await bcrypt.compare(password, usuario.passwordHash);

    if (!passwordCorrecta) {
        return res.status(401).json({
            mensaje: "Credenciales incorrectas"
        });
    }

    //Generar token JWT
    //Aquí enviamos el token al usuario con límite de una hora para que se elimine
    const token = jwt.sign(
        {
            id: usuario.id,
            rol: usuario.rol
        },
        JWT_SECRET,
        {
            expiresIn: "1h",
            algorithm: "HS256"
        }
    );

    //Devolver respuesta exitosa
    return res.status(200).json({
        mensaje: "Inicio de sesión correcto",
        token: token,
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        }
    });
});

app.listen(PORT, () => { //Hace que Express comience a escuchar las solicitudes por el puerto configurado
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
