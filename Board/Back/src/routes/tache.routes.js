const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tache.controller');

/**
 * Routes pour les tâches
 */

// Récupérer toutes les tâches
router.get('/taches', tacheController.getAllTaches);

// Créer une nouvelle tâche
router.post('/taches', tacheController.createTache);

// Supprimer une tâche
router.delete('/taches/:id', tacheController.deleteTache);

// Mettre à jour une tâche
router.put('/taches/:id', tacheController.updateTache);

module.exports = router; 