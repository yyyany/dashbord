import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

/**
 * Layout principal de l'application
 * Intègre Sidebar et Header avec gestion responsive
 */
const Layout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(window.innerWidth >= 1024);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const layoutRef = useRef(null);
  
  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      setMobileView(isMobile);
      
      // Sur mobile et tablette, le sidebar est masqué par défaut
      if (isMobile || isTablet) {
        setSidebarExpanded(false);
      } else {
        setSidebarExpanded(true);
      }
    };
    
    // Ajouter un délai pour éviter les saccades lors du redimensionnement
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    handleResize(); // Appel initial
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Effet pour appliquer le thème sombre au chargement
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  // Améliorer les performances d'animation du layout
  useEffect(() => {
    const layout = layoutRef.current;
    if (layout) {
      layout.style.willChange = 'margin-left';
      
      const onTransitionEnd = () => {
        layout.style.willChange = 'auto';
      };
      
      layout.addEventListener('transitionend', onTransitionEnd);
      return () => layout.removeEventListener('transitionend', onTransitionEnd);
    }
  }, []);
  
  // Toggle du sidebar avec une animation fluide
  const toggleSidebar = () => {
    if (layoutRef.current) {
      layoutRef.current.style.willChange = 'margin-left';
    }
    setSidebarExpanded(!sidebarExpanded);
  };
  
  // Toggle du mode sombre
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Mettre à jour localStorage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    // Appliquer ou retirer la classe dark-mode
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };
  
  return (
    <div 
      ref={layoutRef} 
      className={`layout ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'} ${darkMode ? 'dark-mode' : ''}`} 
      style={{ paddingTop: '70px' }}
    >
      <Sidebar 
        isExpanded={sidebarExpanded} 
        toggleSidebar={toggleSidebar} 
        darkMode={darkMode}
      />
      <div className="layout-content">
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 