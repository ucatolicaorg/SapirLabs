import mongoose from "mongoose";

const solucionesShema = mongoose.Schema({
    id_soluciones:{ type: ObjectId, required: true},
    usuario:{type: String,required: true},
    problema:{type: mongoose.Schema.Types.ObjectId, ref: 'problema', required: true },
    codigo_fuente:{type:string, required: true},
    lenguaje:{ type:string, required: true },
    estado:{ type: Enum [pendiente,correcto,incorrecto] ,required: true},
    puntuacion:{type: number, required: true},
    fecha_envio:{type: Date, required: true},
})

const Solucion = mongoose.model('Solucion', solucionSchema);
export default Solucion;