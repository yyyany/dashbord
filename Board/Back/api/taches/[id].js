// Import de mongoose pour la connexion à la base de données
const mongoose = require('mongoose');

// Variable pour stocker la connexion MongoDB
let cachedDb = null;

// Fonction pour connecter à MongoDB
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // URL MongoDB
  const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://skandy:1@cluster0.f0gatij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

  try {
    const client = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connecté à MongoDB');
    cachedDb = client;
    return client;
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

// Définition du modèle de tâche si ce n'est pas déjà fait
let Tache;
try {
  Tache = mongoose.model('Tache');
} catch (e) {
  const tacheSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String },
    terminee: { type: Boolean, default: false },
    dateCreation: { type: Date, default: Date.now }
  });
  
  Tache = mongoose.model('Tache', tacheSchema);
}

// Fonction serverless pour gérer les requêtes
export default async function handler(req, res) {
  // Configuration des en-têtes CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Accept,Authorization');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Récupérer l'ID de la tâche depuis l'URL
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'ID de tâche non fourni' });
  }

  // Connecter à la base de données
  try {
    await connectToDatabase();
  } catch (error) {
    return res.status(500).json({ message: 'Erreur de connexion à la base de données', error: error.message });
  }

  // Traiter les différentes méthodes HTTP
  switch (req.method) {
    case 'GET':
      // Récupérer une tâche spécifique
      try {
        const tache = await Tache.findById(id);
        if (!tache) {
          return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        return res.status(200).json(tache);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'DELETE':
      // Supprimer une tâche
      try {
        const tache = await Tache.findByIdAndDelete(id);
        if (!tache) {
          return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        return res.status(200).json({ message: 'Tâche supprimée avec succès' });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'PUT':
      // Mettre à jour une tâche
      try {
        const tacheMAJ = await Tache.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        );
        
        if (!tacheMAJ) {
          return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        
        return res.status(200).json(tacheMAJ);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
} 