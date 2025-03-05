import Problema from "../models/problema.js";

// Obtener todos los problemas
export const obtenerProblemas = async (req, res) => {
  try {
    const problemas = await Problema.find().populate("autor competencia_asociada");
    res.json(problemas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los problemas", error });
  }
};

// Obtener un problema por ID
export const obtenerProblema = async (req, res) => {
  try {
    const problema = await Problema.findById(req.params.id).populate("autor competencia_asociada");
    if (!problema) return res.status(404).json({ mensaje: "Problema no encontrado" });
    res.json(problema);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el problema", error });
  }
};

// Crear un nuevo problema
export const crearProblema = async (req, res) => {
  try {
    const nuevoProblema = new Problema(req.body);
    await nuevoProblema.save();
    res.status(201).json({ mensaje: "Problema creado exitosamente", problema: nuevoProblema });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el problema", error });
  }
};

// Actualizar un problema
export const actualizarProblema = async (req, res) => {
  try {
    const problemaActualizado = await Problema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!problemaActualizado) return res.status(404).json({ mensaje: "Problema no encontrado" });
    res.json({ mensaje: "Problema actualizado", problema: problemaActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el problema", error });
  }
};

// Eliminar un problema
export const eliminarProblema = async (req, res) => {
  try {
    const problemaEliminado = await Problema.findByIdAndDelete(req.params.id);
    if (!problemaEliminado) return res.status(404).json({ mensaje: "Problema no encontrado" });
    res.json({ mensaje: "Problema eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el problema", error });
  }
};

