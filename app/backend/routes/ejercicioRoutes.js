import express from "express";
import {
    crearEjercicio,
    getEjercicio, 
    validarRespuesta
} from "../controllers/ejercicioController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/crear", authMiddleware,crearEjercicio);
router.post("/validar",authMiddleware, validarRespuesta);
router.get("/:competencia",authMiddleware, getEjercicio);

export default router;