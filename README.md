# Gestionnaire de Tâches

Une application complète de gestion de tâches avec :
- Un frontend React déployable sur Vercel
- Un backend Node.js/Express déployable sur Render ou Railway

## Structure du Projet

```
gestionnaire-taches/
├── frontend/         # Application React
│   ├── public/       # Fichiers statiques
│   ├── src/          # Code source React
│   ├── .env          # Variables d'environnement (non versionné)
│   └── package.json  # Dépendances frontend
│
├── backend/          # API Node.js/Express
│   ├── serveur.js    # Point d'entrée du serveur
│   ├── .env          # Variables d'environnement (non versionné)
│   └── package.json  # Dépendances backend
│
└── README.md         # Documentation du projet
```

## Configuration Requise

- Node.js (version 14.x ou supérieure)
- MongoDB (cloud ou local)
- npm ou yarn

## Démarrage Rapide

1. Clonez ce dépôt
2. Configurez les variables d'environnement dans les fichiers `.env` pour le frontend et le backend
3. Démarrez le backend :
   ```bash
   cd backend
   npm install
   npm start
   ```
4. Démarrez le frontend :
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Déploiement

### Frontend (Vercel)

1. Connectez-vous à Vercel
2. Importez votre dépôt GitHub (dossier frontend)
3. Configurez les variables d'environnement
4. Déployez

### Backend (Render)

1. Connectez-vous à Render
2. Créez un nouveau service web
3. Importez votre dépôt GitHub (dossier backend)
4. Configurez les variables d'environnement
5. Déployez

## Plus d'Informations

Pour plus de détails, consultez les README dans les dossiers frontend et backend. 