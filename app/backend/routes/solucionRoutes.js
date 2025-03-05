import express from "express";
import { 
  obtenerSoluciones, 
  obtenerSolucion, 
  crearSolucion, 
  actualizarSolucion, 
  eliminarSolucion 
} from "../controllers/solucionController.js";

const router = express.Router();

router.get("/", obtenerSoluciones); // Obtener todas las soluciones
router.get("/:id", obtenerSolucion); // Obtener una solución por ID
router.post("/", crearSolucion); // Crear una solución
router.put("/:id", actualizarSolucion); // Actualizar una solución
router.delete("/:id", eliminarSolucion); // Eliminar una solución

export default router;
