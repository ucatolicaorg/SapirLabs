import { useEffect, useState } from "react";
import axios from "axios";
import { AdminNavBar } from "../components/adminNavBar";

export function AdminDashboard() {
    const [usuarios, setUsuarios] = useState([]);
    const [rolInputs, setRolInputs] = useState({}); 

    useEffect(() => {
        const getUsuarios = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/usuarios/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsuarios(data);

                const initialRoles = {};
                data.forEach((usuario) => {
                    initialRoles[usuario._id] = usuario.rol;
                });
                setRolInputs(initialRoles);
            } catch (error) {
                console.error(error);
            }
        };
        getUsuarios();
    }, []);

    const handleInputChange = (id, value) => {
        setRolInputs({
            ...rolInputs,
            [id]: value
        });
    };

    const handleClick = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/usuarios/${id}`, 
                { rol: rolInputs[id] },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((usuario) =>
                    usuario._id === id ? { ...usuario, rol: rolInputs[id] } : usuario
                )
            );

            console.log(`Rol actualizado para usuario ${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const rolesDisponibles = ["estudiante", "profesor", "admin"];

    return (
        <>
            <AdminNavBar />
            <h1 className="mx-65 text-4xl">Lista de usuarios</h1>

            <ul className="flex flex-col items-start justify-start mx-67 mt-6 space-y-6">
                {usuarios.map((usuario) => (
                    <li key={usuario._id} className="mb-6 border-b pb-4">
                        <strong>Nombre de usuario: {usuario.nombre}</strong><br />
                        <strong>Correo: {usuario.correo}</strong><br />
                        <strong>Rol actual: {usuario.rol}</strong><br />

                        <div className="mt-2">
                            {rolesDisponibles.map((rol) => (
                                <label key={rol} className="mr-4">
                                    <input
                                        type="radio"
                                        name={`rol-${usuario._id}`}
                                        value={rol}
                                        checked={rolInputs[usuario._id] === rol}
                                        onChange={() => handleInputChange(usuario._id, rol)}
                                        className="mr-1"
                                    />
                                    {rol}
                                </label>
                            ))}
                        </div>

                        <button
                            className="w-30 h-10 mt-2 rounded bg-blue-500 hover:bg-blue-700 text-white px-4"
                            onClick={() => handleClick(usuario._id)}
                        >
                            Cambiar rol
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
