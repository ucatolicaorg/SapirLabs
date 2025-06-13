// src/components/UploadPDF.jsx
import { useState } from "react";
import axios from "axios";

export function UploadPDF({ userId, onUploadSuccess }) {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setMensaje("Selecciona un archivo PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", archivo);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/archivos/subir/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje("Archivo subido correctamente.");
      setArchivo(null);
      if (onUploadSuccess) onUploadSuccess(); // refresca los archivos si es necesario
    } catch (error) {
      console.error("Error al subir:", error);
      setMensaje("Error al subir el archivo.");
    }
  };

  return (
    <div className="border p-4 rounded mt-6">
      <h2 className="font-bold mb-2">Subir PDF</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="file" accept="application/pdf" onChange={handleArchivoChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        >
          Subir
        </button>
        {mensaje && <p className="text-sm text-gray-700">{mensaje}</p>}
      </form>
    </div>
  );
}
