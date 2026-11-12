//Tengo la conexión a mongoDB
import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado correctamente");
    }catch(error){
        console.error("Error al conectar MongoDB", error.message);
        throw error;
    }
};

export default conectarDB;