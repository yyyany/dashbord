Créez un composant d'interface utilisateur réactif incroyable. L'accent est mis sur les performances élevées, la réutilisabilité et la conception esthétique. 

# Étapes

1. ** Recherche **: Identifiez les modèles et composants d'interface utilisateur réussis dans l'écosystème React pour s'assurer que le composant s'adapte bien dans les pratiques communes.
2. ** Plan **: Concevoir la structure des composants en considérant l'état,
accessoires et gestion potentielle des données.
3. ** Design **: Utilisez des outils de conception (par exemple, Figma, Sketch) pour prototyper les aspects visuels du composant.
4. ** Développez **: implémentez le composant à l'aide de React, garantissant qu'il est modulaire et suit les meilleures pratiques pour l'organisation du code.
5
** Style **: Appliquer CSS ou un préprocesseur comme Sass / moins pour styliser le composant, en considérant la réactivité et l'accessibilité.
6. ** Test **: Écrivez des tests d'unité et d'intégration à l'aide de frameworks comme la bibliothèque de tests et de réaction pour s'assurer que le composant se comporte comme prévu.
7
** Optimiser **: Assurez-vous que le composant est optimisé pour les performances sur différents appareils et navigateurs.
8. ** Document **: Fournir une documentation complète pour l'utilisation du composant, de ses accessoires et des exemples.

# Format de sortie

La sortie doit inclure:
- Code des extraits avec des commentaires clairs.
- Un croquis de conception ou un prototype visuel.
-
Résultats des tests unitaires et rapports de couverture de code.
- Un fichier de readme.md avec documentation.

# Exemples

1. Un composant de formulaire complexe qui gère le rendu de champ dynamique en fonction de l'entrée utilisateur.
2. Un composant de visualisation de données interactif qui met à jour en temps réel en tant que nouveaux flux de données.

# Notes

- Envisagez d'utiliser des crochets et une API de contexte le cas échéant.
-
Assurez la compatibilité entre les navigateurs et l'optimisation des performances.
- Suivez les meilleures pratiques de l'accessibilité pour vous assurer que le composant est utilisable par tout le monde.





Vous êtes un leader de la technologie senior avec 20 ans d'expérience dans l'industrie des technologies de l'information, l'expertise est le développeur de Nodejs Fullstack, les Nodejs compétents, Express, MongoDB Pure et TypeScript. Instructions détaillées sur la façon de mettre en œuvre la fonction d'enregistrement (registre) et la connexion (connexion) dans le backend à l'aide de Nodejs, Express et TypeScript,
Connectez-vous directement à MongoDB sans utiliser de mongoose.

Demandez un déploiement entièrement à partir de l'étape de réception des données utilisateur, effectuez des middleware de validation, le processus dans le contrôleur, appelez une logique professionnelle en service et renvoyez les résultats aux utilisateurs. Focus présentant clairement chaque partie du code source,
Expliquez l'opération ainsi que le flux de données dans les étages de l'application.

# Étapes détaillées:
- Recevoir les données d'entrée du client (par exemple, e-mail, mot de passe, nom d'utilisateur)
- Écrivez middleware pour valider les données (cochez le format de messagerie, la longueur du mot de passe, les champs obligatoires)
- Créer un contrôleur pour gérer le registre et la connexion requises requises,
Appelez le service approprié
- Dans le service, effectuez des opérations avec MongoDB Pure pour enregistrer et interroger les données des utilisateurs
- Effectuer un chiffrement des mots de passe lors de l'enregistrement et de la vérification des mots de passe lors de la connexion
- Renvoyez la réponse appropriée (succès ou erreur) au client

# Note:
- Utilisez uniquement la bibliothèque officielle de la bibliothèque MongoDB et les bibliothèques standard NodeJS ainsi que Express
-
Le code est écrit en type
- Évitez d'utiliser Mongoose ou toute autre bibliothèque ORM / ODM

# Format de sortie
Renvoie le code de détail partiel de chaque partie avec une brève explication pour chaque segment (middleware, contrôleur, service) dans l'ordre d'implémentation, assurant une application facile à comprendre et pratique.
# Exemple d'illustration pour les entrées et les résultats de retour
- Entrée Registre: {"Email": "user@example.com", "mot de passe": "StrongPass123", "nom d'utilisateur": "User123"}
- sortie: {"message": "Enregistrement réussi", "utilisateur": "..."}

- Connexion d'entrée: {"Courriel": "user@example.com", "mot de passe": "StrongPass123"}
- Sortie: {"Message": "Connexion avec succès", "Token": "..."}




# Prompt pour le Développement d'Applications Web Professionnelles

## Objectif
Développe une application web professionnelle avec une architecture moderne, évolutive et maintenable. Suis une approche structurée qui respecte les meilleures pratiques du développement logiciel, en créant un produit visuellement élégant avec une palette de couleurs pourpre sophistiquée.

## Architecture et Structure

### Backend (Node.js/Express)
1. Adopte une **architecture MVC stricte**:
   - `models/`: Schémas de données et interactions avec la base de données
   - `controllers/`: Logique de traitement des requêtes HTTP
   - `routes/`: Définition des endpoints API
   - `middleware/`: Fonctions intermédiaires (validation, auth, CORS)
   - `services/`: Logique métier réutilisable
   - `utils/`: Fonctions utilitaires (connexion DB, helpers)
   - `config/`: Configurations et variables d'environnement

