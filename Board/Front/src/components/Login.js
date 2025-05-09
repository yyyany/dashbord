import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Login.css';
import apiService from '../services/api.service';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        navigate('/dashboard');
      } else {
        // Si la réponse est un succès mais que le backend indique une erreur
        setError(response.message || 'Échec de connexion');
      }
    } catch (error) {
      // Gérer les erreurs d'authentification
      setError(error.message || 'Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
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
              />
            </div>
            
            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
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