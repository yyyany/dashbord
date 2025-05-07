#  Guide Complet des Commandes Git

##  Gestion des Branches

### 🔹 Créer et naviguer entre branches
```bash
# Créer une nouvelle branche
git branch nom_branche

# Changer de branche
git checkout nom_branche

# Créer ET changer de branche
git checkout -b nom_branche
```
### 🔹 Lister et supprimer des branches
```bash
# Lister toutes les branches
git branch -a

# Supprimer branche locale
git branch -d nom_branche

# Supprimer branche distante
git push origin --delete nom_branche

```

### 🔹 Push & Pull
```bash
# Push standard
git push origin nom_branche

# Forcer un push (écrase l'historique distant)
git push --force origin nom_branche

```

### 🔹 Récupérer des modifications
```bash
# Pull standard
git pull origin nom_branche

# Forcer un pull (écrase les modifications locales)
git fetch --all
git reset --hard origin/nom_branche

```

### 🔹 Système de Stash //  Sauvegarder temporairement
```bash
# Stash les modifications courantes
git stash

# Lister les stashes
git stash list

```

### 🔹  Restaurer un stash
```bash
# Récupérer le dernier stash
git stash pop

# Appliquer un stash spécifique
git stash apply stash@{n}

```

### 🔹 Gestion des Versions// Revenir en arrière
```bash
# Voir l'historique
git log --oneline

# Revenir à un commit (sans perdre les modifications)
git checkout commit_hash

```

### 🔹 Déploiement// Procédure standard
```bash
cd /var/www/project
git pull origin main
composer install --no-dev
chmod -R 755 .
chown -R www-data:www-data .

```

### 🔹  En cas de problème
```bash
En cas de problème

```