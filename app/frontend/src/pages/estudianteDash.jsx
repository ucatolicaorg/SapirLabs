import { useEffect, useState } from "react";
import { DashboardNavBar } from "../components/dashBoardNav";
import { Link } from "react-router-dom";
import axios from "axios";

export function EstudianteDashBoard() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/usuarios/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsuario(data);
            } catch (error) {
                console.error("Error al cargar el usuario:", error);
            }
        };
        fetchUsuario();
    }, []);

    if (!usuario) return <p>Cargando...</p>;

    return (
        <>
            <DashboardNavBar />
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
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400">
                        Ciencias Básicas
                    </span>
                </Link>

                <Link to="/english" className="flex flex-col items-center gap-6 text-2xl font-bold transition-transform duration-300 group">
                    <img
                        className="w-72 h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                        src="https://cdn-icons-png.flaticon.com/512/5511/5511398.png"
                        alt="english icon"
                    />
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400">
                        English
                    </span>
                </Link>

                <Link to="/coding" className="flex flex-col items-center gap-6 text-2xl font-bold transition-transform duration-300 group">
                    <img
                        className="w-72 h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                        src="https://cdn3.iconfinder.com/data/icons/luchesa-vol-9/128/Html-512.png"
                        alt="coding icon"
                    />
                    <span className="transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-400">
                        Codificación
                    </span>
                </Link>
            </div>
        </>
    );
}
