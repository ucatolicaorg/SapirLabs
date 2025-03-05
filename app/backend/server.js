import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Importar rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import genIARoutes from "./routes/genIARoutes.js";
import maratonRoutes from "./routes/maratonRoutes.js";

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middlewares
app.use(express.json()); // Permite recibir JSON en las peticiones
app.use(cors()); // Habilita CORS
app.use(morgan("dev")); // Muestra logs de las peticiones en consola

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Conectado a MongoDB"))
.catch(err => console.error(" Error al conectar MongoDB:", err));

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/genIA", genIARoutes);
app.use("/api/maratones", maratonRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
