import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  nivel: { type: Number, default: 0 },
  rol: { type: String, enum: ["estudiante", "profesor", "admin"], default: "estudiante" }
}, { timestamps: true });

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
