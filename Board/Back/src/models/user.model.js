const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour les utilisateurs
const userSchema = new Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir une adresse email valide']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['utilisateur', 'admin'],
    default: 'utilisateur'
  }
}, {
  timestamps: true
});

// Créer l'index pour l'email unique
userSchema.index({ email: 1 }, { unique: true });

// Créer le modèle à partir du schéma
const User = mongoose.model('User', userSchema);

module.exports = User; 