const mongoose = require('mongoose');

// Variable pour stocker la connexion MongoDB
let cachedDb = null;

/**
 * Connecte l'application à MongoDB
 * @returns {Promise} La connexion MongoDB
 */
async function connectToDatabase() {
    // Si la connexion existe déjà, la retourner
    if (cachedDb) {
        return cachedDb;
    }

    // URL MongoDB - utilise variable d'environnement en production
    const mongoURI = process.env.MONGODB_URI || 
        'mongodb+srv://skandy:1@cluster0.f0gatij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    try {
        const client = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ Connecté à MongoDB');
        cachedDb = client;
        return client;
    } catch (error) {
        console.error('❌ Erreur de connexion à MongoDB:', error);
        throw error;
    }
}

module.exports = { connectToDatabase }; 