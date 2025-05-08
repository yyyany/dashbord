   // server.js
   const express = require('express');
   const { connectToDatabase } = require('./src/utils/database');
   const corsMiddleware = require('./src/middleware/cors.middleware');
   const tacheRoutes = require('./src/routes/tache.routes');

   const app = express();
   const PORT = process.env.PORT || 3000;

   // Middlewares
   app.use(corsMiddleware);
   app.use(express.json());

   // Routes API
   app.use('/api', tacheRoutes);

   // Route racine
   app.get('/', (req, res) => {
       res.json({
           message: 'Bienvenue sur l\'API de gestion de tâches',
           endpoints: {
               'GET /api/taches': 'Récupérer toutes les tâches',
               'POST /api/taches': 'Créer une nouvelle tâche',
               'DELETE /api/taches/:id': 'Supprimer une tâche',
               'PUT /api/taches/:id': 'Mettre à jour une tâche'
           }
       });
   });

   // Démarrage du serveur
   connectToDatabase()
       .then(() => {
           app.listen(PORT, () => {
               console.log(`✨ Serveur en cours d'exécution sur le port ${PORT}`);
           });
       })
       .catch(err => {
           console.error('❌ Impossible de démarrer le serveur :', err);
       });