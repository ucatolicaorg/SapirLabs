import { useState, useEffect } from "react";
import axios from "axios";

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
        <div>
            <h1 className="text-4xl font-bold">Bienvenido, {usuario.nombre}!</h1>
            <p>Email: {usuario.email}</p>
            <p>Rol: {usuario.rol}</p>
        </div>
    );
}
