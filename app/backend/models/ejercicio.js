import mongoose from "mongoose";
const ejercicioSchema = new mongoose.Schema({
    competencia: { type:String, required: true},
    enunciado: { type:String, required: true},
    _respuesta: { type },
    get respuesta() {
        return this._respuesta;
    },
    set respuesta(value) {
        this._respuesta = value;
    },
})