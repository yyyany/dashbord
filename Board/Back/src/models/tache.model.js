const mongoose = require('mongoose');

/**
 * Schéma de données pour les tâches
 */
const tacheSchema = new mongoose.Schema({
    titre: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String,
        trim: true
    },
    terminee: { 
        type: Boolean, 
        default: false 
    },
    dateCreation: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true // Ajoute createdAt et updatedAt
});

const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache; 