import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/usuarios/login", {
        email,
        contraseña
      });
      localStorage.setItem("token", data.token);
      setMensaje("Login exitoso!");
      navigate("/"); // Redirige a la página principal (luego puedes cambiarla)
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error en el login");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <br />
        <button type="submit">Iniciar sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
      <p>
        ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
      </p>
    </div>
  );
}

export default Login;
  