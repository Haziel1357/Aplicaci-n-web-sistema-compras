//Controller maneja los req y res -- es teoría
import {listarProductos, registrarProducto} from "../models/productoModel.js"

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

export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;

        if (!nombre || precio === undefined || stock === undefined) {
            return res.status(400).json({
                mensaje: "nombre, precio y stock son obligatorios"
            });
        }

        const nuevoProducto = await registrarProducto({ nombre, precio, stock });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al registrar el producto" });
    }
};