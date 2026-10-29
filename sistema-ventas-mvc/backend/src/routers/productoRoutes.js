import express from 'express';
import { obtenerProductos, crearProducto, buscarProducto, modificarProducto, eliminarProducto } from '../controllers/productoController.js';

const router = express.Router(); // Creación de un objeto que agrupa rutas.

// define the home page route
router.get('/', obtenerProductos); // ObtenerProductos estoy importando de otra clase, es una función que trae el json
router.post('/', crearProducto);
router.get('/:id', buscarProducto);
router.put('/:id', modificarProducto);


router.delete('/:id', eliminarProducto);

export default router;
