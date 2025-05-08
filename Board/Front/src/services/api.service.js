/**
 * Service de gestion des appels API
 */

// Détection automatique de l'URL de l'API en fonction de l'environnement
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://dashbord-production.up.railway.app';

/**
 * Options par défaut pour les requêtes fetch
 */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors',
  credentials: 'omit',
};

/**
 * Gestionnaire d'erreurs API
 * @param {Response} response - Réponse fetch
 * @returns {Promise} Résolution ou rejet de la promesse
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Erreur HTTP: ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 * Service API pour les tâches
 */
const tacheService = {
  /**
   * Récupérer toutes les tâches
   * @returns {Promise<Array>} Liste des tâches
   */
  async getAllTaches() {
    try {
      const response = await fetch(`${API_URL}/api/taches`, {
        method: 'GET',
        ...defaultOptions,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      throw error;
    }
  },

  /**
   * Créer une nouvelle tâche
   * @param {Object} tacheData - Données de la tâche à créer
   * @returns {Promise<Object>} Tâche créée
   */
  async createTache(tacheData) {
    try {
      const response = await fetch(`${API_URL}/api/taches`, {
        method: 'POST',
        ...defaultOptions,
        body: JSON.stringify(tacheData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      throw error;
    }
  },

  /**
   * Supprimer une tâche
   * @param {string} id - Identifiant de la tâche
   * @returns {Promise<Object>} Résultat de la suppression
   */
  async deleteTache(id) {
    try {
      const response = await fetch(`${API_URL}/api/taches/${id}`, {
        method: 'DELETE',
        ...defaultOptions,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour une tâche
   * @param {string} id - Identifiant de la tâche
   * @param {Object} tacheData - Nouvelles données
   * @returns {Promise<Object>} Tâche mise à jour
   */
  async updateTache(id, tacheData) {
    try {
      const response = await fetch(`${API_URL}/api/taches/${id}`, {
        method: 'PUT',
        ...defaultOptions,
        body: JSON.stringify(tacheData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      throw error;
    }
  },
};

export { tacheService }; 