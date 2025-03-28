import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../components/NavBar';


export function Login() {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const { data } = await axios.post("http://localhost:5000/api/usuarios/login", formData);
      localStorage.setItem("token", data.token);
      alert("Login exitoso");
      navigate('/dashboard')
    } catch (error) {
      alert(error.response?.data?.message || "Error en el login");
    }
  };

  return (
    <>
    
    <NavBar></NavBar>

    <div className='flex flex-col min-h-screen w-full max-w-md mx-auto items-center justify-center p-10'>
      <h1 className='font-bold text-6xl my-10'>Login</h1>

        <form className='flex flex-col items-center justify-center space-y-2' onSubmit={handleSubmit}>
          <input
          type=''
          name='correo'
          placeholder="correo"
          value={formData.correo}
          onChange={handleChange}
          className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
          required
        />
        <input
          type='password'
          name='contraseña'
          placeholder="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
          required
        />

        <button
          className="my-3 py-1 w-30 border-3 border-blue-500 rounded hover:border-blue-800"
          type='submit'
        >
          Login
        </button>
        <Link className='hover:text-blue-500' to="/register">Don't have an account? Register</Link>
      </form>
    </div>
      
    </>
  );
}
