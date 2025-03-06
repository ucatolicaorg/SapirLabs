import Usuario from "../models/usuario.js";
import generarJWT from "../middleware/generarJWT.js"; 
import bcrypt from "bcrypt";

//  Obtener todos los usuarios 
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contraseña"); 
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

//  Obtener un usuario por ID 
export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-contraseña");
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el usuario", error });
  }
};

//  Crear un usuario manualmente 
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, nivel, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ mensaje: "El email ya está registrado" });

    const salt = await bcrypt.genSalt(10);
    const contraseñaHasheada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({ nombre, email, contraseña: contraseñaHasheada, nivel, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear el usuario", error });
  }
};

//  Actualizar un usuario 
export const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email, nivel, rol } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { nombre, email, nivel, rol },
      { new: true }
    );

    if (!usuarioActualizado) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json({ mensaje: "Usuario actualizado", usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el usuario", error });
  }
};

//  Eliminar un usuario 
export const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el usuario", error });
  }
};

// Registrar Usuario 
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, nivel, rol } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ mensaje: "El email ya está registrado" });

    const salt = await bcrypt.genSalt(10);
    const contraseñaHasheada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({ nombre, email, contraseña: contraseñaHasheada, nivel, rol });
    await nuevoUsuario.save();

    const token = generarJWT(nuevoUsuario._id);

    res.status(201).json({ mensaje: "Usuario registrado", usuario: nuevoUsuario, token });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el registro", error });
  }
};

// Login de Usuario 
export const loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = generarJWT(usuario._id);

    res.json({ mensaje: "Login exitoso", usuario, token });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el login", error });
  }
};
