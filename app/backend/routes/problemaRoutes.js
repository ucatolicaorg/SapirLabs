import express from "express";
import {
  obtenerProblemas,
  obtenerProblema,
  crearProblema,
  actualizarProblema,
  eliminarProblema
} from "../controllers/problemaController.js";

const router = express.Router();

router.get("/", obtenerProblemas);
router.get("/:id", obtenerProblema);
router.post("/", crearProblema);
router.put("/:id", actualizarProblema);
router.delete("/:id", eliminarProblema);

export default router;
