import Usuario from "../models/usuario.js";
import generarJWT from "../middleware/generarJWT.js"; // Para generar el token
import bcrypt from "bcrypt";

//  Obtener todos los usuarios 
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contraseña"); // No enviamos la contraseña
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error });
  }
};

//obtener usuario por rol
export const obtenerUsuarioRol = async (req, res) => {
  try {
    const { rol } = req.params;

    const usuarios = await Usuario.find({rol});
    res.json(usuarios);
  }catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios por rol", error });
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

// Actualizar rol de usuario 
export const actualizarRol = async(req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  try {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
          return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      usuario.rol = rol || usuario.rol;
      await usuario.save();

      res.json({ mensaje: 'Usuario actualizado', usuario });
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
}


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
    const { nombre , correo, contraseña, nivel, rol } = req.body;//123456

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) return res.status(400).json({ mensaje: "El correo ya está registrado" });

    const salt = await bcrypt.genSalt(10); // 12345874587trretjregjgrt3298r234u435u4r3ettrejutreu345tjuretuertu
    const contraseñaHasheada = await bcrypt.hash(contraseña, salt); // 2$B372473425/fjfsjhsue/wdaeaef/

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: contraseñaHasheada, nivel, rol });
    await nuevoUsuario.save();

    const token = generarJWT(nuevoUsuario._id);

    res.status(201).json({ mensaje: "Usuario registrado", usuario: nuevoUsuario, token });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el registro", error: error.message});
  }
};

// Login de Usuario 
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = generarJWT(usuario._id);

    res.json({ mensaje: "Login exitoso", usuario, token });
    
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el login", error: error.message });
  }
};

// Actualizar nivel de usuario

export const actualizarProgreso = async (req, res) => {
  const usuarioId = req.usuario._id;  // lo sacas del token (req.usuario)
  const { puntos } = req.body;

  try {
    const usuario = await Usuario.findById(usuarioId);
    usuario.progreso += puntos;

    if (!usuario.ejerciciosResueltos.includes(idEjercicio)) {
      usuario.ejerciciosResueltos.push(idEjercicio);
    }
    
    await usuario.save();

    res.json({
      mensaje: 'Progreso actualizado exitosamente',
      progreso: usuario.progreso
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar progreso',
      error: error.message
    });
  }
};