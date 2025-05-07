   // server.js
   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   const PORT = process.env.PORT || 3000;

   // Middleware pour CORS
   app.use(cors());

   // Middleware pour analyser le corps des requêtes JSON
   app.use(express.json());

   // Connexion à MongoDB
   const mongoURI = process.env.MONGO_URI;

   mongoose.connect(mongoURI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   })
   .then(() => console.log('Connecté à MongoDB'))
   .catch(err => console.error('Erreur de connexion à MongoDB:', err));

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
           const nouvelleTache = await tache.save();
           res.status(201).json(nouvelleTache);
       } catch (err) {
           res.status(400).json({ message: err.message });
       }
   });

   // Route pour supprimer une tâche
   app.delete('/api/taches/:id', async (req, res) => {
       try {
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
       res.send('Bienvenue sur l\'API de gestion des tâches');
   });

   // Démarrer le serveur
   app.listen(PORT, () => {
       console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
   });