//Controller maneja los req y res -- es teoría
import {actualizarProductoPorId, buscarProductoPorId, listarProductos, registrarProducto} from "../models/productoModel.js"

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

// export const crearProducto = async (req, res) => {
//     try {
//         const producto  = await registrarProducto(req.body);
//         res.json(producto);
//     }catch (error){
//         console.error(error);
//         res.status(500).json({
//             mensaje: "Error al ingresar el producto"
//         });
//     };
// };

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


export const buscarProducto = async (req, res) => {
    try {
        const id = Number(req.params.id); // Porque todo lo que me trae es un string 
        if (!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                mensaje: "Ingrese un id válido"
            });
        };
        
        const producto = await buscarProductoPorId(id);

        if(!producto){
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        };

        res.status(200).json(producto);
    }catch (error){
        console.error(error);
        res.status(500).json({
            mensaje: "Error al registrar el producto"
        });
    };
}

// export const actualizarProducto = async (req, res) => {
//     try {
//         const {nombre, precio, stock} = req.body;

//         if (!nombre || precio === undefined || stock === undefined){
//             return res.status(400).json({
//                 mensaje: "Todos los campos son obligatorios"
//             });
//         };

//         const producoEncontrado = await actualizarProductoPorId();

//     }catch (error){

//     };
// }



// ACTUALIZAR UN PRODUCTO

export const modificarProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, precio, stock } = req.body ?? {};

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: "ID inválido"
      });
    }

    if (
      typeof nombre !== "string" ||
      nombre.trim() === "" ||
      typeof precio !== "number" ||
      !Number.isFinite(precio) ||
      precio <= 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return res.status(400).json({
        mensaje: "Datos del producto inválidos"
      });
    }

    const producto = await actualizarProductoPorId(id, {
      nombre: nombre.trim(),
      precio,
      stock
    });

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json(producto);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al modificar producto"
    });
  }
};










export const eliminarProducto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
                mensaje: "Ingrese un id válido"
            });
        };

        const productoElim = await eliminarProductoPorId(id);


        res.status(200).json(productoElim);

    }catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al intentar eliminar el producto"
        });
    }
}