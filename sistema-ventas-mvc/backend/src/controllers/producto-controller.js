//Controller maneja los req y res -- es teoría
import {listarProductos} from "../models/producto-model.js"

export const obtenerProductos = async (req, res) => {
    try {
        const productos = await listarProductos();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener los productos"
        });

    };
};

