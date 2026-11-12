import express from "express";
import cors from "cors";

const app = express();

//Permite solicitudes desde el frontend
app.use(cors({
    origin: "http://localhost:5173"
}));

//Permite recibir datos en formato JSON.
app.use(express.json());

//Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "API SmartVET funcionando correctamente por Haziel Moncayo"
    });
})

export default app;