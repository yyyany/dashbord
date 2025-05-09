import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import apiService from '../../services/api.service';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Vérifier si l'utilisateur a été redirigé depuis le dashboard
    const params = new URLSearchParams(location.search);
    const redirectReason = params.get('reason');
    
    if (redirectReason === 'auth_required') {
      setError('Veuillez vous connecter pour accéder au tableau de bord');
    }
    
    // Animation lors du chargement de la page
    const container = document.querySelector('.login-container');
    if (container) {
      container.classList.add('active');
    }

    // Récupérer le nombre de tentatives précédentes
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    const lastAttemptTime = parseInt(localStorage.getItem('lastAttemptTime') || '0');
    const blockUntil = parseInt(localStorage.getItem('blockUntil') || '0');
    
    // Vérifier si le blocage est toujours actif
    const now = Date.now();
    if (blockUntil > now) {
      setIsBlocked(true);
      const remainingTime = Math.ceil((blockUntil - now) / 1000);
      setBlockTimer(remainingTime);
      startBlockTimer(remainingTime);
    } else if (now - lastAttemptTime > 30 * 60 * 1000) { // 30 minutes
      // Réinitialiser les tentatives après 30 minutes d'inactivité
      localStorage.setItem('loginAttempts', '0');
      setLoginAttempts(0);
    } else {
      setLoginAttempts(attempts);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [location]);

  const startBlockTimer = (seconds) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setBlockTimer(seconds);
    
    timerRef.current = setInterval(() => {
      setBlockTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsBlocked(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier si l'utilisateur est bloqué
    if (isBlocked) {
      setError(`Trop de tentatives échouées. Veuillez réessayer dans ${blockTimer} secondes.`);
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // Utiliser le service API pour se connecter
      const response = await apiService.login({
        email: credentials.email,
        password: credentials.password
      });

      // Si la connexion réussit, naviguer vers le dashboard
      if (response.success) {
        // Réinitialiser les tentatives de connexion
        localStorage.setItem('loginAttempts', '0');
        setLoginAttempts(0);
        navigate('/dashboard');
      } else {
        // Si la réponse est un succès mais que le backend indique une erreur
        handleLoginFailure();
        setError(response.message || 'Échec de connexion');
      }
    } catch (error) {
      // Gérer les erreurs d'authentification
      handleLoginFailure();
      setError(error.message || 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLoginFailure = () => {
    const attempts = loginAttempts + 1;
    setLoginAttempts(attempts);
    localStorage.setItem('loginAttempts', attempts.toString());
    localStorage.setItem('lastAttemptTime', Date.now().toString());
    
    // Bloquer l'utilisateur après 5 tentatives échouées
    if (attempts >= 5) {
      // Bloquer pendant 3 minutes (180 secondes)
      const blockDuration = 180 * 1000; // 3 minutes en millisecondes
      const blockUntil = Date.now() + blockDuration;
      localStorage.setItem('blockUntil', blockUntil.toString());
      
      setIsBlocked(true);
      startBlockTimer(180);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-background"></div>
        
        <div className="login-form-container">
          <h1 className="login-title">Tableau de Bord</h1>
          <p className="login-subtitle">Connectez-vous pour accéder à votre espace personnel</p>
          
          {error && <div className="login-error">{error}</div>}
          {isBlocked && (
            <div className="login-blocked">
              Trop de tentatives échouées. Veuillez réessayer dans {blockTimer} secondes.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="exemple@domaine.com"
                className="login-input"
                disabled={isLoading || isBlocked}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="login-input"
                disabled={isLoading || isBlocked}
              />
            </div>
            
            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading || isBlocked}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Connexion'
              )}
            </button>
          </form>
          
          <div className="login-links">
            <div className="login-links-row">
              <a href="#" className="forgot-password">Mot de passe oublié ?</a>
            </div>
            <div className="login-links-row register-prompt">
              <p>Pas encore de compte ? <Link to="/register" className="register-link">Inscrivez-vous</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 