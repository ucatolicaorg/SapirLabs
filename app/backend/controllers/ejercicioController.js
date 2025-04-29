import Ejercicio from "../models/ejercicio.js";

//Crear ejercicio
export const crearEjercicio = async(req, res)=>{
    try{
        const {competencia, nivel, enunciado, respuesta} = req.body;
        
        const ejercicioExistente = await Ejercicio.findOne({enunciado});

        if(ejercicioExistente) return res.status(400).json({ mensaje: "El ejercicio ya existe"});

        const nuevoEjercicio = new Ejercicio({competencia, nivel, enunciado, respuesta});
        await nuevoEjercicio.save();

        res.status(201).json({mensaje:"Ejercicio creado con exito"})

    } catch (error) {
        res.status(500).json({ mensaje:"Error al crear el ejercicio", error: error.message})
    }
};

//Consultar ejercicio
