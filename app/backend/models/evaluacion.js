import mongoose from "mongoose";

const evaluacionSchema = mongoose.Schema({
    id_evaluacion: { type: ObjectId, require: true},
    solucion: { type: mongoose.Schema.Types.ObjectId, ref: "Solucion" },
    modelo_usado: { type: String, require: true },
    comentarios: { type: String, require: true },
    puntuacion: { type: Number, require: true },
    fecha_evaluacion: { type: Date, require: true}
});

const Evaluacion = mongoose.mode1('Evaluacion', evaluacionSchema);

export default Evaluacion;