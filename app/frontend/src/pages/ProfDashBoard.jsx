import { ProfNavBar } from "../components/profNavBar";
import { useState, useEffect } from "react";
import axios from "axios";

// Configuración global de axios con interceptor para token Bearer
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export function ProfDashBoard() {
  const [ejercicio, setEjercicio] = useState({
    competencia: "",
    nivel: 0,
    enunciado: "",
    respuesta: "",
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const getEstudiantes = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/usuarios/rol/estudiante/"
        );
        setEstudiantes(data);
      } catch (error) {
        console.error(error);
      }
    };
    getEstudiantes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEjercicio((prev) => ({
      ...prev,
      [name]: name === "nivel" ? parseInt(value) : value,
    }));
  };

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF.");
      e.target.value = null;
      setPdfFile(null);
      return;
    }
    setPdfFile(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("competencia", ejercicio.competencia);
    formData.append("nivel", ejercicio.nivel);
    formData.append("enunciado", ejercicio.enunciado);
    formData.append("respuesta", ejercicio.respuesta);
    if (pdfFile) formData.append("archivo", pdfFile);

    try {
      await axios.post(
        "http://localhost:5000/api/archivos/subir",
        formData
      );
      alert("Ejercicio creado" + (pdfFile ? " con PDF incluido." : " sin PDF."));
    } catch (err) {
      console.error(err);
      alert("Hubo un error al crear el ejercicio.");
    }
  }


  return (
    <>
      <ProfNavBar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-6xl">Creación de ejercicios</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-20 my-20 ml-64">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Competencia */}
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

          {/* Nivel */}
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

          {/* Enunciado */}
          <label>Enunciado:</label>
          <input
            type="text"
            name="enunciado"
            value={ejercicio.enunciado}
            onChange={handleChange}
            className="px-2 py-1 border-2 border-gray-200 rounded hover:border-blue-500 caret-blue-500"
          />

          {/* Respuesta */}
          <label>Respuesta:</label>
          <input
            type="text"
            name="respuesta"
            value={ejercicio.respuesta}
            onChange={handleChange}
            className="px-2 py-1 border-2 border-gray-200 rounded hover:border-blue-500 caret-blue-500"
          />

          {/* PDF opcional */}
          <label
            htmlFor="pdfFile"
            className="mt-4 text-sm font-medium text-gray-200"
          >
            Subir PDF (opcional):
          </label>
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleFileChange}
            className="
              block w-full cursor-pointer bg-gray-700 border border-gray-500 text-white
              file:mr-4 file:py-2 file:px-4 file:border-0
              file:text-sm file:font-medium
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
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
