import mongoose from "mongoose";

const maratonSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  problemas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problema" }],
  participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
  ranking: [
    {
      usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
      puntuacion: { type: Number, default: 0 }
    }
  ],
  estado: { type: String, enum: ["abierto", "cerrado"], required: true },
  creador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  generado_IA: { type: Boolean },
  modelo_usado: { type: String }
});

const Maraton = mongoose.model("Maraton", maratonSchema);

export default Maraton;
