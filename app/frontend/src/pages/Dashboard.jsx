import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardNavBar } from "../components/dashBoardNav";
import { Link } from "react-router-dom";

export function Dashboard() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");


    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Obtener el token desde localStorage
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No hay token, por favor inicia sesión.");
                    return;
                }

                // Hacer la petición a la API
                const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Guardar usuario en el estado
                setUsuario(data);
            } catch (error) {
                setError("Error al obtener los datos del usuario.");
            }
        };

        fetchUser();
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!usuario) return <p>Cargando información...</p>;

    return (
        <>
            <DashboardNavBar></DashboardNavBar>
            <div className="flex flex-col items-center justify-start gap-10 ml-64">
                <h1 className="text-4xl font-bold">Bienvenid@, {usuario.nombre}!</h1>
            </div>

            <div className="flex items-center justify-center gap-20 my-20 ml-64">

  <Link to="/math" className="flex flex-col items-center gap-6 text-2xl font-bold transition-transform duration-300 group">
    <img
      className="w-72 h-72 object-cover transition-transform duration-300 group-hover:scale-110"
      src="https://cdn-icons-png.flaticon.com/512/4720/4720458.png"
      alt="math icon"
    />
    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400">Ciencias Básicas</span>
  </Link>


  <Link to="/english" className="flex flex-col items-center gap-6 text-2xl font-bold transition-transform duration-300 group">
    <img
      className="w-72 h-72 object-cover transition-transform duration-300 group-hover:scale-110"
      src="https://cdn-icons-png.flaticon.com/512/5511/5511398.png"
      alt="english icon"
    />
    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400">English</span>
  </Link>

 
  <Link to="/coding" className="flex flex-col items-center gap-6 text-2xl font-bold transition-transform duration-300 group">
    <img
      className="w-72 h-72 object-cover transition-transform duration-300 group-hover:scale-110"
      src="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-512.png"
      alt="coding icon"
    />
    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400">Codificación</span>
  </Link>
</div>

        </>
        
    );
}
