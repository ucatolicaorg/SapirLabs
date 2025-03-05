import mongoose from "mongoose";


const problema = mongoose.Schema({
    id_problemas: {type: String, require: true},
    titulo: {type: String, require: true},
    descripcion: {type: String, require: true},
    entrada_ejemplo: {type: String, require:true},
    salida_ejemplo: {type: String, require: true},
    dificultad: {type: String, enum: ["Fácil, Medio, Difícil"], require: true},
    competencia_asociada: {type: mongoose.Schema.Types.ObjectId, ref: "Competencia"},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    soluciones: {type: String, Array: ["Solucion"], require: true},
    fecha_creacion: {type: Date, default: Date.now}

})

})

const Problema = mongoose.model("Problema", problemaSchema);

export default Problema;

