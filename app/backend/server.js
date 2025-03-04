import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Usuario from './models/usuario.js';

dotenv.config();

const app = express();

app.get("/", (req,res) => {
    res.send("HOLA BROo")
});

app.get("/register", (req, res) => {
    res.send("Hola Marian")
})

app.post("/register", async (req, res) => {
    const usuario = req.body;

    if(!usuario.nombre || !usuario.email || !usuario.password || !usuario.level){
        return res.status(400).json({succes: false, message: "Ingrese todos los datos"});
    }

    const newUsuario = new Usuario(usuario)

    try {
        await newUsuario.save();
        res.status(201).json({succes: true, data: newUsuario})
    } catch (error) {
        console.error("Error al registrar el usuario", error.message)
        res.status(500).json({succes: false, message: "Error del servidor"})
    }
});

const PORT = 5000;

app.listen(PORT, 'localhost', () => {
    connectDB();
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);

});

