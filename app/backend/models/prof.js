import mongoose from "mongoose";

const profSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    competencia: { type: String, required: true },
});

const Profesor = mongoose.model('Profesor', profSchema);

export default Profesor;