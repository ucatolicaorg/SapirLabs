import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  obtenerUsuarios,
  obtenerUsuario,
  eliminarUsuario,
  registrarUsuario,
  loginUsuario,
  obtenerUsuarioRol
  actualizarRol,
  actualizarProgreso
} from "../controllers/usuarioController.js"; 

import Usuario from "../models/usuario.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", authMiddleware, obtenerUsuarios);

// Obtener el usuario actual (sin password)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select("-password");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
});
router.get("/rol/:rol", obtenerUsuarioRol);


// Obtener usuario por ID
router.get("/:id", obtenerUsuario);

// Registrar nuevo usuario
router.post("/registro", registrarUsuario);

// Login de usuario
router.post("/login", loginUsuario);

// Subir nivel y actualizar progreso del usuario
router.put("/progreso", authMiddleware, actualizarProgreso);

// Actualizar rol de usuario
router.put("/:id", authMiddleware, actualizarRol);

// Eliminar usuario por ID
router.delete("/:id", authMiddleware, eliminarUsuario);

export default router;
