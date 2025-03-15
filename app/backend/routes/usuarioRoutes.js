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

import Usuario from "../models/usuario.js";

const router = express.Router();

router.get("/", authMiddleware, obtenerUsuarios);
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select("-password");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
  }
});

router.get("/:id", obtenerUsuario);
router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
router.put("/:id", authMiddleware, actualizarUsuario);
router.delete("/:id", authMiddleware, eliminarUsuario);

export default router;
