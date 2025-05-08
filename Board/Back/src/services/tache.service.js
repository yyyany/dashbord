const Tache = require('../models/tache.model');

/**
 * Service pour la gestion des tâches
 */
class TacheService {
    /**
     * Récupère toutes les tâches
     * @returns {Promise<Array>} Liste de tâches
     */
    async getAllTaches() {
        try {
            return await Tache.find().sort({ dateCreation: -1 });
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des tâches: ${error.message}`);
        }
    }

    /**
     * Crée une nouvelle tâche
     * @param {Object} tacheData Données de la tâche
     * @returns {Promise<Object>} Tâche créée
     */
    async createTache(tacheData) {
        try {
            const tache = new Tache(tacheData);
            return await tache.save();
        } catch (error) {
            throw new Error(`Erreur lors de la création de la tâche: ${error.message}`);
        }
    }

    /**
     * Supprime une tâche par son ID
     * @param {String} id ID de la tâche
     * @returns {Promise<Object|null>} Tâche supprimée ou null
     */
    async deleteTache(id) {
        try {
            return await Tache.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de la tâche: ${error.message}`);
        }
    }

    /**
     * Met à jour une tâche
     * @param {String} id ID de la tâche
     * @param {Object} tacheData Nouvelles données
     * @returns {Promise<Object|null>} Tâche mise à jour ou null
     */
    async updateTache(id, tacheData) {
        try {
            return await Tache.findByIdAndUpdate(
                id,
                tacheData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(`Erreur lors de la mise à jour de la tâche: ${error.message}`);
        }
    }
}

module.exports = new TacheService(); 