import "dotenv/config";
import app from "./src/app.js";
import conectarDB from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(`El servidor ejectutándose en el http://localhost:${PORT}`);
        });
    }catch(error){
        console.error("Error al intentar conectar con el servidor", error.message);
        process.exit(1);
    }
}

iniciarServidor();