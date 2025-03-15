import { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      navigate('/Dashboard')
    } catch (error) {
      alert(error.response?.data?.message || "Error en el login");
    }
  };

  return (
    <>
      <h1 className='font-bold text-6xl my-10'>Login</h1>

      <form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className='px-2 py-1 border-2 border-gray-800 rounded hover:border-blue-500 caret-blue-500'
          required
        />
        <input
          type='password'
          name='password'
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className='px-2 py-1 border-2 border-gray-800 rounded hover:border-blue-500 caret-blue-500'
          required
        />

        <button
          className="my-3 py-1 w-30 border-3 border-blue-500 rounded hover:border-blue-800"
          type='submit'
        >
          Iniciar sesión
        </button>
        <a href="/Registro">No tienes cuenta? Regístrate</a>
      </form>
    </>
  );
}
