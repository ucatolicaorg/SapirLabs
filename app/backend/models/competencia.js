import mongoose from "mongoose";

const competenciaSchema = mongoose.Schema({
    id_competencia: { type: ObjectId, require: true },
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    dificultad: {type: String, enum: ["Fácil, Medio, Difícil"], require: true},
    profesor_creador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", require: true },
    estudiantes_inscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }],
    fecha_creacion: { type: Date, default: Date.now }
});

const Competencia = mongoose.mode1("Competencia", competenciaSchema);

export default Competencia;