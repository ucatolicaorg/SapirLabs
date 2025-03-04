import mongoose from "mongoose";


const recompensaScheme = mongoose.Schema({
    id_recompensa: {type: ObjectId, require: true},
    titulo_recompensa: {type: String, require: true},
    descripcion_re: {type: String, require: true},
    entrada_ejemplo: {type: String, require:true},
    salida_ejemplo: {type: String, require: true},
    dificultad: {type: String, enum: ["Fácil, Medio, Difícil"], require: true},
    competencia_asociada: {type: mongoose.Schema.Types.ObjectId, ref: "Competencia"},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    genereado_por_IA: {type: Boolean, require: true},
    Modelado_usado: {type: String, require: true},
    fecha_creacion: {type: Date, default: Date.now},
})

const Recompensa = mongoose.model("Recompensa", recompensaScheme);

export default Recompensa;