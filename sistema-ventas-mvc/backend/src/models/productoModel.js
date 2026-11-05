import { readFile, writeFile } from "node:fs/promises";

const archivo = new URL("../data/productos.json", import.meta.url)

//Función para listar todos
export const listarProductos = async () => {
    const datos = await readFile(archivo, "utf-8")
    return JSON.parse(datos) // Convierte el Json a código java y cuando yo mando la información lo convierto a texto plano
};

//Registrar un producto
export const registrarProducto = async (producto) => {
    const productos = await listarProductos();
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    const nuevoProducto = {
        id: nuevoId,
        ...producto
    };
    productos.push(nuevoProducto);

    await writeFile(
        archivo,
        JSON.stringify(productos, null, 2), // Estoy poniendo a JSON
        "utf-8"
    );
    return nuevoProducto;
}

//Buscar por id
export const buscarProductoPorId = async (id) => {
    const productos = await listarProductos();
    const productoId = productos.find(p => p.id === id);
    return productoId;
}



//Actualizar un producto por el id
export const actualizarProductoPorId = async (id, datosActualizados) => {
    const productos = await listarProductos();
    const producto = productos.find(p => p.id === id);

    if(!producto){
        return null;
    }

    producto.nombre = datosActualizados.nombre;
    producto.precio = datosActualizados.precio;
    producto.stock = datosActualizados.stock;

    await writeFile( // Para escribir dentro de mi JSON ! 
        archivo,
        JSON.stringify(productos, null, 2),
        "utf8"
    );
    return producto;
}


//Eliminar un producto por el id
// Mi forma

// export const eliminarProductoPorId = async (id) => {
//     const productos = await listarProductos();
//     const indice = productos.findIndex(p => p.id === id);

//     if (indice === -1){
//         return null;
//     }

//     const [productoEliminado] = productos.splice(indice, 1); // [Para sacar el arreglo solo 1], splice (valor inicial, valor al que quiero cambiar)

//     await writeFile(
//         archivo,
//         JSON.stringify(productos, null, 2),
//         "utf8"
//     );

    
//     return productoEliminado;
// }


//Eliminar un producto por el id
// Forma de la inge

export const eliminarProductoPorId = async (id) => {
    const productos = await listarProductos();
    const producto = productos.find(p => p.id === id);

    if(!producto){
        return false;
    };

    const productosActualizados = productos.filter(p => p.id !== id);

    await writeFile(
        archivo,
        JSON.stringify(productosActualizados, null, 2),
        "utf8"
    );

    return producto;
}