import apiService from '../../services/api.service';

// Mock de fetch global
global.fetch = jest.fn();

// Réinitialiser les mocks après chaque test
beforeEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});

describe('ApiService', () => {
  // Tests pour la fonction register
  describe('register', () => {
    test('devrait enregistrer un utilisateur avec succès', async () => {
      // Préparation des données
      const mockUser = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        password: 'motdepasse123'
      };
      
      const mockResponse = {
        success: true,
        message: 'Utilisateur créé avec succès',
        data: { ...mockUser, password: undefined }
      };
      
      // Mock de la réponse fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      // Exécution de la fonction
      const result = await apiService.register(mockUser);
      
      // Vérifications
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Object),
          body: JSON.stringify(mockUser)
        })
      );
      expect(result).toEqual(mockResponse);
    });
    
    test('devrait gérer les erreurs d\'inscription', async () => {
      // Préparation des données
      const mockUser = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        password: 'motdepasse123'
      };
      
      const mockErrorResponse = {
        success: false,
        message: 'Cet email est déjà utilisé'
      };
      
      // Mock de la réponse fetch avec erreur
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse
      });
      
      // Vérification que l'erreur est bien gérée
      await expect(apiService.register(mockUser)).rejects.toThrow();
      
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
  
  // Tests pour la fonction login
  describe('login', () => {
    test('devrait connecter un utilisateur avec succès', async () => {
      // Préparation des données
      const credentials = {
        email: 'jean.dupont@example.com',
        password: 'motdepasse123'
      };
      
      const mockUser = {
        _id: '123',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        role: 'utilisateur'
      };
      
      const mockToken = 'fake-jwt-token';
      
      const mockResponse = {
        success: true,
        message: 'Connexion réussie',
        data: {
          user: mockUser,
          token: mockToken
        }
      };
      
      // Mock de la réponse fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      // Exécution de la fonction
      const result = await apiService.login(credentials);
      
      // Vérifications
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.any(Object),
          body: JSON.stringify(credentials)
        })
      );
      
      // Vérifier que le token et les données utilisateur sont bien stockés
      expect(localStorage.getItem('token')).toBe(mockToken);
      expect(localStorage.getItem('isAuthenticated')).toBe('true');
      expect(localStorage.getItem('userData')).toBe(JSON.stringify(mockUser));
      
      expect(result).toEqual(mockResponse);
    });
    
    test('devrait gérer les erreurs de connexion', async () => {
      // Préparation des données
      const credentials = {
        email: 'jean.dupont@example.com',
        password: 'motdepasseincorrect'
      };
      
      const mockErrorResponse = {
        success: false,
        message: 'Email ou mot de passe incorrect'
      };
      
      // Mock de la réponse fetch avec erreur
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse
      });
      
      // Vérification que l'erreur est bien gérée
      await expect(apiService.login(credentials)).rejects.toThrow();
      
      // Vérifier que rien n'a été stocké dans localStorage
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('isAuthenticated')).toBeNull();
      expect(localStorage.getItem('userData')).toBeNull();
      
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
  
  // Tests pour la fonction logout
  describe('logout', () => {
    test('devrait déconnecter l\'utilisateur et effacer les données de session', () => {
      // Setup - simuler un utilisateur connecté
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify({ name: 'Test User' }));
      
      // Exécution de la fonction
      apiService.logout();
      
      // Vérifications
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('isAuthenticated')).toBeNull();
      expect(localStorage.getItem('userData')).toBeNull();
    });
  });
  
  // Tests pour la fonction getProfile
  describe('getProfile', () => {
    test('devrait récupérer le profil utilisateur avec succès', async () => {
      // Setup - simuler un utilisateur connecté
      localStorage.setItem('token', 'test-token');
      
      const mockProfileResponse = {
        success: true,
        message: 'Profil récupéré avec succès',
        data: {
          _id: '123',
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          role: 'utilisateur'
        }
      };
      
      // Mock de la réponse fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProfileResponse
      });
      
      // Exécution de la fonction
      const result = await apiService.getProfile();
      
      // Vérifications
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/profile'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token'
          })
        })
      );
      
      expect(result).toEqual(mockProfileResponse);
    });
    
    test('devrait gérer les erreurs de récupération de profil', async () => {
      // Setup - simuler un utilisateur connecté
      localStorage.setItem('token', 'invalid-token');
      
      const mockErrorResponse = {
        success: false,
        message: 'Token invalide ou expiré'
      };
      
      // Mock de la réponse fetch avec erreur
      global.fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse
      });
      
      // Vérification que l'erreur est bien gérée
      await expect(apiService.getProfile()).rejects.toThrow();
      
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
  
  // Tests pour getHeaders
  describe('getHeaders', () => {
    test('devrait retourner les headers de base sans token', () => {
      const headers = apiService.getHeaders();
      
      expect(headers).toEqual({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });
    });
    
    test('devrait inclure le token dans les headers si requis', () => {
      // Setup - simuler un utilisateur connecté
      localStorage.setItem('token', 'test-token');
      
      const headers = apiService.getHeaders(true);
      
      expect(headers).toEqual({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer test-token'
      });
    });
    
    test('ne devrait pas inclure le token si non présent', () => {
      // Assurer qu'il n'y a pas de token
      localStorage.removeItem('token');
      
      const headers = apiService.getHeaders(true);
      
      expect(headers).toEqual({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });
    });
  });
}); 