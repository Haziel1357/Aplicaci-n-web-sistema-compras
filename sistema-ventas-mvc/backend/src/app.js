import express from 'express';
import productoRoutes from "./routers/productoRoutes.js"

const app = express();

// analizar solicitudes con un Content-Type de application/json
// Dispara el middleware que permite la traducción de datos enviados al servidor (JSON).
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API sistema de ventas mvc funcionando');
});

app.use("/api/productos", productoRoutes) // productoRoutes lo import desde la otra clase

export default app;

