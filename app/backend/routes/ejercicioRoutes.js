import express from "express";
import {
    crearEjercicio,
} from "../controllers/ejercicioController.js";

const router = express.Router();

router.post("/crear", crearEjercicio);

export default router;