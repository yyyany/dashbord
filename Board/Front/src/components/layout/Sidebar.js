import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import apiService from '../../services/api.service';
import './Sidebar.css';

/**
 * Composant de barre latérale moderne
 * Complètement masquable avec animations fluides
 */
const Sidebar = ({ isExpanded, toggleSidebar, darkMode }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isVisible, setIsVisible] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  
  // Gestion de l'animation de disparition
  useEffect(() => {
    if (!sidebarRef.current) return;
    
    if (!isExpanded) {
      // Ajouter la classe 'closing' pour l'animation
      sidebarRef.current.classList.add('closing');
      sidebarRef.current.style.pointerEvents = 'none'; // Évite les interactions pendant l'animation
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        sidebarRef.current?.classList.remove('closing');
      }, 300); // Synchroniser avec la durée CSS
      
      return () => {
        clearTimeout(timer);
        if (sidebarRef.current) {
          sidebarRef.current.style.pointerEvents = '';
        }
      };
    } else {
      // Restaurer la visibilité immédiatement pour éviter le flash
      setIsVisible(true);
      
      // Pour une animation d'ouverture élégante
      if (sidebarRef.current) {
        sidebarRef.current.classList.remove('closing');
        
        // Permettre un rendu avant de retirer la classe
        requestAnimationFrame(() => {
          if (sidebarRef.current) {
            sidebarRef.current.style.pointerEvents = '';
          }
        });
      }
    }
  }, [isExpanded]);
  
  // Effet pour améliorer la performance des animations
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.style.willChange = 'transform, opacity';
      
      // Optimiser les animations en supprimant will-change après animation
      const onTransitionEnd = () => {
        sidebar.style.willChange = 'auto';
      };
      
      sidebar.addEventListener('transitionend', onTransitionEnd);
      return () => sidebar.removeEventListener('transitionend', onTransitionEnd);
    }
  }, []);
  
  // Fonction de déconnexion
  const handleLogout = () => {
    // Empêcher les doubles clics
    if (isLoggingOut) return;
    
    // Indiquer que la déconnexion est en cours
    setIsLoggingOut(true);
    
    // Ajouter une animation sur le bouton pour feedback visuel
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.classList.add('logging-out');
    }
    
    // Simuler un délai réseau
    setTimeout(() => {
      try {
        // Appeler la méthode de déconnexion du service API
        apiService.logout();
        
        // Afficher un message de confirmation
        console.log('Déconnexion réussie');
        
        // Assurer que toutes les données d'authentification sont supprimées
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        
        // Vider toute autre donnée utilisateur sensible si nécessaire
        sessionStorage.clear();
        
        // Rediriger vers la page de connexion avec un paramètre indiquant la déconnexion
        navigate('/login?reason=logout_success');
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        
        // Même en cas d'erreur, tenter de nettoyer les données d'authentification
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        
        // Rediriger vers la page de connexion avec indication d'erreur
        navigate('/login?reason=logout_error');
      } finally {
        // Assurer que l'état est réinitialisé quoi qu'il arrive
        setIsLoggingOut(false);
        if (logoutBtn) {
          logoutBtn.classList.remove('logging-out');
        }
      }
    }, 500);
  };
  
  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: 'dashboard', path: '/dashboard' },
    { id: 'tasks', label: 'Tâches', icon: 'task_alt', path: '/tasks' },
    { id: 'notes', label: 'Notes', icon: 'edit_note', path: '/notes' },
    { id: 'calendar', label: 'Calendrier', icon: 'calendar_month', path: '/calendar' },
    { id: 'analytics', label: 'Analyses', icon: 'insights', path: '/analytics' },
  ];
  
  const sections = [
    { id: 'workspace', label: 'Espace de travail' },
    { id: 'settings', label: 'Paramètres' }
  ];
  
  const workspaceItems = [
    { id: 'projects', label: 'Projets', icon: 'folder', path: '/projects' },
    { id: 'shared', label: 'Partagés', icon: 'group', path: '/shared' },
    { id: 'favorites', label: 'Favoris', icon: 'star', path: '/favorites' },
  ];
  
  const settingsItems = [
    { id: 'profile', label: 'Profil', icon: 'person', path: '/profile' },
    { id: 'settings', label: 'Paramètres', icon: 'settings', path: '/settings' },
  ];
  
  // Si la sidebar est masquée, on ne rend rien
  if (!isVisible && !isExpanded) {
    return null;
  }
  
  return (
    <aside 
      ref={sidebarRef}
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${darkMode ? 'dark-theme' : 'light-theme'}`}
    >
      <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      <div className={`sidebar-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">D</div>
            <span className="logo-text">Dashboard</span>
          </div>
          <button 
            className="toggle-btn" 
            onClick={toggleSidebar}
            title={isExpanded ? "Fermer le menu" : "Ouvrir le menu"}
            aria-label={isExpanded ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="material-icons">
              {isExpanded ? 'close' : 'menu'}
            </span>
          </button>
        </div>
        
        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <ul className="nav-list primary-nav">
              {navItems.map((item, index) => (
                <li key={item.id} className={`nav-item ${activeSection === item.id ? 'active' : ''}`}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (window.innerWidth < 768) toggleSidebar();
                    }}
                  >
                    <span className="material-icons icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            
            {sections.map(section => (
              <div key={section.id} className="sidebar-section">
                <h3 className="section-title">{section.label}</h3>
                <ul className="nav-list">
                  {(section.id === 'workspace' ? workspaceItems : settingsItems).map(item => (
                    <li key={item.id} className="nav-item">
                      <NavLink 
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          if (window.innerWidth < 768) toggleSidebar();
                        }}
                      >
                        <span className="material-icons icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">U</div>
            <div className="user-info">
              <p className="user-name">Utilisateur</p>
              <p className="user-email">utilisateur@mail.com</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="material-icons">logout</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
