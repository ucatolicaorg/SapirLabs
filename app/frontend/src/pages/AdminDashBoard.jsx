import { useEffect, useState} from "react";
import axios from "axios";
import { DashboardNavBar } from "../components/dashBoardNav";
import { AdminNavBar } from "../components/adminNavBar";

export function AdminDashboard(){
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/usuarios/",
                    {headers: {Authorization: `Bearer ${token}`}}
                );
                setUsuarios(data);
            } catch (error) {
                console.error(error);
            }
        };
        getUsuarios();
    }, []);

    return(
        <>
            <AdminNavBar/>
            <h1 className="mx-65 text-4xl">Lista de usuarios</h1>

            <ul className="flex flex-col items-start justify-start mx-67 mt-6">
                
               
            {usuarios.map((usuario) => (
                <li key={usuario.id} className="mb-6 border-b pb-4">
                    <strong>Nombre de usuario: {usuario.nombre}</strong><br />
                    <strong>Correo: {usuario.correo}</strong><br />
                    <strong>Rol: {usuario.rol}</strong>
                </li>
            ))}

            </ul>
        </>
    );
}