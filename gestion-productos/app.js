import express from "express";

const app = express();

const PORT = 3000;

//Middleware para interceptar el puerto
app.use(express.json());

//Ruta inicial
app.get("/", (req, res) => {
    // para devolver el estado de código status
    res.status(200).json({
        mensaje: "El servido de productos funciona correctamente"
    }); 
});


//Vamos a decir al servidor que escuche por el puerto
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
});