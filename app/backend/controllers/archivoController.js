// controllers/archivoController.js
import Archivo from "../models/Archivo.js";
import Usuario from "../models/usuario.js";
import path from "path";

// 🟢 Sirve un archivo PDF para vista previa
export const serveArchivo = async (req, res, next) => {
  try {
    const archivo = await Archivo.findById(req.params.archivoId);
    if (!archivo) return res.status(404).json({ mensaje: "Archivo no encontrado" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=" + archivo.nombre);
    res.sendFile(path.resolve(archivo.ruta));
  } catch (err) {
    next(err);
  }
};

// 🟢 Subida de archivo por parte del admin/docente
export const subirArchivo = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ mensaje: "Se requiere un archivo PDF" });

  try {
    const archivo = new Archivo({
      nombre: req.file.originalname,
      ruta: req.file.path,
      mimetype: req.file.mimetype
    });
    await archivo.save();

    const usuario = await Usuario.findById(req.params.userId);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    usuario.archivos.push(archivo._id);
    await usuario.save();

    res.status(201).json({ mensaje: "Archivo subido correctamente", archivo });
  } catch (err) {
    next(err);
  }
};

// 🟢 Obtener todos los archivos PDF subidos por un usuario (para mostrar al estudiante)
export const obtenerArchivosUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.userId).populate("archivos");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json(usuario.archivos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener archivos", error: err.message });
  }
};

// 🟢 Eliminar un archivo (opcional)
export const eliminarArchivo = async (req, res) => {
  try {
    const { userId, archivoId } = req.params;

    const usuario = await Usuario.findById(req.params.userId);

    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    usuario.archivos.pull(archivoId);
    await usuario.save();

    await Archivo.findByIdAndDelete(archivoId);

    res.json({ mensaje: "Archivo eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar archivo", error: err.message });
  }
};
