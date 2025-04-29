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

// Consultar ejercicios por competencia
export const getEjercicio = async (req, res) => {
    try {
      const { competencia } = req.params;
  
      if (!competencia) {
        return res.status(400).json({ mensaje: "Se requiere el parámetro 'competencia'" });
      }
  
      const ejercicios = await Ejercicio.find({ competencia });
  
      res.status(200).json(ejercicios);
    } catch (error) {
      res.status(500).json({mensaje: "Error al obtener ejercicios", error: error.message,});
    }
  };

  // Validar REspuestas
export const validarRespuesta = async (req, res) => {
    try {
      const { idEjercicio, respuestaUsuario } = req.body;
      const ejercicio = await Ejercicio.findById(idEjercicio);
  
      if (!ejercicio) return res.status(404).json({ mensaje: "Ejercicio no encontrado" });
  
      const correcta = ejercicio.respuesta.trim().toLowerCase() === respuestaUsuario.trim().toLowerCase();
      res.json({ correcta });
    } catch (error) {
      res.status(500).json({ mensaje: "Error al validar respuesta", error: error.message });
    }
  };
  