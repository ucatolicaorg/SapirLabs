import express from "express";
import { 
  obtenerMaratones, 
  obtenerMaraton, 
  crearMaraton, 
  actualizarMaraton, 
  eliminarMaraton 
} from "../controllers/maratonController.js";

const router = express.Router();

router.get("/", obtenerMaratones); // Obtener todos los maratones
router.get("/:id", obtenerMaraton); // Obtener un maratón por ID
router.post("/", crearMaraton); // Crear un nuevo maratón
router.put("/:id", actualizarMaraton); // Actualizar un maratón
router.delete("/:id", eliminarMaraton); // Eliminar un maratón

export default router;
