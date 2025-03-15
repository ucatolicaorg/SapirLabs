import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ mensaje: "No token, acceso denegado" });

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(id).select("-password"); 

    if (!usuario) return res.status(401).json({ mensaje: "Token inválido" });

    req.usuario = usuario; 
    next();
} catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
}
};

export default authMiddleware;
