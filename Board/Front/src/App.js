import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import './App.css';
import './assets/styles/global.css';
import './assets/styles/components.css';
import './assets/styles/dark-mode.css';

function App() {
  // Fonction pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  // Ajouter les liens pour les polices et Material Icons
  useEffect(() => {
    // Ajout du lien pour Material Icons
    const materialIconsLink = document.createElement('link');
    materialIconsLink.rel = 'stylesheet';
    materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(materialIconsLink);
    
    // Vérifiez et appliquez la préférence de mode sombre
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add('dark-mode');
    }

    return () => {
      // Nettoyage lors du démontage du composant
      document.head.removeChild(materialIconsLink);
    };
  }, []);

  // Composant pour les routes protégées avec Layout
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login?reason=auth_required" />;
    }
    return <Layout>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        {/* Routes additionnelles protégées */}
        <Route path="/tasks" element={
          <ProtectedRoute>
            <div className="under-construction">
              <h2>Page des tâches</h2>
              <p>Cette section est en cours de développement</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/notes" element={
          <ProtectedRoute>
            <div className="under-construction">
              <h2>Page des notes</h2>
              <p>Cette section est en cours de développement</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <div className="under-construction">
              <h2>Page du calendrier</h2>
              <p>Cette section est en cours de développement</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <div className="under-construction">
              <h2>Page d'analyses</h2>
              <p>Cette section est en cours de développement</p>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
