const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  // Récupérer le token du header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }
  
  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Ajouter les informations de l'utilisateur à l'objet req
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
}; 