import { useState } from "react";
import axios from "axios";
import { NavBar } from "../components/NavBar";

export function Register () {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirm:"",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password !== formData.confirm) {
            alert("The passwords are not the same");
            return;
        }
        console.log("Data submitted: ", formData);

        try{
            const response = await axios.post("http://localhost:5000/api/usuarios/registro", formData);
            alert("Registro exitoso")
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
            <h1 className='font-bold text-6xl my-10'>Register</h1>

            <form onSubmit={handleSubmit} 
            className='flex flex-col space-y-3'>
                <input  type='text' 
                placeholder="name or username" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
                name="name"
                value={formData.name}
                onChange={handleChange}/>

                <input  
                type='text' 
                placeholder="email" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500' 
                name="email"
                value={formData.email}
                onChange={handleChange}/>

                <input  
                type='password' 
                placeholder="password" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'
                name="password"
                value={formData.password}
                onChange={handleChange}/>

                <input  
                type='password' 
                placeholder="confirm password" 
                className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500' 
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}/>

                <button 
                className="my-3 py-1 w-30 border-3 border-blue-500 rounded hover:border-blue-800"
                type="submit"
                >Register</button>
            </form>
            
        </div>
             
        </>
     
    )
}

