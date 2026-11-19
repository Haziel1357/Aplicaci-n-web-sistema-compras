import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

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
});

app.use("/api/auth", authRoutes);

app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

app.use(errorMiddleware);

export default app;