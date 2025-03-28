import { useState } from "react";
import axios from "axios";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export function Register () {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre:"",
        correo:"",
        contraseña:"",
        confirmar:"",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.contraseña !== formData.confirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log("Data submitted: ", formData);

        try{
            const response = await axios.post("http://localhost:5000/api/usuarios/registro", formData);
            alert("Registro exitoso")
            navigate("/login")
        }catch(error){
            console.error("Error en el registro:", error.response?.data || error.message);
            alert("Hubo un error en el registro");
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    return (
        <>
        <NavBar></NavBar>
        
        <div className="flex flex-col min-h-screen w-full max-w-md mx-auto items-center justify-center space-y-3 p-10">
            <h1 className='font-bold text-6xl my-10'>Registro</h1>

            <form onSubmit={handleSubmit} 
            className='flex flex-col space-y-3'>
                <input  type='text' 
                placeholder="nombre" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}/>

                <input  
                type='text' 
                placeholder="correo electrónico" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500' 
                name="correo"
                value={formData.correo}
                onChange={handleChange}/>

                <input  
                type='password' 
                placeholder="contraseña" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
                name="contraseña"
                value={formData.contraseña}
                onChange={handleChange}/>

                <input  
                type='password' 
                placeholder="confirmar contraseña" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500' 
                name="confirmar"
                value={formData.confirmar}
                onChange={handleChange}/>

                <button 
                className="my-3 py-1 w-30 border-3 border-blue-500 rounded hover:border-blue-800"
                type="submit"
                >Registrarse</button>
            </form>
            
        </div>
             
        </>
     
    )
}

