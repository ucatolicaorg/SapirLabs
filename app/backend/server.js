import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import conectarDB from "./config/db.js";

// Rutas
import usuarioRoutes from './routes/usuarioRoutes.js';
import ejercicioRoutes from "./routes/ejercicioRoutes.js";
import archivoRoutes from "./routes/archivoRoutes.js";

// Configurar entorno
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Obtener __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Servir archivos estáticos (PDFs, imágenes, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas de la API
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ejercicios", ejercicioRoutes);
app.use("/api/archivos", archivoRoutes);

// Conectar a DB y levantar servidor
conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
});
