import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.get("/", (req,res) => {
    res.send("HOLA MAMI")
})


app.listen(5000, () => {
    connectDB();
    console.log("El servidor inicio en http://localhost:5000");

});

