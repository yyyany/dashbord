const cors = require('cors');

/**
 * Configuration CORS optimisée pour l'application
 */
const corsMiddleware = cors({
    origin: '*', // En production, spécifier les domaines exacts
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    maxAge: 86400 // Mise en cache des preflight requests (24h)
});

module.exports = corsMiddleware; 