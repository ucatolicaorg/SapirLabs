import { useEffect, useState } from "react";
import { DashboardNavBar } from "../components/dashBoardNav";
import axios from "axios";

export function Math () {
    const [ejercicios, setEjercicios] = useState(null);

    useEffect(() => {
        const getEjercicio = async () => {
            try {
                const competencia = "cb";

                const [data] = axios.post("https:/localhost:5000/api/ejercicios/crear", );

            } catch(error) {

            }
        };
    })
    return(
        <>
            <DashboardNavBar></DashboardNavBar>
            
            <h1 className="mx-65">Lista de ejercicios ciencias básicas:</h1>

        </>
    );
}