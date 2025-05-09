import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../components/NavBar';

export function Login() {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/usuarios/login", formData);
      localStorage.setItem("token", data.token);
      
      const userResponse = await axios.get("http://localhost:5000/api/usuarios/me", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
       
      });
      
  
      switch(userResponse.data.rol) {
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
      setError(error.response?.data?.message || "Error en el login");
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex flex-col min-h-screen w-full max-w-md mx-auto items-center justify-center p-10'>
        <h1 className='font-bold text-6xl my-10'>Iniciar sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form className='flex flex-col items-center justify-center space-y-2' onSubmit={handleSubmit}>
        <input
          type=''
          name='correo'
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
          required
        />
        <input
          type='password'
          name='contraseña'
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
          required
        />

        <button
          className="my-3 py-1 w-30 border-3 border-blue-500 rounded hover:border-blue-800"
          type='submit'
        >
          Iniciar sesión
        </button>
        <Link className='hover:text-blue-500' to="/register">No tienes cuenta? Registrate</Link>
        </form>
      </div>
    </>
  );
}