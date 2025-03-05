import mongoose from "mongoose";

const genIASchema = new mongoose.Schema({
  tipo: { type: String, enum: ["Problema", "Maraton"], required: true },
  parametros: { type: Object, required: true },
  resultado: { type: mongoose.Schema.Types.ObjectId, refPath: "tipo" },
  modelo_usado: { type: String, required: true },
  estado: { type: String, required: true },
  fecha_generacion: { type: Date, default: Date.now }
});

const GenIA = mongoose.model("GenIA", genIASchema);

export default GenIA;
