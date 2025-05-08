const Tache = require('../models/tache.model');

/**
 * Récupère toutes les tâches
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.getAllTaches = async (req, res) => {
    try {
        const taches = await Tache.find();
        res.status(200).json(taches);
    } catch (err) {
        res.status(500).json({ 
            message: 'Erreur lors de la récupération des tâches',
            error: err.message 
        });
    }
};

/**
 * Crée une nouvelle tâche
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.createTache = async (req, res) => {
    try {
        const tache = new Tache({
            titre: req.body.titre,
            description: req.body.description
        });
        
        const nouvelleTache = await tache.save();
        res.status(201).json(nouvelleTache);
    } catch (err) {
        res.status(400).json({ 
            message: 'Erreur lors de la création de la tâche',
            error: err.message 
        });
    }
};

/**
 * Supprime une tâche
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.deleteTache = async (req, res) => {
    try {
        const tache = await Tache.findByIdAndDelete(req.params.id);
        
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ 
            message: 'Erreur lors de la suppression de la tâche',
            error: err.message 
        });
    }
};

/**
 * Met à jour une tâche
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.updateTache = async (req, res) => {
    try {
        const tache = await Tache.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!tache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        
        res.status(200).json(tache);
    } catch (err) {
        res.status(400).json({ 
            message: 'Erreur lors de la mise à jour de la tâche',
            error: err.message 
        });
    }
}; 