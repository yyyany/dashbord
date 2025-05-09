const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../utils/config');

/**
 * Service pour gérer l'authentification des utilisateurs
 */
class AuthService {
  /**
   * Inscrit un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur
   * @returns {Promise<Object>} Utilisateur créé
   */
  async register(userData) {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Hasher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Créer un nouvel utilisateur
      const newUser = new User({
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        password: hashedPassword
      });

      // Sauvegarder l'utilisateur
      const savedUser = await newUser.save();

      // Ne pas renvoyer le mot de passe
      const userObject = savedUser.toObject();
      delete userObject.password;

      return userObject;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Connecte un utilisateur existant
   * @param {string} email - Email de l'utilisateur
   * @param {string} password - Mot de passe en clair
   * @returns {Promise<Object>} Utilisateur et token
   */
  async login(email, password) {
    try {
      // Chercher l'utilisateur
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Créer un token JWT
      const token = this.generateToken(user._id);

      // Ne pas renvoyer le mot de passe
      const userObject = user.toObject();
      delete userObject.password;

      return {
        user: userObject,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Génère un token JWT pour un utilisateur
   * @param {string} userId - ID de l'utilisateur
   * @returns {string} Token JWT
   */
  generateToken(userId) {
    return jwt.sign(
      { id: userId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
  }

  /**
   * Vérifie un token JWT
   * @param {string} token - Token JWT à vérifier
   * @returns {Promise<Object>} Payload décodé
   */
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      return decoded;
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  }

  /**
   * Récupère un utilisateur à partir de son ID
   * @param {string} userId - ID de l'utilisateur
   * @returns {Promise<Object>} Utilisateur
   */
  async getUserById(userId) {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService(); 