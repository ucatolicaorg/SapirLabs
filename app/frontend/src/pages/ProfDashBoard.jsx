import { ProfNavBar } from "../components/profNavBar";
import { useState } from "react";
import axios from "axios";

export function ProfDashBoard() {
  const [ejercicio, setEjercicio] = useState({
    competencia: "",
    nivel: 0,
    enunciado: "",
    respuesta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEjercicio((prev) => ({
      ...prev,
      [name]: name === "nivel" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ejercicios/crear",
        ejercicio
      );
      console.log("Ejercicio creado:", res.data);
      alert("Ejercicio creado correctamente");
    } catch (error) {
      console.error("Error al crear ejercicio:", error);
      alert("Hubo un error al crear el ejercicio");
    }
  };

  return (
    <>
      <ProfNavBar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-6xl">
          Creacion de ejercicios
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-20 my-20 ml-64">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>Competencia:</label>
          <select
            id="competencia"
            name="competencia"
            value={ejercicio.competencia}
            onChange={handleChange}
            className="px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione una opción</option>
            <option value="cb">Ciencias básicas</option>
            <option value="eng">English</option>
            <option value="cod">Codificación</option>
          </select>

          <label>Nivel:</label>
          <select
            id="nivel"
            name="nivel"
            value={ejercicio.nivel}
            onChange={handleChange}
            className="px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Seleccione un nivel</option>
            <option value={1}>Básico</option>
            <option value={2}>Intermedio</option>
            <option value={3}>Avanzado</option>
          </select>

          <label>Enunciado:</label>
          <input
            type="text"
            name="enunciado"
            value={ejercicio.enunciado}
            onChange={handleChange}
            className="px-2 py-1 border-2 border-gray-200 rounded hover:border-blue-500 caret-blue-500"
          />

          <label>Respuesta:</label>
          <input
            type="text"
            name="respuesta"
            value={ejercicio.respuesta}
            onChange={handleChange}
            className="px-2 py-1 border-2 border-gray-200 rounded hover:border-blue-500 caret-blue-500"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear ejercicio
          </button>
        </form>
      </div>
    </>
  );
}
