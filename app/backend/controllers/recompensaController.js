import Recompensa from "../models/recompensa.js";

// Obtener todas las recompensas
export const obtenerRecompensas = async (req, res) => {
  try {
    const recompensas = await Recompensa.find().populate("autor competencia_asociada");
    res.json(recompensas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las recompensas", error });
  }
};

// Obtener una recompensa por ID
export const obtenerRecompensa = async (req, res) => {
  try {
    const recompensa = await Recompensa.findById(req.params.id).populate("autor competencia_asociada");
    if (!recompensa) return res.status(404).json({ mensaje: "Recompensa no encontrada" });
    res.json(recompensa);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la recompensa", error });
  }
};

// Crear una nueva recompensa
export const crearRecompensa = async (req, res) => {
  try {
    const nuevaRecompensa = new Recompensa(req.body);
    await nuevaRecompensa.save();
    res.status(201).json({ mensaje: "Recompensa creada exitosamente", recompensa: nuevaRecompensa });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la recompensa", error });
  }
};

// Actualizar una recompensa
export const actualizarRecompensa = async (req, res) => {
  try {
    const recompensaActualizada = await Recompensa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recompensaActualizada) return res.status(404).json({ mensaje: "Recompensa no encontrada" });
    res.json({ mensaje: "Recompensa actualizada", recompensa: recompensaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la recompensa", error });
  }
};

// Eliminar una recompensa
export const eliminarRecompensa = async (req, res) => {
  try {
    const recompensaEliminada = await Recompensa.findByIdAndDelete(req.params.id);
    if (!recompensaEliminada) return res.status(404).json({ mensaje: "Recompensa no encontrada" });
    res.json({ mensaje: "Recompensa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la recompensa", error });
  }
};
