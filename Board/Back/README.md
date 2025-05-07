# Backend d'Application de Tâches

Ce backend fournit une API RESTful pour gérer une liste de tâches.

## Configuration pour Vercel

### Prérequis
- Compte Vercel
- Compte MongoDB Atlas (ou autre service MongoDB)
- Node.js installé sur votre machine

### Variables d'environnement

Configurez les variables d'environnement suivantes dans le tableau de bord Vercel:

- `MONGODB_URI`: Votre chaîne de connexion MongoDB
- `NODE_ENV`: Mettez "production" pour l'environnement de production

### Déploiement

1. Installez la CLI Vercel si ce n'est pas déjà fait
```
npm install -g vercel
```

2. Connectez-vous à votre compte Vercel
```
vercel login
```

3. Déployez le projet
```
vercel
```

4. Pour les déploiements de production
```
vercel --prod
```

### Développement local

1. Clonez le dépôt
2. Installez les dépendances
```
npm install
```

3. Créez un fichier `.env` à la racine du projet avec les variables nécessaires (voir `.env.example`)

4. Lancez le serveur de développement
```
npm run dev
```

## Points d'API

- `GET /api/taches` - Récupérer toutes les tâches
- `POST /api/taches` - Créer une nouvelle tâche
- `DELETE /api/taches/:id` - Supprimer une tâche par ID

## Mise à jour du frontend

Après le déploiement, n'oubliez pas de mettre à jour l'URL de l'API dans votre frontend pour pointer vers votre backend déployé:
```javascript
const API_URL = 'https://dashbord-git-crea-yyyanys-projects.vercel.app';
``` 