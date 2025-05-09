import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../../components/auth/Login';
import apiService from '../../../services/api.service';

// Mock du service API
jest.mock('../../../services/api.service', () => ({
  login: jest.fn()
}));

// Mock de useNavigate et useLocation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ search: '' })
}));

// Mock de localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Helper pour rendre le composant avec le router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>{component}</BrowserRouter>
  );
};

describe('Composant Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });
  
  test('devrait rendre le formulaire de connexion', () => {
    renderWithRouter(<Login />);
    
    // Vérifier que les éléments du formulaire sont présents
    expect(screen.getByText('Tableau de Bord')).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse email')).toBeInTheDocument();
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
    expect(screen.getByText('Pas encore de compte ?')).toBeInTheDocument();
    expect(screen.getByText('Inscrivez-vous')).toBeInTheDocument();
  });
  
  test('devrait mettre à jour les valeurs des champs lors de la saisie', () => {
    renderWithRouter(<Login />);
    
    // Simuler la saisie utilisateur
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    
    // Vérifier que les valeurs ont été mises à jour
    expect(screen.getByLabelText('Adresse email')).toHaveValue('jean.dupont@example.com');
    expect(screen.getByLabelText('Mot de passe')).toHaveValue('password123');
  });
  
  test('devrait afficher un message d\'erreur si la connexion échoue', async () => {
    // Mock d'une réponse d'erreur
    const errorMessage = 'Email ou mot de passe incorrect';
    apiService.login.mockRejectedValueOnce(new Error(errorMessage));
    
    renderWithRouter(<Login />);
    
    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'mauvais_mot_de_passe' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    // Vérifier que l'API a été appelée
    await waitFor(() => {
      expect(apiService.login).toHaveBeenCalledWith({
        email: 'jean.dupont@example.com',
        password: 'mauvais_mot_de_passe'
      });
    });
    
    // Vérifier qu'un message d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
    // Vérifier qu'il n'y a pas de redirection
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  test('devrait connecter l\'utilisateur et rediriger vers le dashboard en cas de succès', async () => {
    // Mock d'une réponse réussie
    apiService.login.mockResolvedValueOnce({ 
      success: true,
      data: { 
        user: { id: '123', nom: 'Dupont', prenom: 'Jean' },
        token: 'fake-jwt-token'
      }
    });
    
    renderWithRouter(<Login />);
    
    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    // Vérifier que l'API a été appelée
    await waitFor(() => {
      expect(apiService.login).toHaveBeenCalledWith({
        email: 'jean.dupont@example.com',
        password: 'password123'
      });
    });
    
    // Vérifier la redirection
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
  
  test('devrait désactiver le bouton pendant le chargement', async () => {
    // Mock d'une réponse lente
    apiService.login.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000)));
    
    renderWithRouter(<Login />);
    
    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    // Vérifier que le bouton est désactivé pendant le chargement
    expect(screen.getByRole('button', { name: '' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '' })).toHaveClass('loading');
  });
  
  test('devrait afficher un message spécifique si redirection depuis une page protégée', () => {
    // Mock de useLocation avec un paramètre de requête
    jest.spyOn(require('react-router-dom'), 'useLocation').mockImplementation(() => ({
      search: '?reason=auth_required'
    }));
    
    renderWithRouter(<Login />);
    
    // Vérifier que le message est affiché
    expect(screen.getByText('Veuillez vous connecter pour accéder au tableau de bord')).toBeInTheDocument();
  });
  
  test('devrait bloquer l\'accès après trop de tentatives de connexion échouées', async () => {
    // Configurer le mock pour simuler 5 tentatives échouées
    apiService.login.mockRejectedValue(new Error('Email ou mot de passe incorrect'));
    
    // Simuler des tentatives précédentes
    localStorage.setItem('loginAttempts', '4'); // Une tentative de plus pour atteindre le seuil
    
    renderWithRouter(<Login />);
    
    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'mauvais_mot_de_passe' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    // Vérifier que l'API a été appelée
    await waitFor(() => {
      expect(apiService.login).toHaveBeenCalled();
    });
    
    // Vérifier que le compteur a été incrémenté
    expect(localStorage.setItem).toHaveBeenCalledWith('loginAttempts', '5');
    
    // Vérifier que l'accès est bloqué
    await waitFor(() => {
      expect(screen.getByText(/trop de tentatives échouées/i)).toBeInTheDocument();
    });
    
    // Vérifier que le bouton est désactivé
    expect(screen.getByRole('button', { name: /connexion/i })).toBeDisabled();
  });
}); 