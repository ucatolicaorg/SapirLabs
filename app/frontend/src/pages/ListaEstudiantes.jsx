
import { ProfNavBar } from "../components/profNavBar";
import { useState, useEffect} from "react";
import axios from "axios";

export function ListaEstudiantes(){
    const [estudiantes, setEstudiantes] = useState([]);

      useEffect(() => {
        const getEstudiantes = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("http://localhost:5000/api/usuarios/rol/estudiante/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEstudiantes(data);

                const initialRoles = {};
                data.forEach((usuario) => {
                    initialRoles[usuario._id] = usuario.rol;
                });
                setRolInputs(initialRoles);
            } catch (error) {
                console.error(error);
            }
        };
        getEstudiantes();
    }, []);

    return(
    <>
    <ProfNavBar/>
     <div className="flex flex-col items-center justify-center">
      <h1>LISTA DE ESTUDIANTES</h1>
       <ul className="flex flex-col items-start justify-start mx-67 mt-6 space-y-6">
    {estudiantes.map((estudiante) => (
      <li key={estudiante._id} className="mb-6 border-b pb-4">
        <strong>Nombre:</strong> {estudiante.nombre}<br />
        <strong>Correo:</strong> {estudiante.correo}<br />
        <strong>Progreso:</strong> {estudiante.progreso}<br />
      </li>
    ))}
  </ul>
    </div>
    


    </>);
}