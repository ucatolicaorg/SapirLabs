import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { 
  obtenerUsuarios, 
  obtenerUsuario, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario,
  registrarUsuario,
  loginUsuario
} from "../controllers/usuarioController.js";

const router = express.Router();

// CRUD de Usuarios 
router.get("/", authMiddleware, obtenerUsuarios);
router.get("/:id", authMiddleware, obtenerUsuario);
router.post("/", authMiddleware, crearUsuario);
router.put("/:id", authMiddleware, actualizarUsuario);
router.delete("/:id", authMiddleware, eliminarUsuario);

// Autenticación 
router.post("/registro", registrarUsuario); 
router.post("/login", loginUsuario);

export default router;
