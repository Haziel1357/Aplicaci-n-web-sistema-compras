import { listarProductos } from "./src/models/producto-model.js";

try {
    const productos = await listarProductos();
    console.log("Productos obtenidos desde el archivo JSON");
    console.log(productos)
}catch (error){
    console.error("Error al leer los productos: ", error.message);
}