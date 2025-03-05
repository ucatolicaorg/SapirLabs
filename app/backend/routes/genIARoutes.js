import express from "express";
import { 
  obtenerGeneracionesIA, 
  obtenerGeneracionIA, 
  crearGeneracionIA, 
  actualizarGeneracionIA, 
  eliminarGeneracionIA 
} from "../controllers/genIAController.js";

const router = express.Router();

router.get("/", obtenerGeneracionesIA); 
router.get("/:id", obtenerGeneracionIA); 
router.post("/", crearGeneracionIA); 
router.put("/:id", actualizarGeneracionIA); 
router.delete("/:id", eliminarGeneracionIA); 

export default router;

