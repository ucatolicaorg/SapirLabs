import GenIA from "../models/gen_IA.js";

// Obtener todas las generaciones IA
export const obtenerGeneracionesIA = async (req, res) => {
  try {
    const generaciones = await GenIA.find();
    res.json(generaciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener generaciones IA", error });
  }
};

// Obtener una generación IA por ID
export const obtenerGeneracionIA = async (req, res) => {
  try {
    const generacion = await GenIA.findById(req.params.id);
    if (!generacion) return res.status(404).json({ mensaje: "Generación IA no encontrada" });
    res.json(generacion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la generación IA", error });
  }
};

// Crear una nueva generación IA
export const crearGeneracionIA = async (req, res) => {
  try {
    const { tipo, parametros, resultado, modelo_usado, estado } = req.body;
    
    const nuevaGeneracionIA = new GenIA({ tipo, parametros, resultado, modelo_usado, estado });
    await nuevaGeneracionIA.save();

    res.status(201).json({ mensaje: "Generación IA creada exitosamente", generacion: nuevaGeneracionIA });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la generación IA", error });
  }
};

// Actualizar una generación IA
export const actualizarGeneracionIA = async (req, res) => {
  try {
    const generacionActualizada = await GenIA.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!generacionActualizada) return res.status(404).json({ mensaje: "Generación IA no encontrada" });

    res.json({ mensaje: "Generación IA actualizada", generacion: generacionActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la generación IA", error });
  }
};

// Eliminar una generación IA
export const eliminarGeneracionIA = async (req, res) => {
  try {
    const generacionEliminada = await GenIA.findByIdAndDelete(req.params.id);
    if (!generacionEliminada) return res.status(404).json({ mensaje: "Generación IA no encontrada" });

    res.json({ mensaje: "Generación IA eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la generación IA", error });
  }
};
