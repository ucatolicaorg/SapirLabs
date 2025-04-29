import express from "express";
import {
    crearEjercicio,
    getEjercicio, 
    validarRespuesta
} from "../controllers/ejercicioController.js";

const router = express.Router();

router.post("/crear", crearEjercicio);
router.post("/validar", validarRespuesta);
router.get("/:competencia", getEjercicio);

export default router;