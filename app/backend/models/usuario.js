import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true},
  nivel: { type: Number, default: 0 },
  progreso: {type: Number, default: 0},
  rol: { type: String, enum: ["estudiante", "profesor", "admin"], default: "estudiante" },
  ejerciciosResueltos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ejercicio" }]
}, { timestamps: true });

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
