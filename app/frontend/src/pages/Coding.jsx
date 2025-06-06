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

  // Función para mapear nivel usuario (0-21) a nivel ejercicio (1-3)
  const mapNivelUsuarioAEjercicio = (nivel) => {
    if (nivel <= 7) return 1;
    if (nivel <= 14) return 2;
    return 3;
  };

  // Función para calcular progreso dentro del bloque actual de 7 niveles
  const calcularProgresoBloque = (nivel) => {
    if (nivel <= 0) return 0;
    const bloque = Math.floor((nivel - 1) / 7);
    const nivelInicio = bloque * 7 + 1;
    const progresoBloque = nivel - nivelInicio + 1;
    return progresoBloque;
  };

  useEffect(() => {
    // Obtener usuario y establecer estado
    const getUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuario(data);
        setNivelUsuario(data.nivel); // nivel real (0-21)
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

        // Actualiza progreso en backend
        await axios.put(
          "http://localhost:5000/api/usuarios/progreso",
          { puntos: 1 }, // suponiendo 1 punto por nivel para simplificar
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Actualizar localmente el progreso del usuario
        setUsuario((prev) => ({
          ...prev,
          nivel: prev.nivel + 1 <= 21 ? prev.nivel + 1 : 21, // no pasar de 21
        }));

        // Actualizamos el nivelUsuario para refrescar ejercicios y barra
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
    return <div>Cargando...</div>;
  }

  // Datos para la barra de progreso
  const progresoBloque = calcularProgresoBloque(nivelUsuario);
  const porcentajeProgreso = (progresoBloque / 7) * 100;

  return (
    <>
      <DashboardNavBar />


      <div className="mx-65 mt-4 mb-8 w-full bg-gray-300 rounded-full h-5">
        <div
          className="bg-blue-600 h-5"
          style={{ width: `${porcentajeProgreso}%`, transition: "width 0.5s ease" }}
          title={`Progreso nivel ${nivelUsuario}: ${Math.round(porcentajeProgreso)}%`}
        />
      </div>

      <h1 className="mx-65 text-2xl font-bold mb-4">
        Exercise list (level {mapNivelUsuarioAEjercicio(nivelUsuario)} - Usuario nivel real: {nivelUsuario})
      </h1>

      <ul className="mx-65 mt-6">
        {ejercicios
          .filter((ej) => !ejerciciosResueltos.includes(ej._id))
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
