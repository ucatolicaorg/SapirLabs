import Competencia from "../models/competencia.js";

// Obtener todas las competencias
export const obtenerCompetencias = async (req, res) => {
  try {
    const competencias = await Competencia.find().populate("profesor_creador estudiantes_inscritos");
    res.json(competencias);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las competencias", error });
  }
};

// Obtener una competencia por ID
export const obtenerCompetencia = async (req, res) => {
  try {
    const competencia = await Competencia.findById(req.params.id).populate("profesor_creador estudiantes_inscritos");
    if (!competencia) return res.status(404).json({ mensaje: "Competencia no encontrada" });
    res.json(competencia);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la competencia", error });
  }
};

// Crear una nueva competencia
export const crearCompetencia = async (req, res) => {
  try {
    const { nombre, descripcion, dificultad, profesor_creador, estudiantes_inscritos } = req.body;
    const nuevaCompetencia = new Competencia({ nombre, descripcion, dificultad, profesor_creador, estudiantes_inscritos });
    await nuevaCompetencia.save();
    res.status(201).json({ mensaje: "Competencia creada exitosamente", competencia: nuevaCompetencia });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la competencia", error });
  }
};

// Actualizar una competencia
export const actualizarCompetencia = async (req, res) => {
  try {
    const competenciaActualizada = await Competencia.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("profesor_creador estudiantes_inscritos");
    if (!competenciaActualizada) return res.status(404).json({ mensaje: "Competencia no encontrada" });

    res.json({ mensaje: "Competencia actualizada", competencia: competenciaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la competencia", error });
  }
};

// Eliminar una competencia
export const eliminarCompetencia = async (req, res) => {
  try {
    const competenciaEliminada = await Competencia.findByIdAndDelete(req.params.id);
    if (!competenciaEliminada) return res.status(404).json({ mensaje: "Competencia no encontrada" });

    res.json({ mensaje: "Competencia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la competencia", error });
  }
};
