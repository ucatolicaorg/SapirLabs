import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload, verifyMagic } from "../middleware/upload.js";

import {
  obtenerArchivosUsuario,
  subirArchivo,
  eliminarArchivo
} from "../controllers/archivoController.js";

const router = express.Router({ mergeParams: true });

router.get("/", authMiddleware, obtenerArchivosUsuario);
router.post("/subir", authMiddleware, upload.single("archivo"), verifyMagic, subirArchivo);
router.delete("/:archivoId", authMiddleware, eliminarArchivo);

export default router;