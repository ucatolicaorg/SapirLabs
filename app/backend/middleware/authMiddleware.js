import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validación extra
    if (!decoded.id) {
      return res.status(401).json({ mensaje: "Token inválido (sin id)" });
    }

    const usuario = await Usuario.findById(decoded.id).select("-password");
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado con este token" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

export default authMiddleware;
