import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Animation lors du chargement de la page
    const container = document.querySelector('.register-container');
    if (container) {
      container.classList.add('active');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification des mots de passe
    if (userData.password !== userData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simuler une requête d'inscription (à remplacer par une vraie API plus tard)
    setTimeout(() => {
      setIsLoading(false);
      // Rediriger vers la page de connexion après une inscription réussie
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-background"></div>
        
        <div className="register-form-container">
          <h1 className="register-title">Créer un compte</h1>
          <p className="register-subtitle">Rejoignez-nous pour accéder à votre espace personnel</p>
          
          {error && <div className="register-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={userData.nom}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  className="register-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={userData.prenom}
                  onChange={handleChange}
                  required
                  placeholder="Votre prénom"
                  className="register-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                placeholder="exemple@domaine.com"
                className="register-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="register-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="register-input"
              />
            </div>
            
            <button 
              type="submit" 
              className={`register-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'S\'inscrire'
              )}
            </button>
          </form>
          
          <div className="register-links">
            <p>Vous avez déjà un compte? <Link to="/login" className="login-link">Connectez-vous</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 