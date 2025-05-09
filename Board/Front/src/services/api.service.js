/**
 * Service pour gérer les appels API
 */
class ApiService {
  constructor() {
    // URL de base de l'API - détection automatique de l'environnement
    this.baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/api'
      : 'https://dashbord-production.up.railway.app/api';
  }

  /**
   * Configure les headers pour les requêtes
   * @param {boolean} includeToken - Indique s'il faut inclure le token d'authentification
   * @returns {Object} Headers pour la requête
   */
  getHeaders(includeToken = false) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (includeToken) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Enregistre un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur à enregistrer
   * @returns {Promise<Object>} Réponse de l'API
   */
  async register(userData) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  }

  /**
   * Connecte un utilisateur
   * @param {Object} credentials - Identifiants de connexion
   * @returns {Promise<Object>} Réponse de l'API avec token et données utilisateur
   */
  async login(credentials) {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la connexion');
      }
      
      // Sauvegarder le token dans le localStorage
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(data.data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  }

  /**
   * Récupère le profil de l'utilisateur connecté
   * @returns {Promise<Object>} Données du profil utilisateur
   */
  async getProfile() {
    try {
      const response = await fetch(`${this.baseUrl}/auth/profile`, {
        method: 'GET',
        headers: this.getHeaders(true)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération du profil');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur de récupération du profil:', error);
      throw error;
    }
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
  }

  /**
   * Récupère toutes les tâches
   * @returns {Promise<Array>} Liste des tâches
   */
  async getTaches() {
    try {
      const response = await fetch(`${this.baseUrl}/taches`, {
        method: 'GET',
        headers: this.getHeaders(true)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des tâches');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur de récupération des tâches:', error);
      throw error;
    }
  }

  /**
   * Crée une nouvelle tâche
   * @param {Object} tacheData - Données de la tâche à créer
   * @returns {Promise<Object>} Tâche créée
   */
  async createTache(tacheData) {
    try {
      const response = await fetch(`${this.baseUrl}/taches`, {
        method: 'POST',
        headers: this.getHeaders(true),
        body: JSON.stringify(tacheData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la création de la tâche');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur de création de tâche:', error);
      throw error;
    }
  }

  /**
   * Supprime une tâche
   * @param {string} id - ID de la tâche à supprimer
   * @returns {Promise<Object>} Résultat de la suppression
   */
  async deleteTache(id) {
    try {
      const response = await fetch(`${this.baseUrl}/taches/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(true)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression de la tâche');
      }
      
      return data;
    } catch (error) {
      console.error('Erreur de suppression de tâche:', error);
      throw error;
    }
  }
}

// Créer une instance de ApiService
const apiServiceInstance = new ApiService();

// Exporter l'instance
export default apiServiceInstance; 