import express from "express";
import {
  obtenerRecompensas,
  obtenerRecompensa,
  crearRecompensa,
  actualizarRecompensa,
  eliminarRecompensa
} from "../controllers/recompensaController.js";

const router = express.Router();

router.get("/", obtenerRecompensas);
router.get("/:id", obtenerRecompensa);
router.post("/", crearRecompensa);
router.put("/:id", actualizarRecompensa);
router.delete("/:id", eliminarRecompensa);

export default router;
