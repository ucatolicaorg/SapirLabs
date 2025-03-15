import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { App } from './App.jsx'
import  {Login}  from './pages/Login.jsx'
import {Registro}  from './pages/Registro.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/Registro' element={<Registro/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
)
