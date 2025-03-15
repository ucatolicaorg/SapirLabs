
export function Registro () {
    return (
        <>
             <h1 className='font-bold text-6xl my-10'>Registro</h1>

            <div className='flex flex-col space-y-2'>
                <input  type='text' placeholder="nombre" className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'/>
                <input  type='password' placeholder="email" className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500' />
                <input  type='text' placeholder="password" className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500'/>
                <input  type='password' placeholder="confirmar password" className='px-2 py-1 border-2 border-white-800 rounded hover:border-blue-500 caret-blue-500' />
            </div>
            <button className="my-3 py-1 w-30 border-3 border-blue-500 rounded hover:border-blue-800">Registrarse</button>
        </>
     
    )
}

