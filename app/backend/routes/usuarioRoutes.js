import express from "express";
import { 
  obtenerUsuarios, 
  obtenerUsuario, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario 
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/", obtenerUsuarios); // Obtener todos los usuarios
router.get("/:id", obtenerUsuario); // Obtener un usuario por ID
router.post("/", crearUsuario); // Crear un usuario
router.put("/:id", actualizarUsuario); // Actualizar un usuario
router.delete("/:id", eliminarUsuario); // Eliminar un usuario

export default router;
