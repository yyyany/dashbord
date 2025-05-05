// Serveur Express pour le dashboard personnel
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Routes
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes API
app.get('/', (req, res) => {
  res.json({ message: 'API du Dashboard Personnel' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Gestion d'erreur 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Connexion à MongoDB
const connectDB = async () => {
  try {
    // Utilisez l'URL de connexion MongoDB de votre .env
    // Si elle n'existe pas, utilisez localhost
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  // Commenter cette ligne si vous n'avez pas MongoDB installé
  // connectDB();
});

module.exports = app; 