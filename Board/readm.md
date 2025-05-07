# 📊 Dashboard Personnel - Documentation Complète

## 📌 Objectif du Projet

Créer un **dashboard personnel web**, affiché en plein écran sur un second moniteur, servant de **centre de contrôle quotidien** : tâches, météo, système, calendrier, notes, etc.

Le projet sera **déployé sur un serveur Ubuntu (AWS)**, conçu avec une **structure modulaire**, sécurisé, maintenable, et évolutif.

---

## 🧱 Stack Technique

### Frontend

* **Framework** : React.js (ou Vue.js selon préférence)
* **Styling** : TailwindCSS (ou CSS modules)
* **Composants UI** : Shadcn/UI (pour une base élégante)
* **Libs diverses** :

  * axios (requêtes API)
  * dayjs (dates/heures)
  * react-icons (icônes)
  * zustand ou context API (état global)

### Backend

* **Langage** : Node.js avec Express
* **Authentification** : JWT (JSON Web Token)
* **Sécurité** :

  * Helmet (headers HTTP)
  * CORS strict
  * Input validation (zod ou Joi)
* **API** : REST (ou GraphQL si besoin plus complexe)

### Base de données

* **Type** : MongoDB (flexible, facile à héberger sur Atlas ou en local)
* **Alternative** : PostgreSQL si relationnel préféré

### Services externes

* **Météo** : OpenWeatherMap API
* **Calendar** : Google Calendar API (OAuth 2.0)
* **Tâches** : local ou synchronisation via Notion API (optionnel)
* **Monitoring système** : shell scripts appelés via backend ou API Node

### Déploiement

* **Serveur** : Ubuntu 22.04 (AWS EC2 ou DigitalOcean)
* **Web server** : Nginx (reverse proxy)
* **SSL** : Certbot + Let's Encrypt
* **PM2** : gestionnaire de processus Node
* **Git** : Déploiement via Git + Git Hooks ou CI/CD léger (GitHub Actions)

---

## ⚙️ Fonctionnalités Principales (MVP)

### Productivité

* [ ] Tâches à faire avec état (à faire, en cours, terminé)
* [ ] Échéances & rappels
* [ ] Bloc-notes markdown
* [ ] Objectifs journaliers/mensuels

### Système & Infos

* [ ] Météo (OpenWeatherMap)
* [ ] Horloge (multi fuseau horaire)
* [ ] Utilisation CPU / RAM / Disque (script backend)
* [ ] Ping de ton site ou services perso

### Bonus (à ajouter ensuite)

* [ ] Citation du jour
* [ ] Intégration Spotify/YouTube
* [ ] Mini calendrier avec événements
* [ ] Score de bien-être/journal personnel

---

## 🏗️ Architecture du Projet

```
📁 dashboard-project
├── frontend/                # React + Tailwind
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
├── backend/                 # Express + MongoDB
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── .env                     # Clés API & config
├── nginx/                   # Conf nginx et certbot
├── scripts/                 # Scripts CPU/RAM
└── README.md
```

---

## 🚨 Bonnes pratiques et vérifications

### 🔐 Sécurité

* Toujours **sanitizer** les entrées utilisateurs (XSS, SQL/NoSQL Injection)
* Utiliser **HTTPS partout**
* Ne jamais stocker les JWT dans localStorage (utiliser cookies httpOnly si besoin sécurisé)
* Protéger les routes backend avec middlewares d'auth
* Mettre les **clés API** dans `.env` (jamais commit)

### 🧪 Qualité de code

* Linting (ESLint)
* Formatage auto (Prettier)
* Tests unitaires (Jest ou Vitest)
* Utiliser Git de manière propre (commits clairs, branches)

### 🧠 À vérifier avant chaque push

* Est-ce que le dashboard fonctionne sans bug visible ?
* Est-ce que les composants sont isolés/modulaires ?
* Est-ce que je peux changer un widget sans casser les autres ?
* Est-ce que le serveur est sécurisé (auth, CORS, SSL) ?

---

## 🪜 Étapes de développement

### 1. Préparation du serveur

* Installer Node.js, Nginx, Git, PM2
* Cloner le repo, configurer le reverse proxy
* Installer SSL avec Certbot

### 2. Dev du frontend (React + Tailwind)

* Créer layout responsive 16:9 pour ton 2e écran
* Développer un système de widgets (chaque bloc = composant)
* Gérer l’état global si besoin (pour user, préférences, thèmes)

### 3. Dev du backend (Express)

* Créer une API REST sécurisée
* Ajouter les endpoints : /tasks, /notes, /weather, /system-stats
* Brancher à MongoDB Atlas ou local

### 4. Intégration des services

* OpenWeatherMap : via fetch frontend ou proxy backend
* Google Calendar : OAuth (token à stocker en DB)
* Scripts système (bash ou Node os-utils)

### 5. Authentification

* Créer route /login (mot de passe hashé avec bcrypt)
* Auth JWT avec expiration
* Middleware pour protéger l’API

### 6. Déploiement

* Lancer backend via PM2
* Builder le frontend et servir avec Nginx
* Tester toute la chaîne en HTTPS

---

## 🧩 Conseils pratiques

* Développe les widgets un à un (commence par météo ou tâches)
* Évite de tout connecter dès le début, commence avec du fake data
* Fais du versionnement Git logique (commit clair, README mis à jour)
* Ne code jamais en dur tes clés API ou tokens
* Rends le dashboard agréable à l'œil : padding, contraste, typographie

---

## 🗂️ Ressources utiles

* [OpenWeatherMap API](https://openweathermap.org/api)
* [Google Calendar API](https://developers.google.com/calendar)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [PM2 Docs](https://pm2.keymetrics.io/)
* [Certbot SSL Ubuntu](https://certbot.eff.org/instructions)

---

## ✅ Objectif final

Un dashboard personnel moderne, rapide, maintenable, sécurisé, avec déploiement en ligne, utilisé au quotidien, et qui sert aussi de vitrine technique professionnelle.
