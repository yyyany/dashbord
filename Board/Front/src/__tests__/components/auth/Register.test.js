import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';
import apiService from '../services/api.service';

// Mock du service API
jest.mock('../services/api.service', () => ({
  register: jest.fn()
}));

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Helper pour rendre le composant avec le router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>{component}</BrowserRouter>
  );
};

describe('Composant Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('devrait rendre le formulaire d\'inscription', () => {
    renderWithRouter(<Register />);
    
    // Vérifier que les éléments du formulaire sont présents
    expect(screen.getByText('Créer un compte')).toBeInTheDocument();
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
    expect(screen.getByLabelText('Adresse email')).toBeInTheDocument();
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmez le mot de passe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
  });
  
  test('devrait mettre à jour les valeurs des champs lors de la saisie', () => {
    renderWithRouter(<Register />);
    
    // Simuler la saisie utilisateur
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmez le mot de passe'), { target: { value: 'password123' } });
    
    // Vérifier que les valeurs ont été mises à jour
    expect(screen.getByLabelText('Nom')).toHaveValue('Dupont');
    expect(screen.getByLabelText('Prénom')).toHaveValue('Jean');
    expect(screen.getByLabelText('Adresse email')).toHaveValue('jean.dupont@example.com');
    expect(screen.getByLabelText('Mot de passe')).toHaveValue('password123');
    expect(screen.getByLabelText('Confirmez le mot de passe')).toHaveValue('password123');
  });
  
  test('devrait afficher une erreur si les mots de passe ne correspondent pas', async () => {
    renderWithRouter(<Register />);
    
    // Remplir le formulaire avec des mots de passe différents
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmez le mot de passe'), { target: { value: 'password456' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Vérifier qu'un message d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
    });
    
    // Vérifier que l'API n'a pas été appelée
    expect(apiService.register).not.toHaveBeenCalled();
  });
  
  test('devrait afficher une erreur si le mot de passe est trop court', async () => {
    renderWithRouter(<Register />);
    
    // Remplir le formulaire avec un mot de passe trop court
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Confirmez le mot de passe'), { target: { value: '123' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Vérifier qu'un message d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText('Le mot de passe doit contenir au moins 6 caractères')).toBeInTheDocument();
    });
    
    // Vérifier que l'API n'a pas été appelée
    expect(apiService.register).not.toHaveBeenCalled();
  });
  
  test('devrait appeler l\'API et rediriger après une inscription réussie', async () => {
    // Mock d'une réponse réussie
    apiService.register.mockResolvedValueOnce({ success: true });
    
    renderWithRouter(<Register />);
    
    // Remplir le formulaire correctement
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmez le mot de passe'), { target: { value: 'password123' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Vérifier que l'API a été appelée avec les bonnes données
    await waitFor(() => {
      expect(apiService.register).toHaveBeenCalledWith({
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        password: 'password123'
      });
    });
    
    // Vérifier qu'un message de succès est affiché
    await waitFor(() => {
      expect(screen.getByText('Compte créé avec succès ! Redirection vers la page de connexion...')).toBeInTheDocument();
    });
    
    // Vérifier la redirection après le délai
    jest.runAllTimers(); // Si vous utilisez jest.useFakeTimers()
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
  
  test('devrait afficher un message d\'erreur en cas d\'échec de l\'inscription', async () => {
    // Mock d'une réponse d'erreur
    const errorMessage = 'Cet email est déjà utilisé';
    apiService.register.mockRejectedValueOnce(new Error(errorMessage));
    
    renderWithRouter(<Register />);
    
    // Remplir le formulaire correctement
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmez le mot de passe'), { target: { value: 'password123' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Vérifier que l'API a été appelée
    await waitFor(() => {
      expect(apiService.register).toHaveBeenCalled();
    });
    
    // Vérifier qu'un message d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
    // Vérifier qu'il n'y a pas de redirection
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  
  test('devrait désactiver le bouton pendant le chargement', async () => {
    // Mock d'une réponse lente
    apiService.register.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000)));
    
    renderWithRouter(<Register />);
    
    // Remplir le formulaire correctement
    fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByLabelText('Prénom'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByLabelText('Adresse email'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmez le mot de passe'), { target: { value: 'password123' } });
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));
    
    // Vérifier que le bouton est désactivé pendant le chargement
    expect(screen.getByRole('button', { name: '' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '' })).toHaveClass('loading');
  });
}); 