import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token desde el encabezado Authorization
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ mensaje: "Acceso no autorizado, no hay token" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findById(decoded.id).select("-contraseña");
    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    // Adjuntar el usuario a la request
    req.usuario = usuario;
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o expirado", error });
  }
};

export default authMiddleware;
