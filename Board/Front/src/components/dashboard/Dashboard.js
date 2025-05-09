import React, { useState, useEffect } from 'react';
import './Dashboard.css';

/**
 * Dashboard moderne avec widgets interactifs et animations
 * Inspiré par Linear, Vercel, et Notion
 */
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulation de chargement de données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="dashboard-loader">
        <div className="loader-spinner"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Bonjour, <span className="highlight">Utilisateur</span> 👋</h1>
          <p className="date-today">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="actions-section">
          <button className="btn btn-primary">
            <span className="material-icons">add</span>
            Nouvelle tâche
          </button>
        </div>
      </header>
      
      <section className="dashboard-section visible">
        <div className="section-header">
          <h2>Bienvenue sur votre tableau de bord</h2>
        </div>
        
        <div className="empty-dashboard-message">
          <div className="empty-icon">
            <span className="material-icons">dashboard</span>
          </div>
          <h3>Tableau de bord prêt à l'emploi</h3>
          <p>Votre espace de travail a été configuré avec succès. Vous pouvez maintenant commencer à ajouter vos widgets et données personnalisées.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 