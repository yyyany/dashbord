const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../utils/config');

/**
 * Middleware pour vérifier l'authentification d'un utilisateur
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction suivante
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Vérifier si le header Authorization est présent
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Accès non autorisé. Token manquant' });
    }

    // Récupérer le token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Token manquant' });
    }

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, config.jwt.secret);
      
      // Récupérer l'utilisateur
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur introuvable' });
      }

      // Ajouter l'utilisateur à la requête
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

/**
 * Middleware pour vérifier si l'utilisateur est administrateur
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 * @param {Function} next - Fonction suivante
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Accès refusé. Privilèges administrateur requis' });
  }
};

module.exports = {
  authMiddleware,
  isAdmin
}; 