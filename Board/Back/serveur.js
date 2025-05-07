   // server.js
   const express = require('express');
   const mongoose = require('mongoose');
   // Nous n'utiliserons pas le package cors mais notre propre middleware
   // const cors = require('cors');

   const app = express();
   const PORT = process.env.PORT || 3000;

   // Middleware CORS personnalisé et simplifié
   app.use((req, res, next) => {
     // Autoriser toutes les origines
     res.setHeader('Access-Control-Allow-Origin', '*');
     
     // Autoriser tous les en-têtes demandés par le navigateur
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
     
     // Autoriser toutes les méthodes
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
     
     // Gérer les requêtes OPTIONS préliminaires
     if (req.method === 'OPTIONS') {
       return res.status(200).end();
     }
     
     next();
   });

   // Middleware pour analyser le corps des requêtes JSON
   app.use(express.json());

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

   // Définition du modèle de tâche
   const tacheSchema = new mongoose.Schema({
       titre: { type: String, required: true },
       description: { type: String },
       terminee: { type: Boolean, default: false },
       dateCreation: { type: Date, default: Date.now }
   });

   const Tache = mongoose.model('Tache', tacheSchema);

   // Routes pour les tâches
   // Route pour obtenir toutes les tâches
   app.get('/api/taches', async (req, res) => {
       try {
           await connectToDatabase();
           const taches = await Tache.find();
           res.json(taches);
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   });

   // Route pour ajouter une tâche
   app.post('/api/taches', async (req, res) => {
       const tache = new Tache({
           titre: req.body.titre,
           description: req.body.description
       });

       try {
           await connectToDatabase();
           const nouvelleTache = await tache.save();
           res.status(201).json(nouvelleTache);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   });

   // Route pour supprimer une tâche
   app.delete('/api/taches/:id', async (req, res) => {
       try {
           await connectToDatabase();
           const tache = await Tache.findByIdAndDelete(req.params.id);
           if (!tache) {
               return res.status(404).json({ message: 'Tâche non trouvée' });
           }
           res.json({ message: 'Tâche supprimée avec succès' });
       } catch (err) {
           res.status(500).json({ message: err.message });
       }
   });

   // Route racine
   app.get('/', (req, res) => {
       res.send('Bienvenue sur votre API de gestion de tâches !');
   });

   // Vérification de l'environnement
   if (process.env.NODE_ENV !== 'production') {
       // Démarrer le serveur en mode développement
       app.listen(PORT, () => {
           console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
       });
   }

   // Exportation pour Vercel
   module.exports = app;