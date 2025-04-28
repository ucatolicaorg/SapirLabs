import Ejercicio from "../models/ejercicio";

//Crear ejercicio

export const crearEjercicio = async(req, res)=>{
    try{
        const {competencia, enunciado, respuesta} = req.body;
        
        const ejercicioExistente = await Ejercicio.findOne({enunciado});

        if(ejercicioExistente) return res.status(400).json({ mensaje: "El ejercicio ya existe"});

        const nuevoEjercicio = new Ejercicio({competencia, enunciado, respuesta});
        await nuevoEjercicio.save();

        res.json({mensaje:"Ejercicio creado con exito"})

    } catch (error) {
        res.status(500).json({ mensaje:"Error al crear el ejercicio", error: error.message})
    }
};