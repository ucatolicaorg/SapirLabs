// models/Archivo.js
import mongoose from "mongoose";

const archivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ruta: { type: String, required: true },
  mimetype: {
    type: String,
    required: true,
    validate: { validator: v => v === "application/pdf", message: props => `${props.value} no es PDF` }
  }
}, { timestamps: true });

const Archivo = mongoose.model("Archivo", archivoSchema);
export default Archivo;
