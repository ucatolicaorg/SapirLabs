import mongoose from "mongoose";

const gen_IASchema = mongoose.Schema({
    id_genIA: { type: ObjectId, required: true},
    tipo: { type: String, enum:["Problema", "Maraton"], required: true},
    parametros: { type: Object, required: true},
    resultado: {type: mongoose.Schema.Types, refPath: "tipo"},
    modelo_usado : { type: String, required: true},
    estado: { type: String, required: true},
    fecha_generacion: { type: Date, default: Date.now},
});

const Gen_IA = mongoose.model('Gen_IA', gen_IASchema);

export default Gen_IA;
