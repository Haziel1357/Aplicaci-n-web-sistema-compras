import express from 'express';
import { obtenerProductos, crearProducto } from '../controllers/productoController.js';

const router = express.Router(); // Creación de un objeto que agrupa rutas.

// define the home page route
router.get('/', obtenerProductos); // ObtenerProductos estoy importando de otra clase, es una función que trae el json
router.post('/', crearProducto);

export default router;
