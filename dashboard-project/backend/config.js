// Configuration pour le dashboard personnel
// Remplacez ces valeurs par celles de votre fichier .env

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard',
  OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY || '',
  GOOGLE_CALENDAR_CLIENT_ID: process.env.GOOGLE_CALENDAR_CLIENT_ID || '',
  GOOGLE_CALENDAR_CLIENT_SECRET: process.env.GOOGLE_CALENDAR_CLIENT_SECRET || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dashboard_secret_temporaire'
}; 