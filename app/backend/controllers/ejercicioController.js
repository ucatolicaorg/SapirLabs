import Ejercicio from "../models/ejercicio.js";
import Usuario from "../models/usuario.js";

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
    const { nivel } = req.query;

    if (!competencia) {
      return res.status(400).json({ mensaje: "Se requiere el parámetro 'competencia'" });
    }

    // Obtener el usuario autenticado
    const usuario = await Usuario.findById(req.usuario._id);

    // Determinar el nivel de usuario basado en el nivel de experiencia
    let nivelEjercicio;

    if (usuario.nivel >= 0 && usuario.nivel <= 7) {
      nivelEjercicio = 1; // Nivel 1
    } else if (usuario.nivel >= 8 && usuario.nivel <= 16) {
      nivelEjercicio = 2; // Nivel 2
    } else if (usuario.nivel >= 17 && usuario.nivel <= 24) {
      nivelEjercicio = 3; // Nivel 3
    } else {
      return res.status(400).json({ mensaje: "Nivel de usuario fuera de rango" });
    }

    // Si el nivel de la query no coincide con el nivel de usuario
    if (nivel && parseInt(nivel) !== nivelEjercicio) {
      return res.status(400).json({ mensaje: "El nivel de la solicitud no coincide con el nivel del usuario" });
    }

    // Buscar ejercicios filtrando por competencia y nivel
    const ejercicios = await Ejercicio.find({
      competencia,
      nivel: nivelEjercicio,
      _id: { $nin: usuario.ejerciciosResueltos },
    });

    if (ejercicios.length === 0) {
      return res.status(404).json({ mensaje: "No hay ejercicios disponibles para esta competencia y nivel" });
    }

    res.status(200).json(ejercicios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener ejercicios",
      error: error.message,
    });
  }
};





export const validarRespuesta = async (req, res) => {
  try {
    const { idEjercicio, respuestaUsuario } = req.body;

    // Verificar que la respuesta del usuario y el ID del ejercicio sean válidos
    if (!idEjercicio || !respuestaUsuario) {
      return res.status(400).json({ mensaje: "Faltan parámetros en la solicitud" });
    }

    const ejercicio = await Ejercicio.findById(idEjercicio);

    if (!ejercicio) {
      return res.status(404).json({ mensaje: "Ejercicio no encontrado" });
    }

    // Verificar si la respuesta es correcta
    const correcta = ejercicio.respuesta.trim().toLowerCase() === respuestaUsuario.trim().toLowerCase();

    if (correcta) {
      const usuario = await Usuario.findById(req.usuario._id);

      // Verificar si el ejercicio ya fue resuelto
      if (usuario.ejerciciosResueltos.includes(ejercicio._id)) {
        return res.status(400).json({ mensaje: "Este ejercicio ya ha sido resuelto" });
      }

      usuario.ejerciciosResueltos.push(ejercicio._id); // Agregar ejercicio resuelto
      await usuario.save();
    }

    res.json({ correcta });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al validar respuesta", error: error.message });
  }
};
