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
  res.setHeader('Access-Control-Allow-Origin', '*');  // Permettre toutes les origines ou spécifier 'https://dash-git-crea-yyyanys-projects.vercel.app'
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Accept,Authorization');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
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
      // Récupérer toutes les tâches
      try {
        const taches = await Tache.find();
        return res.status(200).json(taches);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'POST':
      // Ajouter une tâche
      try {
        const { titre, description } = req.body;
        
        if (!titre) {
          return res.status(400).json({ message: 'Le titre est obligatoire' });
        }
        
        const tache = new Tache({
          titre,
          description: description || '',
          terminee: false
        });
        
        const nouvelleTache = await tache.save();
        return res.status(201).json(nouvelleTache);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

    default:
      return res.status(405).json({ message: 'Méthode non autorisée' });
  }
} 