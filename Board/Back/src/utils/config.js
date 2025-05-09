require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://skandy:1@cluster0.f0gatij.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'votre_secret_jwt_super_securise_pour_dashboard',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  }
};

module.exports = config; 