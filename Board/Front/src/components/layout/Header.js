import React from 'react';
import './Header.css';

/**
 * En-tête de l'application avec style pourpre moderne
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Dashboard</h1>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="/" className="active">Tâches</a></li>
            <li><a href="/notes">Notes</a></li>
            <li><a href="/calendar">Calendrier</a></li>
            <li><a href="/weather">Météo</a></li>
          </ul>
        </nav>
        
        <div className="user-menu">
          <button className="theme-toggle">
            <span className="material-icons">dark_mode</span>
          </button>
          <div className="user-profile">
            <span className="user-name">Utilisateur</span>
            <div className="avatar">
              <span>U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 