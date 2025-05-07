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