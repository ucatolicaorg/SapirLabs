import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { App } from './App.jsx';
import  {Login}  from './pages/Login.jsx';
import { Register }  from './pages/Register.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Math } from './pages/Math.jsx';
import { English } from './pages/English.jsx';
import { Coding } from './pages/Coding.jsx';
import { ProfDashBoard } from './pages/ProfDashBoard.jsx';
import { AdminDashboard } from './pages/AdminDashBoard.jsx';
import { EstudianteDashBoard } from './pages/estudianteDash.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profdash' element={<ProfDashBoard />}/>
      <Route path='/admindash' element={<AdminDashboard />}/>
      <Route path='estudiantedash' element={<EstudianteDashBoard/>}/>
      <Route path='/math' element={<Math/>}/>
      <Route path='/english' element={<English/>}/>
      <Route path='/coding' element={<Coding/>}/>
    </Routes>
  </BrowserRouter>
)
