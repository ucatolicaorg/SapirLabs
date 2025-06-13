import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../components/NavBar';

export function Login() {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Iniciar sesión y obtener token
      const { data } = await axios.post("http://localhost:5000/api/usuarios/login", formData);
      localStorage.setItem("token", data.token);

      // 2. Obtener datos del usuario autenticado
      const userResponse = await axios.get("http://localhost:5000/api/usuarios/me", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const usuario = userResponse.data;
      console.log("Usuario autenticado:", usuario);

      // 3. Guardar userId en localStorage
      localStorage.setItem("userId", usuario._id);

      // 4. Redirigir según el rol
      switch (usuario.rol) {
        case 'admin':
          navigate('/admindash');
          break;
        case 'profesor':
          navigate('/profdash');
          break;
        default:
          navigate('/estudiantedash');
      }

    } catch (error) {
      console.error("Error en login:", error);
      setError(error.response?.data?.mensaje || "Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-col min-h-screen w-full max-w-md mx-auto items-center justify-center p-10'>
        <h1 className='font-bold text-4xl mb-6 text-center'>Iniciar sesión</h1>

        {error && (
          <p className="text-red-600 mb-4 text-center font-semibold">{error}</p>
        )}

        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='email'
            name='correo'
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
          <input
            type='password'
            name='contraseña'
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />

          <button
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            type='submit'
          >
            Iniciar sesión
          </button>

          <p className='text-center'>
            ¿No tienes cuenta?{" "}
            <Link className='text-blue-500 hover:underline' to="/register">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
