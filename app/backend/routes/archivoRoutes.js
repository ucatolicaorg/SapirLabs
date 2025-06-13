// routes/archivoRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  subirArchivo,
  obtenerArchivosUsuario,
  serveArchivo,
  eliminarArchivo
} from "../controllers/archivoController.js";

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Esta es la clave: debe incluir :userId en la ruta
router.post("/subir/:userId", upload.single("archivo"), subirArchivo);

// Obtener archivos por usuario
router.get("/usuario/:userId", obtenerArchivosUsuario);

// Ver archivo específico
router.get("/:archivoId", serveArchivo);

// Eliminar
router.delete("/:userId/:archivoId", eliminarArchivo);

export default router;
