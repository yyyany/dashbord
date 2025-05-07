# Gestionnaire de Tâches - Backend

API Node.js avec Express et MongoDB pour gérer les tâches.

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
PORT=3000
MONGO_URI=votre-chaine-de-connexion-mongodb
```

Remplacez `votre-chaine-de-connexion-mongodb` par votre chaîne de connexion MongoDB.

## Démarrage en mode développement

```bash
node serveur.js
```

Pour le développement, vous pouvez aussi utiliser nodemon :

```bash
npm install -g nodemon
nodemon serveur.js
```

## Déploiement

Cette API peut être déployée sur Render, Railway, Heroku ou tout autre service d'hébergement prenant en charge Node.js.

### Déploiement sur Render

1. Créez un compte sur [Render](https://render.com/)
2. Créez un nouveau service Web
3. Connectez votre dépôt GitHub
4. Configurez les variables d'environnement (PORT, MONGO_URI)
5. Définissez la commande de démarrage : `node serveur.js`
6. Déployez !

## Endpoints API

### Récupérer toutes les tâches
```
GET /api/taches
```

### Ajouter une tâche
```
POST /api/taches
Content-Type: application/json

{
  "titre": "Titre de la tâche",
  "description": "Description de la tâche"
}
```

### Supprimer une tâche
```
DELETE /api/taches/:id
``` 