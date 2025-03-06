import Profesor from "../models/prof.js";

export const crearProfesor = async (req, res) => {
    try {
        const nuevoProfesor = new Profesor(req.body);
        await nuevoProfesor.save();

        res.status(201).json({message: "Se creo el profesor exitosamente"});

    } catch (error) {
        res.send.status(500).json({message: "Error al crear profesor"});
    }
}