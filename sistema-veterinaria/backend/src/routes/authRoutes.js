import express from "express";
import { registrarUsuario, iniciarSesion, obtenerPerfil } from "../controllers/authController.js";
import verificarToken from "../middleware/authMiddleware.js";
import autorizarRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciarSesion);

router.get("/perfil", verificarToken, obtenerPerfil);
router.get("/admin", verificarToken, autorizarRoles("administrador"),
        (req, res) => {
            res.json({
                mensaje: "Bienvenido al área de administración"
            });
        });

export default router;