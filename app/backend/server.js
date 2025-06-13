import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importar rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import ejercicioRoutes from "./routes/ejercicioRoutes.js";
import archivoRoutes from "./routes/archivoRoutes.js";


dotenv.config(); 

const app = express();


// Middlewares
app.use(express.json()); 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(morgan("dev")); 

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Conectado a MongoDB"))
.catch(err => console.error(" Error al conectar MongoDB:", err));


// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ejercicios", ejercicioRoutes);
app.use("/api/archivos", archivoRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

app.use((err, req, res, next) => {
  console.error("Error de API:", err);
  // Si el archivo ya fue subido y error sucede luego, elimínalo
  if (req.file?.path && !res.headersSent) {
    try { fs.unlinkSync(req.file.path); } catch {}
  }
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
