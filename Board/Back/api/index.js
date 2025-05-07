// API Route principale pour le test
export default function handler(req, res) {
  // Configuration des en-têtes CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Répondre uniquement aux méthodes GET
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  // Renvoyer un message de bienvenue
  res.status(200).json({
    message: 'Bienvenue sur l\'API de gestion de tâches',
    endpoints: {
      'GET /api/taches': 'Récupérer toutes les tâches',
      'POST /api/taches': 'Créer une nouvelle tâche',
      'GET /api/taches/:id': 'Récupérer une tâche spécifique',
      'PUT /api/taches/:id': 'Mettre à jour une tâche',
      'DELETE /api/taches/:id': 'Supprimer une tâche'
    }
  });
} 