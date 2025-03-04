import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: Number, required: true, default: 0},
    tipo: { type: String, required: true, default: "estudiante"}
}, {
    timestamps : true //Created at, updated at
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;