2. **Séparation des responsabilités**:
   - Un service par entité métier
   - Un contrôleur par groupe de routes logique
   - Des middlewares spécialisés et réutilisables

3. **Documentation du code**:
   - Commente chaque fonction avec JSDoc
   - Explique les paramètres, retours et comportements attendus
   - Documente les routes API et leur utilisation

### Frontend (React)
1. **Structure optimisée des dossiers**:
   - `assets/`: Ressources statiques (images, styles, fonts)
   - `components/`: Composants UI réutilisables
     - `common/`: Éléments génériques (boutons, inputs, cards)
     - `layout/`: Composants structurels (header, footer, sidebar)
     - `widgets/`: Composants métier spécifiques
   - `pages/`: Composants de page complète
   - `hooks/`: Custom hooks React
   - `services/`: Communication avec l'API
   - `store/`: Gestion d'état global
   - `utils/`: Fonctions utilitaires

2. **Composants atomiques**:
   - Favorise des composants petits et spécialisés
   - Minimise les dépendances entre composants
   - Utilise la composition plutôt que l'héritage

3. **Gestion d'état**:
   - État local avec useState pour les données simples
   - Context API ou Redux pour l'état global
   - Custom hooks pour la logique réutilisable

## Design et Expérience Utilisateur

1. **Système de design cohérent**:
   - Palette de couleurs pourpre et sobre:
     - Primaire: #6A0DAD (pourpre royal)
     - Primaire clair: #9747FF
     - Primaire foncé: #4B0082 (indigo)
     - Accent: #D1C4E9 (lavande pâle)
     - Fond: #FFFFFF, #F5F5F5, #121212 (mode sombre)
   
   - Typographie:
     - Police principale: Poppins (alternative: Roboto)
     - Hiérarchie claire des tailles
     - Utilisation cohérente des poids

   - Ombres et élévation:
     - Système à 3 niveaux (légère, moyenne, forte)
     - Transition fluide entre les états

2. **Composants visuels modernes**:
   - Cartes avec coins arrondis (border-radius: 8-12px)
   - Animations subtiles et significatives
   - Feedback visuel sur interactions
   - Layout responsive basé sur CSS Grid et Flexbox

3. **Accessibilité**:
   - Contraste suffisant (WCAG AA minimum)
   - Structure sémantique du HTML
   - Navigation au clavier
   - État de focus visible

## Bonnes Pratiques de Développement

1. **Performance**:
   - Lazy loading des composants lourds
   - Memoization (useMemo, useCallback)
   - Limitation des re-renders inutiles
   - Optimisation des requêtes API (mise en cache)

2. **Maintenabilité**:
   - Nommage explicite des variables et fonctions
   - Éviter la duplication de code (DRY)
   - Responsabilité unique des composants (SRP)
   - Tests unitaires pour les fonctionnalités critiques

3. **Sécurité**:
   - Validation des entrées utilisateur
   - Protection CORS configurée correctement
   - Gestion sécurisée des données sensibles
   - Prévention des vulnérabilités courantes

## Méthodologie de Mise en Œuvre

1. **Approche incrémentale**:
   - Commence par la structure de base
   - Développe les composants fondamentaux
   - Intègre les fonctionnalités une par une
   - Teste régulièrement l'ensemble

2. **Priorisation**:
   - Architecture et structure d'abord
   - Fonctionnalités essentielles ensuite
   - Raffinement visuel en parallèle
   - Optimisations en dernier

3. **Évolutivité**:
   - Prévois l'ajout futur de pages et fonctionnalités
   - Structure le code pour faciliter les extensions
   - Documente les points d'extension

## Communication API

1. **Services API**:
   - Module dédié pour chaque entité
   - Gestion centralisée des erreurs
   - Normalisation des réponses
   - Options de configuration (headers, timeout)

2. **Gestion des erreurs**:
   - Capture et traitement cohérent des erreurs
   - Messages utilisateur informatifs
   - Logging détaillé pour le débogage

## Guidelines pour les Évolutions Futures

1. **Ajout de nouvelles pages**:
   - Créer dans le dossier pages/
   - Suivre le modèle des pages existantes
   - Ajouter la route dans le système de navigation
   - Réutiliser les composants communs

2. **Nouveaux composants**:
   - Évaluer s'ils sont communs ou spécifiques
   - Placer dans le dossier approprié
   - Suivre les conventions de style existantes
   - Rester cohérent avec le système de design

3. **Extension du modèle de données**:
   - Ajouter le modèle dans models/
   - Créer le service associé
   - Développer les routes API nécessaires
   - Mettre à jour la documentation

## Exemple de Workflow Complet

1. Définir l'architecture globale
2. Mettre en place la structure de dossiers
3. Créer les composants de base et le système de design
4. Développer les modèles et services backend
5. Implémenter les contrôleurs et routes API
6. Créer les composants et pages frontend
7. Connecter le frontend au backend
8. Tester l'ensemble et optimiser

Ce guide devra être adapté selon les spécificités du projet, mais il fournit un cadre solide pour développer des applications web professionnelles, modernes et maintenables.
