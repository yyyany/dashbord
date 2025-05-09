import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  // Sinon, rendre les routes enfants (Outlet)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; 