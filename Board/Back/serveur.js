   // server.js
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');

   const app = express();
   const PORT = process.env.PORT || 3000;

   // Middleware CORS simplifié mais efficace
   app.use(cors({
     origin: '*', // Permettre toutes les origines pour le moment
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
   }));

   // Middleware pour OPTIONS preflight
   app.options('*', (req, res) => {
     res.status(200).end();
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

     // URL MongoDB - utilise variable d'environnement en production
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

   // Route pour mettre à jour une tâche
   app.put('/api/taches/:id', async (req, res) => {
       try {
           await connectToDatabase();
           const tache = await Tache.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true, runValidators: true }
           );
           
           if (!tache) {
               return res.status(404).json({ message: 'Tâche non trouvée' });
           }
           
           res.json(tache);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   });

   // Route racine
   app.get('/', (req, res) => {
       res.json({
           message: 'Bienvenue sur l\'API de gestion de tâches',
           endpoints: {
               'GET /api/taches': 'Récupérer toutes les tâches',
               'POST /api/taches': 'Créer une nouvelle tâche',
               'GET /api/taches/:id': 'Récupérer une tâche spécifique',
               'PUT /api/taches/:id': 'Mettre à jour une tâche',
               'DELETE /api/taches/:id': 'Supprimer une tâche'
           }
       });
   });

   // Connexion à MongoDB et démarrage du serveur
   connectToDatabase()
       .then(() => {
           app.listen(PORT, () => {
               console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
           });
       })
       .catch(err => {
           console.error('Impossible de démarrer le serveur :', err);
       });