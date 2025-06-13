import { useEffect, useState } from "react";
import { DashboardNavBar } from "../components/dashBoardNav";
import { UploadPDF } from "../components/UploadPDF";
import axios from "axios";

export function MathPage() {
  const [ejercicios, setEjercicios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [nivelUsuario, setNivelUsuario] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState({});
  const [ejerciciosResueltos, setEjerciciosResueltos] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const mapNivel = (n) => (n <= 7 ? 1 : n <= 14 ? 2 : 3);
  const calcProgresoBloque = (n) => {
    const bloque = n <= 0 ? 0 : Math.floor((n - 1) / 7);
    return n <= 0 ? 0 : n - bloque * 7;
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(data);
        setNivelUsuario(data.nivel);
        setEjerciciosResueltos(data.ejerciciosResueltos || []);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        setUsuario({});
        setNivelUsuario(0);
      }
    })();
  }, []);

  useEffect(() => {
    if (nivelUsuario === null) return;
    const token = localStorage.getItem("token");
    const nivelEj = mapNivel(nivelUsuario);

    axios
      .get(`http://localhost:5000/api/ejercicios/cb?nivel=${nivelEj}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setEjercicios(res.data))
      .catch(err => {
        console.error("Error al cargar ejercicios:", err);
        setEjercicios([]);
      });

    axios
      .get("http://localhost:5000/api/archivos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const pdfsValidos = res.data.filter(pdf => pdf.ruta);
        setPdfs(pdfsValidos);
      })
      .catch(err => {
        console.error("Error al cargar PDFs:", err);
        setPdfs([]);
      });
  }, [nivelUsuario]);

  const validarRespuesta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const resp = respuestas[id];
      const { data } = await axios.post(
        "http://localhost:5000/api/ejercicios/validar",
        { idEjercicio: id, respuestaUsuario: resp },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResultados(prev => ({ ...prev, [id]: data.correcta }));

      if (data.correcta) {
        setEjerciciosResueltos(prev => [...prev, id]);
        await axios.put(
          "http://localhost:5000/api/usuarios/progreso",
          { puntos: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsuario(prev => ({ ...prev, nivel: Math.min(prev.nivel + 1, 21) }));
        setNivelUsuario(prev => Math.min(prev + 1, 21));
      }
    } catch (error) {
      console.error("Error al validar respuesta:", error);
    }
  };

  if (usuario === null || nivelUsuario === null) {
    return <div className="container mx-auto p-4">Cargando...</div>;
  }

  const progreso = calcProgresoBloque(nivelUsuario);
  const porcentaje = (progreso / 7) * 100;

  return (
    <>
      <DashboardNavBar />
      <div className="container mx-auto max-w-3xl px-4 mt-8 pb-8">
        <div className="mb-6 w-full bg-gray-300 rounded-full h-5 overflow-hidden">
          <div
            className="bg-blue-600 h-5 rounded-full transition-width duration-500"
            style={{ width: `${porcentaje}%` }}
            title={`Progreso nivel ${nivelUsuario}: ${Math.round(porcentaje)}%`}
          />
        </div>

        <h1 className="text-center text-2xl font-bold mb-6">
          Ejercicios — Nivel {mapNivel(nivelUsuario)}
        </h1>

        <ul className="space-y-6 mb-8">
          {ejercicios.length === 0 ? (
            <li className="text-gray-500">No hay ejercicios disponibles.</li>
          ) : (
            ejercicios
              .filter(ej => !ejerciciosResueltos.includes(ej._id))
              .map(ej => (
                <li key={ej._id} className="border-b pb-4">
                  <p><strong>Enunciado:</strong> {ej.enunciado}</p>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Tu respuesta"
                      value={respuestas[ej._id] || ""}
                      onChange={e =>
                        setRespuestas(prev => ({ ...prev, [ej._id]: e.target.value }))
                      }
                      className="border rounded px-2 py-1 flex-1"
                    />
                    <button
                      onClick={() => validarRespuesta(ej._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                    >
                      Validar
                    </button>
                  </div>
                  {resultados[ej._id] !== undefined && (
                    <p className={`mt-2 ${resultados[ej._id] ? "text-green-600" : "text-red-600"}`}>
                      {resultados[ej._id] ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
                    </p>
                  )}
                </li>
              ))
          )}
        </ul>

        {/* Sección de PDF visible a todos */}
        <div className="mt-12">
          <h2 className="text-left text-xl font-bold mb-4">Material adicional (PDF)</h2>
          {pdfs.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-left text-xl font-bold mb-4">Material adicional (PDF)</h2>
              <div className="space-y-8">
                {pdfs.map((pdf, index) => (
                  <div key={index} className="border p-2">
                    <p className="font-semibold mb-2">{pdf.nombre}</p>
                    <iframe
                      src={`http://localhost:5000/${pdf.ruta.replace(/\\/g, "/")}`}
                      width="100%"
                      height="500"
                      title={pdf.nombre}
                      className="block mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No hay PDFs disponibles aún.</p>
          )}

        </div>
        {/* Componente de subida visible solo para profesores */}
        {usuario.rol === "profesor" && (
          <UploadPDF
            userId={usuario._id}
            onUploadSuccess={() => {
              const token = localStorage.getItem("token");
              axios
                .get("http://localhost:5000/api/archivos", {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then(res => {
                  const pdfsValidos = res.data.filter(pdf => pdf.ruta);
                  setPdfs(pdfsValidos);
                })
                .catch(err => console.error("Error al recargar PDFs:", err));
            }}
          />
        )}
      </div>
    </>
  );
}
