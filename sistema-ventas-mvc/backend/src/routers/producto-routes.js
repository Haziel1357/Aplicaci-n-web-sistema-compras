import express from 'express';
import { obtenerProductos } from '../controllers/producto-controller.js';

const router = express.Router(); // Creación de un objeto que agrupa rutas.

// define the home page route
router.get('/', obtenerProductos); // ObtenerProductos estoy importando de otra clase, es una función que trae el json

export default router;
