
import { useNavigate } from "react-router-dom";
import { NavBar } from "./components/NavBar";


export function App() {
  const navigate = useNavigate();

  return (
    <>
    <NavBar></NavBar>
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="my-6 font-bold text-4xl sm:text-5xl text-gray-200">
        SapirLabs
      </h1>

      <img className="w-32 sm:w-48 my-4" src="/sapirLabs.svg" alt="SapirLabs Logo" />

      <button
        className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-64"
        onClick={() => navigate("/Login")}
      >
        Inicia sesión
      </button>

      <button
        className="my-2 bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg w-full sm:w-64"
        onClick={() => navigate("/Register")}
      >
        Registrate
      </button>
    </div>
  <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-900 shadow-xl">
    <p class="p-4 text-center">Bienvenido a sapirLabs!</p>
    <p class="p-4 text-center leading-snug">
    Nos alegra que formes parte de esta innovadora plataforma diseñada especialmente para estudiantes
    <br /> de sistemas de la Universidad Católica de Colombia. Aquí podrás fortalecer tus conocimientos en
    <br /> programación, inglés y ciencias básicas de forma interactiva, organizada y efectiva.
    </p>
  </div>
    </>
  );
}



