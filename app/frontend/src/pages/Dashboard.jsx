import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DashboardNavBar } from "../components/dashBoardNav";

export function Dashboard() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        alert("User have logout")
    }

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
            <div className="flex flex-col items-center justify-center gap-10 m-50">
                <h1 className="text-4xl font-bold">Bienvenido, {usuario.name}!</h1>
                <p>Email: {usuario.email}</p>
                <p>Rol: {usuario.rol}</p>
                <button className="w-30 h-10 rounded bg-blue-500 hover:bg-blue-700" onClick={handleLogout}>Logout</button>
            </div>
        </>
        
    );
}
