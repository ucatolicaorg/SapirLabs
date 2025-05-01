import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function AdminNavBar () {
    const navigate = useNavigate();
    const handleLogout = () => {
            localStorage.removeItem("token");
            navigate("/login");
        }
    
    return(
        <>
            <div className="flex flex-col items-center justify-start fixed left-0 top-0 h-screen w-64 p-6 gap-10 bg-gray-900 border border-neutral-700 rounded">
               <div className="flex items-center justify-center">
                  <img className="h-10 w-10" src="./sapirLabs.svg" alt="Logo SapirLabs" />
                  <Link to={"/admindash"} className="text-4xl font-bold">SapirLabs</Link>
                </div>
                  
                <div className="flex items">
                    <Link to={"/admindash"}>
                    Lista de usuarios
                   </Link>
                </div>

                <div>
                 <button className="w-30 h-10 rounded bg-blue-500 hover:bg-blue-700" onClick={handleLogout}>
                    Cerrar sesión</button>
                </div>

            </div>
        </>
    );
}