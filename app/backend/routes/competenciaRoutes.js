import express from "express";
import { 
  obtenerCompetencias, 
  obtenerCompetencia, 
  crearCompetencia, 
  actualizarCompetencia, 
  eliminarCompetencia 
} from "../controllers/competenciaController.js";

const router = express.Router();

router.get("/", obtenerCompetencias); // Obtener todas las competencias
router.get("/:id", obtenerCompetencia); // Obtener una competencia por ID
router.post("/", crearCompetencia); // Crear una competencia
router.put("/:id", actualizarCompetencia); // Actualizar una competencia
router.delete("/:id", eliminarCompetencia); // Eliminar una competencia

export default router;
