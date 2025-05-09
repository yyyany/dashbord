import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api.service';
import './Dashboard.css';

const Dashboard = () => {
  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState({ titre: '', description: '' });
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [userName, setUserName] = useState('Utilisateur');
  const [tabActif, setTabActif] = useState('taches');
  const navigate = useNavigate();

  // URL de l'API - détection automatique de l'environnement
  const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://dashbord-production.up.railway.app';

  // Vérification de l'authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Ici nous récupérerons les données de l'utilisateur connecté
      // Pour l'instant, nous utilisons une valeur statique
      setUserName('Utilisateur');
      recupererTaches();
    }
  }, [navigate]);

  // Fonction pour récupérer toutes les tâches
  const recupererTaches = async () => {
    try {
      setChargement(true);
      const reponse = await fetch(`${API_URL}/api/taches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
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
      const reponse = await fetch(`${API_URL}/api/taches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
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
      const reponse = await fetch(`${API_URL}/api/taches/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
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

  // Gérer les changements dans le formulaire
  const gererChangement = (e) => {
    const { name, value } = e.target;
    setNouvelleTache(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour se déconnecter
  const deconnexion = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // Changer l'onglet actif
  const changerTab = (tab) => {
    setTabActif(tab);
  };

  // Si vous n'avez pas déjà une fonction de déconnexion, ajoutez-la
  const handleLogout = () => {
    // Utiliser la fonction de déconnexion du service API
    apiService.logout();
    
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          <h1>Tableau de Bord</h1>
        </div>
        <div className="user-info">
          <span className="welcome-text">Bienvenue, {userName}</span>
          <button className="logout-button" onClick={deconnexion}>
            Déconnexion
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li className={tabActif === 'taches' ? 'active' : ''}>
                <a href="#taches" onClick={() => changerTab('taches')}>Mes Tâches</a>
              </li>
              <li className={tabActif === 'statistiques' ? 'active' : ''}>
                <a href="#statistiques" onClick={() => changerTab('statistiques')}>Statistiques</a>
              </li>
              <li className={tabActif === 'parametres' ? 'active' : ''}>
                <a href="#parametres" onClick={() => changerTab('parametres')}>Paramètres</a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          {tabActif === 'taches' && (
            <>
              <section className="ajout-tache">
                <h2>Ajouter une tâche</h2>
                <form onSubmit={ajouterTache}>
                  <div className="form-group">
                    <label htmlFor="titre">Titre</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={nouvelleTache.titre}
                      onChange={gererChangement}
                      required
                      placeholder="Entrez le titre de la tâche"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={nouvelleTache.description}
                      onChange={gererChangement}
                      placeholder="Décrivez la tâche en détail (optionnel)"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-ajouter">Ajouter la tâche</button>
                </form>
              </section>

              <section className="liste-taches">
                <h2>Liste des tâches</h2>
                
                {erreur && <div className="erreur">{erreur}</div>}
                
                {chargement ? (
                  <div className="loading-spinner">
                    <div className="spinner-dashboard"></div>
                    <p>Chargement des tâches...</p>
                  </div>
                ) : (
                  <ul className="tasks-list">
                    {taches.length > 0 ? (
                      taches.map(tache => (
                        <li key={tache._id} className="task-item">
                          <div className="task-info">
                            <h3>{tache.titre}</h3>
                            <p>{tache.description || "Aucune description"}</p>
                            <p className="date">Créée le {new Date(tache.dateCreation).toLocaleDateString('fr-FR', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</p>
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
                      <div className="empty-tasks">
                        <p>Aucune tâche trouvée</p>
                        <p>Créez votre première tâche en utilisant le formulaire ci-dessus</p>
                      </div>
                    )}
                  </ul>
                )}
              </section>
            </>
          )}

          {tabActif === 'statistiques' && (
            <section className="statistiques">
              <h2>Statistiques</h2>
              <div className="stat-content">
                <div className="stat-card">
                  <h3>Tâches actives</h3>
                  <p className="stat-value">{taches.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Tâches terminées</h3>
                  <p className="stat-value">0</p>
                </div>
                <div className="stat-card">
                  <h3>Dernière activité</h3>
                  <p className="stat-value">
                    {taches.length > 0 
                      ? new Date(Math.max(...taches.map(t => new Date(t.dateCreation)))).toLocaleDateString('fr-FR') 
                      : 'Aucune'}
                  </p>
                </div>
              </div>
              <p className="stat-note">Plus de statistiques seront disponibles prochainement.</p>
            </section>
          )}

          {tabActif === 'parametres' && (
            <section className="parametres">
              <h2>Paramètres du compte</h2>
              <div className="param-content">
                <p className="param-note">Cette section est en cours de développement.</p>
                <p className="param-note">Les paramètres du compte seront disponibles dans une future mise à jour.</p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 