   // server.js
   const express = require('express');
   const mongoose = require('mongoose');

   const app = express();
   const PORT = process.env.PORT || 3000;

   // Middleware pour analyser le corps des requêtes JSON
   app.use(express.json());

   // Remplacez <db_password> par votre mot de passe MongoDB
   const mongoURI = 'mongodb+srv://skandy:1@cluster0.f0gatij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

   // Connexion à MongoDB
   mongoose.connect(mongoURI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   })
   .then(() => console.log('Connecté à MongoDB'))
   .catch(err => console.error('Erreur de connexion à MongoDB:', err));

   // Exemple de route
   app.get('/', (req, res) => {
       res.send('Bienvenue sur votre serveur Node.js avec MongoDB !');
   });

   // Démarrer le serveur
   app.listen(PORT, () => {
       console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
   });