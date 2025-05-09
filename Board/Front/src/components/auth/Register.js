import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/api.service';
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
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' });
  const [validation, setValidation] = useState({
    email: { valid: true, message: '' },
    password: { valid: true, message: '' },
    confirmPassword: { valid: true, message: '' }
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Animation lors du chargement de la page
    const container = document.querySelector('.register-container');
    if (container) {
      container.classList.add('active');
    }
  }, []);

  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = '';

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        message = 'Très faible';
        break;
      case 2:
        message = 'Faible';
        break;
      case 3:
        message = 'Moyen';
        break;
      case 4:
        message = 'Fort';
        break;
      case 5:
        message = 'Très fort';
        break;
      default:
        message = '';
    }

    return { score, message };
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validation en temps réel
    if (name === 'email') {
      if (!value) {
        setValidation(prev => ({
          ...prev,
          email: { valid: true, message: '' }
        }));
      } else if (!validateEmail(value)) {
        setValidation(prev => ({
          ...prev,
          email: { valid: false, message: 'Format d\'email invalide' }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          email: { valid: true, message: '' }
        }));
      }
    } else if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
      if (value.length < 6) {
        setValidation(prev => ({
          ...prev,
          password: { valid: false, message: 'Le mot de passe doit contenir au moins 6 caractères' }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          password: { valid: true, message: '' }
        }));
      }
      
      // Vérifier la confirmation du mot de passe
      if (userData.confirmPassword && value !== userData.confirmPassword) {
        setValidation(prev => ({
          ...prev,
          confirmPassword: { valid: false, message: 'Les mots de passe ne correspondent pas' }
        }));
      } else if (userData.confirmPassword) {
        setValidation(prev => ({
          ...prev,
          confirmPassword: { valid: true, message: '' }
        }));
      }
    } else if (name === 'confirmPassword') {
      if (value !== userData.password) {
        setValidation(prev => ({
          ...prev,
          confirmPassword: { valid: false, message: 'Les mots de passe ne correspondent pas' }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          confirmPassword: { valid: true, message: '' }
        }));
      }
    }
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
                className={`register-input ${!validation.email.valid ? 'input-error' : ''}`}
                disabled={isLoading}
              />
              {!validation.email.valid && (
                <div className="validation-error">{validation.email.message}</div>
              )}
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
                className={`register-input ${!validation.password.valid ? 'input-error' : ''}`}
                disabled={isLoading}
              />
              {!validation.password.valid && (
                <div className="validation-error">{validation.password.message}</div>
              )}
              {userData.password && (
                <div className={`password-strength-meter strength-${passwordStrength.score}`}>
                  <div className="strength-bar">
                    <div 
                      className="strength-bar-fill" 
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="strength-text">{passwordStrength.message}</div>
                </div>
              )}
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
                className={`register-input ${!validation.confirmPassword.valid ? 'input-error' : ''}`}
                disabled={isLoading}
              />
              {!validation.confirmPassword.valid && (
                <div className="validation-error">{validation.confirmPassword.message}</div>
              )}
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