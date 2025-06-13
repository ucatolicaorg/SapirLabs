import { useEffect, useState } from "react";
import { DashboardNavBar } from "../components/dashBoardNav";
import axios from "axios";

export function Coding() {
  const [ejercicios, setEjercicios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [nivelUsuario, setNivelUsuario] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState({});
  const [ejerciciosResueltos, setEjerciciosResueltos] = useState([]);

  const mapNivelUsuarioAEjercicio = (nivel) => {
    if (nivel <= 7) return 1;
    if (nivel <= 14) return 2;
    return 3;
  };

  const calcularProgresoBloque = (nivel) => {
    if (nivel <= 0) return 0;
    const bloque = Math.floor((nivel - 1) / 7);
    const nivelInicio = bloque * 7 + 1;
    const progresoBloque = nivel - nivelInicio + 1;
    return progresoBloque;
  };

  useEffect(() => {
    const getUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(data);
        setNivelUsuario(data.nivel);
        setEjerciciosResueltos(data.ejerciciosResueltos || []);
      } catch (error) {
        console.error("Error al obtener datos de usuario: ", error);
      }
    };

    getUsuario();
  }, []);

  useEffect(() => {
    if (nivelUsuario === null) return;

    const nivelEjercicio = mapNivelUsuarioAEjercicio(nivelUsuario);

    const getEjercicios = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:5000/api/ejercicios/cod?nivel=${nivelEjercicio}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEjercicios(data);
      } catch (error) {
        console.error("Error al obtener ejercicios: ", error.response || error.message);
      }
    };

    getEjercicios();
  }, [nivelUsuario]);

  const validarRespuesta = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const respuestaUsuario = respuestas[id];

      const { data } = await axios.post(
        "http://localhost:5000/api/ejercicios/validar",
        { idEjercicio: id, respuestaUsuario },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const esCorrecta = data.correcta;
      setResultados((prev) => ({ ...prev, [id]: esCorrecta }));

      if (esCorrecta) {
        setEjerciciosResueltos((prev) => [...prev, id]);

        await axios.put(
          "http://localhost:5000/api/usuarios/progreso",
          { puntos: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUsuario((prev) => ({
          ...prev,
          nivel: prev.nivel + 1 <= 21 ? prev.nivel + 1 : 21,
        }));

        setNivelUsuario((prevNivel) => (prevNivel + 1 <= 21 ? prevNivel + 1 : 21));
      }
    } catch (error) {
      console.error("Error al validar respuesta:", error);
    }
  };

  const handleChange = (e, id) => {
    setRespuestas({ ...respuestas, [id]: e.target.value });
  };

  if (!usuario || nivelUsuario === null) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  const progresoBloque = calcularProgresoBloque(nivelUsuario);
  const porcentajeProgreso = (progresoBloque / 7) * 100;

  return (
    <>
      <DashboardNavBar />

      <div className="max-w-3xl mx-auto px-4">
        <div className="mt-6 mb-8 bg-gray-300 rounded-full h-5 w-full">
          <div
            className="bg-blue-600 h-5 rounded-full transition-all duration-500"
            style={{ width: `${porcentajeProgreso}%` }}
            title={`Nivel ${nivelUsuario}: ${Math.round(porcentajeProgreso)}%`}
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Coding Exercises (Level {mapNivelUsuarioAEjercicio(nivelUsuario)})
        </h1>

        <ul>
          {ejercicios
            .filter((ej) => !ejerciciosResueltos.includes(ej._id))
            .map((ej) => (
              <li key={ej._id} className="mb-6 border-b pb-4">
                <p className="mb-2">
                  <strong>Enunciado:</strong> {ej.enunciado}
                </p>

                <input
                  type="text"
                  placeholder="Tu respuesta"
                  value={respuestas[ej._id] || ""}
                  onChange={(e) => handleChange(e, ej._id)}
                  className="border rounded px-3 py-2 mr-2 w-full md:w-auto"
                />

                <button
                  onClick={() => validarRespuesta(ej._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
                >
                  Validar
                </button>

                {resultados[ej._id] !== undefined && (
                  <p className={`mt-2 ${resultados[ej._id] ? "text-green-600" : "text-red-600"}`}>
                    {resultados[ej._id] ? "Correct!" : "Incorrect, try again."}
                  </p>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
