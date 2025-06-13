// src/main.jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { App } from './App.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { ProfDashBoard } from './pages/ProfDashBoard.jsx';
import { AdminDashboard } from './pages/AdminDashBoard.jsx';
import { EstudianteDashBoard } from './pages/estudianteDash.jsx';
import { MathPage } from './pages/MathPage.jsx'; // ✅ renombrado
import { English } from './pages/English.jsx';
import { Coding } from './pages/Coding.jsx';
import { ListaEstudiantes } from './pages/ListaEstudiantes.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx'; // ✅ Importado ErrorBoundary


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profdash" element={<ProfDashBoard />} />
      <Route path="/admindash" element={<AdminDashboard />} />
      <Route path="/estudiantedash" element={<EstudianteDashBoard />} />

      {/* Ruta corregida y envuelta en ErrorBoundary */}
      <Route
        path="/math"
        element={
          <ErrorBoundary>
            <MathPage />
          </ErrorBoundary>
        }
      />

      <Route path="/english" element={<English />} />
      <Route path="/coding" element={<Coding />} />
      <Route path="/listaEstudiantes" element={<ListaEstudiantes />} />
    </Routes>
  </BrowserRouter>
);
