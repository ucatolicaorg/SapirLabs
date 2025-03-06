import express from "express";
import { crearProfesor } from "../controllers/profController.js";

const router = express.Router();

router.post("/", crearProfesor);

export default router;