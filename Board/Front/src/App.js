import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState({ titre: '', description: '' });
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // URL de l'API - détection automatique de l'environnement
  const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api/taches'
    : 'https://dashbord-hwfbnj9q6-yyyanys-projects.vercel.app/api/taches';

  // Fonction pour récupérer toutes les tâches
  const recupererTaches = async () => {
    try {
      setChargement(true);
      const reponse = await fetch(API_URL);
      if (!reponse.ok) {
        throw new Error(`Erreur HTTP: ${reponse.status}`);
      }
      const donnees = await reponse.json();
      setTaches(donnees);
      setErreur(null);
    } catch (err) {
      setErreur(`Erreur lors de la récupération des tâches: ${err.message}`);
      console.error('Erreur:', err);
    } finally {
      setChargement(false);
    }
  };

  // Fonction pour ajouter une tâche
  const ajouterTache = async (e) => {
    e.preventDefault();
    if (!nouvelleTache.titre.trim()) {
      alert('Le titre est obligatoire');
      return;
    }

    try {
      const reponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouvelleTache),
      });

      if (!reponse.ok) {
        throw new Error(`Erreur HTTP: ${reponse.status}`);
      }

      const tacheAjoutee = await reponse.json();
      setTaches([...taches, tacheAjoutee]);
      setNouvelleTache({ titre: '', description: '' });
    } catch (err) {
      setErreur(`Erreur lors de l'ajout de la tâche: ${err.message}`);
      console.error('Erreur:', err);
    }
  };

  // Fonction pour supprimer une tâche
  const supprimerTache = async (id) => {
    try {
      const reponse = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!reponse.ok) {
        throw new Error(`Erreur HTTP: ${reponse.status}`);
      }

      setTaches(taches.filter(tache => tache._id !== id));
    } catch (err) {
      setErreur(`Erreur lors de la suppression de la tâche: ${err.message}`);
      console.error('Erreur:', err);
    }
  };

  // Récupérer les tâches au chargement du composant
  useEffect(() => {
    recupererTaches();
  }, []);

  // Gérer les changements dans le formulaire
  const gererChangement = (e) => {
    const { name, value } = e.target;
    setNouvelleTache(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestionnaire de Tâches</h1>
      </header>

      <div className="container">
        <section className="ajout-tache">
          <h2>Ajouter une nouvelle tâche</h2>
          <form onSubmit={ajouterTache}>
            <div className="form-group">
              <label htmlFor="titre">Titre:</label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={nouvelleTache.titre}
                onChange={gererChangement}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={nouvelleTache.description}
                onChange={gererChangement}
              ></textarea>
            </div>

            <button type="submit" className="btn-ajouter">Ajouter la tâche</button>
          </form>
        </section>

        <section className="liste-taches">
          <h2>Mes tâches</h2>
          
          {erreur && <p className="erreur">{erreur}</p>}
          
          {chargement ? (
            <p>Chargement des tâches...</p>
          ) : (
            <ul>
              {taches.length > 0 ? (
                taches.map(tache => (
                  <li key={tache._id} className="tache-item">
                    <div className="tache-info">
                      <h3>{tache.titre}</h3>
                      <p>{tache.description}</p>
                      <p className="date">Créée le: {new Date(tache.dateCreation).toLocaleString()}</p>
                    </div>
                    <button 
                      className="btn-supprimer" 
                      onClick={() => supprimerTache(tache._id)}
                    >
                      Supprimer
                    </button>
                  </li>
                ))
              ) : (
                <p>Aucune tâche trouvée. Ajoutez-en une !</p>
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
