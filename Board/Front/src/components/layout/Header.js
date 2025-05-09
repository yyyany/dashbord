import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

/**
 * Header moderne sticky avec animations et effet de scroll
 */
const Header = ({ toggleSidebar, darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const headerRef = useRef(null);
  
  // Détection du scroll pour appliquer l'effet de background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Améliorer les performances d'animation du header
  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      const onTransitionStart = () => {
        header.style.willChange = 'backdrop-filter, background-color, box-shadow';
      };
      
      const onTransitionEnd = () => {
        header.style.willChange = 'auto';
      };
      
      header.addEventListener('transitionstart', onTransitionStart);
      header.addEventListener('transitionend', onTransitionEnd);
      
      return () => {
        header.removeEventListener('transitionstart', onTransitionStart);
        header.removeEventListener('transitionend', onTransitionEnd);
      };
    }
  }, []);
  
  // Fermer le dropdown de notifications quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsOpen && !event.target.closest('.notification-container')) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);
  
  return (
    <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <div className="header-container">
        <div className="header-left">
          <button 
            className="menu-toggle" 
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
            title="Toggle Sidebar"
          >
            <span className="material-icons">menu</span>
          </button>
          
          <div className={`search-container ${searchActive ? 'active' : ''}`}>
            <span className="material-icons search-icon">search</span>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="search-input"
              onFocus={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
            />
            {searchActive && (
              <button className="search-close" onClick={() => setSearchActive(false)}>
                <span className="material-icons">close</span>
              </button>
            )}
            {searchActive && (
              <div className="search-hints fade-in">
                <p className="hint-title">Suggestions</p>
                <ul className="hint-list">
                  <li>Tâches récentes</li>
                  <li>Projets actifs</li>
                  <li>Notifications</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="header-right">
          <div className="header-actions">
            <button className="header-action-btn">
              <span className="material-icons">help_outline</span>
            </button>
            
            <div className="notification-container">
              <button 
                className="header-action-btn notification-btn"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="material-icons">notifications</span>
                <span className="notification-badge">3</span>
              </button>
              
              {notificationsOpen && (
                <div className="notification-dropdown fade-in">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="clear-all">Tout effacer</button>
                  </div>
                  <div className="notification-list">
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <span className="material-icons" style={{color: 'var(--success)'}}>task_alt</span>
                      </div>
                      <div className="notification-content">
                        <p className="notification-text">Projet "Design UI" terminé</p>
                        <p className="notification-time">Il y a 5 minutes</p>
                      </div>
                    </div>
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <span className="material-icons" style={{color: 'var(--primary)'}}>person_add</span>
                      </div>
                      <div className="notification-content">
                        <p className="notification-text">Nouvel utilisateur ajouté à l'équipe</p>
                        <p className="notification-time">Il y a 2 heures</p>
                      </div>
                    </div>
                    <div className="notification-item">
                      <div className="notification-icon">
                        <span className="material-icons" style={{color: 'var(--warning)'}}>schedule</span>
                      </div>
                      <div className="notification-content">
                        <p className="notification-text">Rappel: Réunion à 14h00</p>
                        <p className="notification-time">Il y a 1 jour</p>
                      </div>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <a href="/notifications" className="view-all">Voir toutes les notifications</a>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              className="header-action-btn theme-toggle" 
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
              title={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              <span className="material-icons">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 