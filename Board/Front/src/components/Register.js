import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import apiService from '../services/api.service';

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
  const [success, setSuccess] = useState('');
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
    
    // Réinitialiser les états
    setError('');
    setSuccess('');
    
    // Vérification des mots de passe
    if (userData.password !== userData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Vérification de la longueur du mot de passe
    if (userData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    setIsLoading(true);

    try {
      // Envoyer les données au serveur
      const response = await apiService.register({
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        password: userData.password
      });

      // En cas de succès
      setSuccess('Compte créé avec succès ! Redirection vers la page de connexion...');
      
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setError(error.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-background"></div>
        
        <div className="register-form-container">
          <h1 className="register-title">Créer un compte</h1>
          <p className="register-subtitle">Rejoignez-nous pour accéder à votre espace personnel</p>
          
          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">{success}</div>}
          
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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