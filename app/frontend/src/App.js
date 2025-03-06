import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/usuarios")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Error al obtener usuarios:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {usuarios.map(user => (
          <li key={user._id}>{user.nombre} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
