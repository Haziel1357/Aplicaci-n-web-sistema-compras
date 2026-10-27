import express from 'express';
import productoRoutes from "./routers/producto-routes.js"

const app = express();

// parse requests with a Content-Type of application/json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API sistema de ventas mvc funcionando');
});

app.use("/api/productos", productoRoutes) // productoRoutes lo import desde la otra clase

export default app;
