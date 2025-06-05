import mongoose from "mongoose";

const ejercicioSchema = new mongoose.Schema({
    competencia: { type: String, enum:["cb", "eng", "cod"], required: true},
    nivel: { type: Number, required: true},
    enunciado: { type: String, required: true},
    respuesta: { type: String, required: true }
});

const Ejercicio = mongoose.model("Ejercicio", ejercicioSchema);

export default Ejercicio;