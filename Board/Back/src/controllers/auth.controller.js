const authService = require('../services/auth.service');

/**
 * Contrôleur pour gérer l'authentification
 */
class AuthController {
  /**
   * Inscrit un nouvel utilisateur
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async register(req, res) {
    try {
      const { nom, prenom, email, password } = req.body;

      // Vérifier que les champs obligatoires sont présents
      if (!nom || !prenom || !email || !password) {
        return res.status(400).json({ 
          message: 'Tous les champs sont obligatoires',
          success: false
        });
      }

      // Vérifier que le mot de passe est assez long
      if (password.length < 6) {
        return res.status(400).json({ 
          message: 'Le mot de passe doit contenir au moins 6 caractères',
          success: false
        });
      }

      // Créer l'utilisateur via le service
      const user = await authService.register(req.body);

      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      
      // Gérer les erreurs spécifiques
      if (error.message === 'Cet email est déjà utilisé') {
        return res.status(400).json({ 
          message: error.message,
          success: false
        });
      }

      res.status(500).json({ 
        message: 'Erreur serveur lors de l\'inscription',
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Connecte un utilisateur existant
   * @param {Object} req - Requête Express
   * @param {Object} res - Réponse Express
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Vérifier que les champs obligatoires sont présents
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email et mot de passe sont obligatoires',
          success: false
        });
      }

      // Connecter l'utilisateur via le service
      const { user, token } = await authService.login(email, password);

      res.status(200).json({
        message: 'Connexion réussie',
        success: true,
        data: { user, token }
      });
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      
      // Gérer les erreurs spécifiques
      if (error.message === 'Email ou mot de passe incorrect') {
        return res.status(401).json({ 
          message: error.message,
          success: false
        });
      }

      res.status(500).json({ 
        message: 'Erreur serveur lors de la connexion',
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Récupère le profil de l'utilisateur connecté
   * @param {Object} req - Requête Express (avec l'utilisateur ajouté par le middleware)
   * @param {Object} res - Réponse Express
   */
  async getProfile(req, res) {
    try {
      res.status(200).json({
        message: 'Profil récupéré avec succès',
        success: true,
        data: req.user
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      res.status(500).json({ 
        message: 'Erreur serveur lors de la récupération du profil',
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new AuthController(); 