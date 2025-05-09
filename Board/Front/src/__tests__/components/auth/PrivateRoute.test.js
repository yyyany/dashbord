import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../../../components/auth/PrivateRoute';

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

// Composant fictif pour tester la route protégée
const DashboardComponent = () => <div>Dashboard Content</div>;
const LoginComponent = () => <div>Login Page</div>;

describe('Composant PrivateRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });
  
  test('devrait autoriser l\'accès au Dashboard quand l\'utilisateur est authentifié', () => {
    // Simuler un utilisateur connecté
    localStorageMock.getItem.mockImplementation((key) => key === 'isAuthenticated' ? 'true' : null);
    
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    
    // Vérifier que le contenu du Dashboard est rendu
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
    // Vérifier que la page de login n'est pas rendue
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
  
  test('devrait rediriger vers la page de login quand l\'utilisateur n\'est pas authentifié', () => {
    // Simuler un utilisateur non connecté
    localStorageMock.getItem.mockImplementation(() => null);
    
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    
    // Vérifier que la page de login est rendue
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    // Vérifier que le contenu du Dashboard n'est pas rendu
    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument();
  });
}); 