const authController = require('../../controllers/auth.controller');
const authService = require('../../services/auth.service');

// Mock du service d'authentification
jest.mock('../services/auth.service', () => ({
  register: jest.fn(),
  login: jest.fn(),
}));

describe('AuthController', () => {
  // Variables pour les mocks de request et response
  let req;
  let res;
  
  // Réinitialiser les mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock de l'objet request
    req = {
      body: {}
    };
    
    // Mock de l'objet response
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });
  
  // Tests pour la méthode register
  describe('register', () => {
    test('devrait retourner une erreur 400 si des champs sont manquants', async () => {
      // Configurer la requête avec des données incomplètes
      req.body = {
        nom: 'Dupont',
        // prenom manquant
        email: 'jean.dupont@example.com',
        // password manquant
      };
      
      // Appeler la méthode du contrôleur
      await authController.register(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Tous les champs sont obligatoires',
        success: false
      }));
      expect(authService.register).not.toHaveBeenCalled();
    });
    
    test('devrait retourner une erreur 400 si le mot de passe est trop court', async () => {
      // Configurer la requête avec un mot de passe trop court
      req.body = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        password: '12345' // Moins de 6 caractères
      };
      
      // Appeler la méthode du contrôleur
      await authController.register(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Le mot de passe doit contenir au moins 6 caractères',
        success: false
      }));
      expect(authService.register).not.toHaveBeenCalled();
    });
    
    test('devrait créer un utilisateur avec succès', async () => {
      // Configurer la requête avec des données valides
      const userData = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        password: '123456'
      };
      req.body = userData;
      
      // Mock du service d'authentification
      const mockUser = { ...userData, _id: '123', password: undefined };
      authService.register.mockResolvedValueOnce(mockUser);
      
      // Appeler la méthode du contrôleur
      await authController.register(req, res);
      
      // Vérifier les assertions
      expect(authService.register).toHaveBeenCalledWith(userData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Utilisateur créé avec succès',
        success: true,
        data: mockUser
      }));
    });
    
    test('devrait retourner une erreur 400 si l\'email est déjà utilisé', async () => {
      // Configurer la requête avec des données valides
      req.body = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        password: '123456'
      };
      
      // Mock du service d'authentification avec une erreur d'email existant
      const errorMessage = 'Cet email est déjà utilisé';
      authService.register.mockRejectedValueOnce(new Error(errorMessage));
      
      // Appeler la méthode du contrôleur
      await authController.register(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: errorMessage,
        success: false
      }));
    });
    
    test('devrait retourner une erreur 500 en cas d\'erreur serveur', async () => {
      // Configurer la requête avec des données valides
      req.body = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        password: '123456'
      };
      
      // Mock du service d'authentification avec une erreur serveur
      const errorMessage = 'Erreur de base de données';
      authService.register.mockRejectedValueOnce(new Error(errorMessage));
      
      // Spy sur console.error pour éviter les logs dans les tests
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Appeler la méthode du contrôleur
      await authController.register(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Erreur serveur lors de l\'inscription',
        success: false,
        error: errorMessage
      }));
    });
  });
  
  // Tests pour la méthode login
  describe('login', () => {
    test('devrait retourner une erreur 400 si email ou mot de passe est manquant', async () => {
      // Configurer la requête avec des données incomplètes
      req.body = {
        email: 'jean.dupont@example.com',
        // password manquant
      };
      
      // Appeler la méthode du contrôleur
      await authController.login(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Email et mot de passe sont obligatoires',
        success: false
      }));
      expect(authService.login).not.toHaveBeenCalled();
    });
    
    test('devrait connecter un utilisateur avec succès', async () => {
      // Configurer la requête avec des données valides
      const credentials = {
        email: 'jean.dupont@example.com',
        password: '123456'
      };
      req.body = credentials;
      
      // Mock du service d'authentification
      const mockUser = { 
        _id: '123',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com'
      };
      const mockToken = 'fake-jwt-token';
      authService.login.mockResolvedValueOnce({
        user: mockUser,
        token: mockToken
      });
      
      // Appeler la méthode du contrôleur
      await authController.login(req, res);
      
      // Vérifier les assertions
      expect(authService.login).toHaveBeenCalledWith(credentials.email, credentials.password);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Connexion réussie',
        success: true,
        data: {
          user: mockUser,
          token: mockToken
        }
      }));
    });
    
    test('devrait retourner une erreur 401 si les identifiants sont incorrects', async () => {
      // Configurer la requête avec des données valides
      req.body = {
        email: 'jean.dupont@example.com',
        password: 'mauvais_mot_de_passe'
      };
      
      // Mock du service d'authentification avec une erreur d'identifiants
      const errorMessage = 'Email ou mot de passe incorrect';
      authService.login.mockRejectedValueOnce(new Error(errorMessage));
      
      // Spy sur console.error pour éviter les logs dans les tests
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Appeler la méthode du contrôleur
      await authController.login(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: errorMessage,
        success: false
      }));
    });
    
    test('devrait retourner une erreur 500 en cas d\'erreur serveur', async () => {
      // Configurer la requête avec des données valides
      req.body = {
        email: 'jean.dupont@example.com',
        password: '123456'
      };
      
      // Mock du service d'authentification avec une erreur serveur
      const errorMessage = 'Erreur de base de données';
      authService.login.mockRejectedValueOnce(new Error(errorMessage));
      
      // Spy sur console.error pour éviter les logs dans les tests
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Appeler la méthode du contrôleur
      await authController.login(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Erreur serveur lors de la connexion',
        success: false,
        error: errorMessage
      }));
    });
  });
  
  // Tests pour la méthode getProfile
  describe('getProfile', () => {
    test('devrait retourner les informations du profil utilisateur', async () => {
      // Configurer la requête avec un utilisateur
      const mockUser = { 
        _id: '123',
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com'
      };
      req.user = mockUser;
      
      // Appeler la méthode du contrôleur
      await authController.getProfile(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Profil récupéré avec succès',
        success: true,
        data: mockUser
      }));
    });
    
    test('devrait retourner une erreur 500 en cas d\'erreur serveur', async () => {
      // Provoquer une erreur
      req.user = null;
      
      // Spy sur console.error pour éviter les logs dans les tests
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Appeler la méthode du contrôleur qui va générer une erreur
      const error = new Error('Erreur inattendue');
      jest.spyOn(Promise, 'resolve').mockImplementationOnce(() => {
        throw error;
      });
      
      await authController.getProfile(req, res);
      
      // Vérifier les assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Erreur serveur lors de la récupération du profil',
        success: false,
        error: error.message
      }));
    });
  });
}); 