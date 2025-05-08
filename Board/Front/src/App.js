import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  // Fonction pour vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  // Composant pour les routes protégées
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
