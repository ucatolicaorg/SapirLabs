import Maraton from "../models/maraton.js";

// Obtener todos los maratones
export const obtenerMaratones = async (req, res) => {
  try {
    const maratones = await Maraton.find().populate("problemas participantes creador");
    res.json(maratones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los maratones", error });
  }
};

// Obtener un maratón por ID
export const obtenerMaraton = async (req, res) => {
  try {
    const maraton = await Maraton.findById(req.params.id).populate("problemas participantes creador");
    if (!maraton) return res.status(404).json({ mensaje: "Maratón no encontrado" });
    res.json(maraton);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el maratón", error });
  }
};

// Crear un nuevo maratón
export const crearMaraton = async (req, res) => {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, problemas, participantes, estado, creador, generado_IA, modelo_usado } = req.body;
    
    const nuevoMaraton = new Maraton({ nombre, descripcion, fecha_inicio, fecha_fin, problemas, participantes, estado, creador, generado_IA, modelo_usado });
    await nuevoMaraton.save();

    res.status(201).json({ mensaje: "Maratón creado exitosamente", maraton: nuevoMaraton });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el maratón", error });
  }
};

// Actualizar un maratón
export const actualizarMaraton = async (req, res) => {
  try {
    const maratonActualizado = await Maraton.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!maratonActualizado) return res.status(404).json({ mensaje: "Maratón no encontrado" });

    res.json({ mensaje: "Maratón actualizado", maraton: maratonActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el maratón", error });
  }
};

// Eliminar un maratón
export const eliminarMaraton = async (req, res) => {
  try {
    const maratonEliminado = await Maraton.findByIdAndDelete(req.params.id);
    if (!maratonEliminado) return res.status(404).json({ mensaje: "Maratón no encontrado" });

    res.json({ mensaje: "Maratón eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el maratón", error });
  }
};
