import { useState, useEffect } from "react";
import axios from "axios";
import { ProfDashBoard } from "./ProfDashBoard";
import { AdminDashboard } from "./AdminDashBoard";
import { EstudianteDashBoard } from "./estudianteDash";

export function Dashboard() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No hay token, por favor inicia sesión.");
                    return;
                }

                const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsuario(data);
            } catch (error) {
                setError("Error al obtener los datos del usuario.");
            }
        };

        fetchUser();
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!usuario) return <p>Cargando informacion...</p>

    return (
    <></>
    );
}
