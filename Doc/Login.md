# Flux Complet (Inscription + Connexion + Session)

## 🔐 Étape 1 — Inscription (Signup)
**Objectif** : Permettre à un utilisateur sans compte de créer un compte.

### Frontend :
- **Formulaire** : 
  - Email
  - Nom d'utilisateur
  - Mot de passe
  - Confirmer le mot de passe
- **Bouton** : Créer un compte

### Backend :
1. Vérifier que l'email n'existe pas déjà.
2. Hasher le mot de passe avec bcrypt.
3. Enregistrer l'utilisateur dans la base de données (User collection).
4. Créer un JWT (ou session simple) et le renvoyer via cookie.
5. Rediriger vers `/dashboard`.

---

## 🔐 Étape 2 — Connexion (Login)
**Objectif** : Permettre à un utilisateur existant de se connecter avec son email et mot de passe.

### Frontend :
- **Formulaire** : 
  - Email
  - Mot de passe
- **Bouton** : Connexion

### Backend :
1. Vérifier que l'email existe.
2. Comparer le mot de passe avec le hash en base.
3. Si OK → créer un JWT, le stocker en cookie.
4. Rediriger vers `/dashboard`.
5. Si KO → message d'erreur : Identifiants incorrects.

---

## 🚪 Étape 3 — Accès Sécurisé au Dashboard
**Objectif** : Protéger `/dashboard`, ne l'afficher que si l'utilisateur est connecté.

### Backend :
1. Middleware `auth.js` qui lit le JWT dans le cookie :

```javascript
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // contient user_id ou email
    next();
  } catch (err) {
    res.redirect("/login");
  }
}
```

2. Utilisation dans la route :

```javascript
app.get("/dashboard", auth, (req, res) => {
  res.send("Bienvenue sur ton dashboard !");
});
```

---

## 🔓 Étape 4 — Déconnexion
**Objectif** : Supprimer le cookie et rediriger vers `/login`.

### Backend :
```javascript
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});
```

---

## 🧠 À Retenir
| Action                     | Besoin Utilisateur       | Page         | Résultat                      |
|---------------------------|--------------------------|--------------|-------------------------------|
| Pas encore inscrit        | Créer un compte          | `/register`  | Dashboard + cookie            |
| Déjà inscrit              | Se connecter             | `/login`     | Dashboard + cookie            |
| Connecté                  | Accéder au dashboard     | `/dashboard` | OK                            |
| Pas connecté              | Accès au dashboard       | `/dashboard` | Redirection vers login        |
| Déconnexion               | Logout                   | `/logout`    | Redirection vers login        |