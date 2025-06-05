import { useEffect, useState } from "react";
import { DashboardNavBar } from "../components/dashBoardNav";
import axios from "axios";

export function Math() {
  const [ejercicios, setEjercicios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [nivelUsuario, setNivelUsuario] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState({});

  useEffect(() => {
    const getUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(data);
        const nivel = data.nivel <= 7 ? 1 : data.nivel <= 15 ? 2 : 3;
        setNivelUsuario(nivel);
      } catch (error) {
        console.error("Error al obtener datos de usuario: ", error);
      }
    };

    const getEjercicios = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/ejercicios/cb");
        setEjercicios(data);
      } catch (error) {
        console.error("Error al obtener ejercicios: ", error);
      }
    };

    getUsuario();
    getEjercicios();
  }, []);

  const ejerciciosFiltrados = ejercicios.filter((ej) => ej.nivel === nivelUsuario);

  const handleChange = (e, id) => {
    setRespuestas({ ...respuestas, [id]: e.target.value });
  };

  const validarRespuesta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const respuestaUsuario = respuestas[id];

      const { data } = await axios.post(
        "http://localhost:5000/api/ejercicios/validar",
        { idEjercicio: id, respuestaUsuario },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const esCorrecta = data.correcta;

      setResultados({ ...resultados, [id]: esCorrecta });

      if (esCorrecta) {
        setEjercicios((prevEjercicios) =>
          prevEjercicios.filter((ej) => ej._id !== id)
        );

        await axios.put(
          "http://localhost:5000/api/usuarios/progreso",
          { puntos: 10 }, 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsuario((prevUsuario) => ({
          ...prevUsuario,
          progreso: prevUsuario.progreso + 10,
        }));
      }
    } catch (error) {
      console.error("Error al validar respuesta: ", error);
    }
  };

  return (
    <>
      <DashboardNavBar />
      <h1 className="mx-65 text-2xl font-bold">
        Lista de ejercicios ciencias básicas (nivel {nivelUsuario}):
      </h1>

      <ul className="mx-65 mt-6">
        {ejerciciosFiltrados.map((ej) => (
          <li key={ej._id} className="mb-6 border-b pb-4">
            <p><strong>Enunciado:</strong> {ej.enunciado}</p>

            <input
              type="text"
              placeholder="Tu respuesta"
              value={respuestas[ej._id] || ""}
              onChange={(e) => handleChange(e, ej._id)}
              className="border rounded px-2 py-1 mt-2 mr-2"
            />
            <button
              onClick={() => validarRespuesta(ej._id)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Validar
            </button>

            {resultados[ej._id] !== undefined && (
              <p className={`mt-2 ${resultados[ej._id] ? "text-green-600" : "text-red-600"}`}>
                {resultados[ej._id] ? "¡Correcto!" : "Incorrecto, intenta de nuevo."}
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
