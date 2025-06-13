// archivoController.js
import Archivo from "../models/Archivo.js";
import Usuario from "../models/Usuario.js";

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
    usuario.archivos.push(archivo._id);
    await usuario.save();

    res.status(201).json({ mensaje: "Archivo subido", archivo });
  } catch (err) {
    next(err);
  }
};

// Obtiene archivos de un usuario
export const obtenerArchivosUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.userId).populate("archivos");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(usuario.archivos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error obteniendo archivos", error: err.message });
  }
};


// Opcional: eliminar archivo
export const eliminarArchivo = async (req, res) => {
  try {
    const { userId, archivoId } = req.params;
    const usuario = await Usuario.findById(userId);
    usuario.archivos.pull(archivoId);
    await usuario.save();
    await Archivo.findByIdAndDelete(archivoId);
    res.json({ mensaje: "Archivo eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error eliminando", error: err.message });
  }
};
