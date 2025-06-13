import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";


import {
  obtenerUsuarios,
  obtenerUsuario,
  eliminarUsuario,
  registrarUsuario,
  loginUsuario,
  obtenerUsuarioRol,
  actualizarRol,
  actualizarProgreso
} from "../controllers/usuarioController.js"; 

import Usuario from "../models/usuario.js";

const router = express.Router();

// Rutas específicas 

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

// Obtener usuarios por rol
router.get("/rol/:rol", obtenerUsuarioRol);

// Login de usuario
router.post("/login", loginUsuario);

// Registrar nuevo usuario
router.post("/registro", registrarUsuario);

// rutas protegidas
router.get("/", authMiddleware, obtenerUsuarios);
router.put("/progreso", authMiddleware, actualizarProgreso);

// Rutas dinámicas 
router.get("/:id", obtenerUsuario);
router.put("/:id", authMiddleware, actualizarRol);
router.delete("/:id", authMiddleware, eliminarUsuario);


export default router;
