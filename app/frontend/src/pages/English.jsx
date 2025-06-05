import { useEffect, useState } from "react";
import { DashboardNavBar } from "../components/dashBoardNav";
import axios from "axios";

export function English() {
  const [ejercicios, setEjercicios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [nivelUsuario, setNivelUsuario] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState({});
  const [ejerciciosResueltos, setEjerciciosResueltos] = useState([]);

  useEffect(() => {
    // Función para obtener los datos del usuario
    const getUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(data);

        // Esto lo puedes manejar aquí también, ajustando según el nivel de usuario
        const nivel = data.nivel <= 7 ? 1 : data.nivel <= 15 ? 2 : 3;
        setNivelUsuario(nivel);
        setEjerciciosResueltos(data.ejerciciosResueltos || []);
      } catch (error) {
        console.error("Error al obtener datos de usuario: ", error);
      }
    };

    getUsuario();
  }, []);

  useEffect(() => {
    if (nivelUsuario === null) return; // Asegurarse de que el nivel está disponible antes de continuar

    const getEjercicios = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:5000/api/ejercicios/eng?nivel=${nivelUsuario}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Ejercicios recibidos:", data);
        setEjercicios(data);
      } catch (error) {
        console.error("Error al obtener ejercicios: ", error.response || error.message);
      }
    };

    getEjercicios();
  }, [nivelUsuario]); // Ahora se ejecutará solo cuando 'nivelUsuario' se haya actualizado

  const validarRespuesta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const respuestaUsuario = respuestas[id];

      const { data } = await axios.post(
        "http://localhost:5000/api/ejercicios/validar",
        { idEjercicio: id, respuestaUsuario },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Respuesta validada:", data);
      const esCorrecta = data.correcta;
      setResultados({ ...resultados, [id]: esCorrecta });

      if (esCorrecta) {
        setEjerciciosResueltos([...ejerciciosResueltos, id]);

        await axios.put(
          "http://localhost:5000/api/usuarios/progreso",
          { puntos: 10 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Error al validar respuesta:", error);
    }
  };

  const handleChange = (e, id) => {
    setRespuestas({ ...respuestas, [id]: e.target.value });
  };

  if (!usuario || nivelUsuario === null) {
    return <div>Cargando...</div>; // O alguna pantalla de carga mientras se obtiene la información
  }

  return (
    <>
      <DashboardNavBar />
      <h1 className="mx-65 text-2xl font-bold">Exercise list (level {nivelUsuario}):</h1>

      <ul className="mx-65 mt-6">
        {ejercicios
          .filter((ej) => !ejerciciosResueltos.includes(ej._id)) // Filtrar ejercicios no resueltos
          .map((ej) => (
            <li key={ej._id} className="mb-6 border-b pb-4">
              <p>
                <strong>Enunciado:</strong> {ej.enunciado}
              </p>

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
