import { readFile, writeFile } from "node:fs/promises";

const archivo = new URL("../data/productos.json", import.meta.url)

export const listarProductos = async () => {
    const datos = await readFile(archivo, "utf-8")
    return JSON.parse(datos) // Convierte el Json a código java y cuando yo mando la información lo convierto a texto plano
};

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
