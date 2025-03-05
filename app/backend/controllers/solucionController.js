import Solucion from "../models/solucion.js";
import Problema from "../models/problema.js";
import Usuario from "../models/usuario.js";

// Obtener todas las soluciones
export const obtenerSoluciones = async (req, res) => {
  try {
    const soluciones = await Solucion.find().populate("usuario problema");
    res.json(soluciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener soluciones", error });
  }
};

// Obtener una solución por ID
export const obtenerSolucion = async (req, res) => {
  try {
    const solucion = await Solucion.findById(req.params.id).populate("usuario problema");
    if (!solucion) return res.status(404).json({ mensaje: "Solución no encontrada" });
    res.json(solucion);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la solución", error });
  }
};

// Crear una nueva solución
export const crearSolucion = async (req, res) => {
  try {
    const { usuario, problema, codigo_fuente, lenguaje, estado, puntuacion } = req.body;

    // Verificar si el usuario y el problema existen
    const usuarioExistente = await Usuario.findById(usuario);
    const problemaExistente = await Problema.findById(problema);

    if (!usuarioExistente || !problemaExistente) {
      return res.status(400).json({ mensaje: "Usuario o problema no válido" });
    }

    const nuevaSolucion = new Solucion({ usuario, problema, codigo_fuente, lenguaje, estado, puntuacion });
    await nuevaSolucion.save();

    res.status(201).json({ mensaje: "Solución creada exitosamente", solucion: nuevaSolucion });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la solución", error });
  }
};

// Actualizar una solución
export const actualizarSolucion = async (req, res) => {
  try {
    const solucionActualizada = await Solucion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!solucionActualizada) return res.status(404).json({ mensaje: "Solución no encontrada" });

    res.json({ mensaje: "Solución actualizada", solucion: solucionActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la solución", error });
  }
};

// Eliminar una solución
export const eliminarSolucion = async (req, res) => {
  try {
    const solucionEliminada = await Solucion.findByIdAndDelete(req.params.id);
    if (!solucionEliminada) return res.status(404).json({ mensaje: "Solución no encontrada" });

    res.json({ mensaje: "Solución eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la solución", error });
  }
};
gi