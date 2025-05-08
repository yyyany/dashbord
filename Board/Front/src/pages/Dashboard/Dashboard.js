import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import TaskCard from '../../components/widgets/TaskCard';
import { tacheService } from '../../services/api.service';
import './Dashboard.css';

/**
 * Page principale du Dashboard
 */
const Dashboard = () => {
  const [taches, setTaches] = useState([]);
  const [nouvelleTache, setNouvelleTache] = useState({ titre: '', description: '' });
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Récupérer les tâches au chargement du composant
  useEffect(() => {
    recupererTaches();
  }, []);

  // Fonction pour récupérer toutes les tâches
  const recupererTaches = async () => {
    try {
      setChargement(true);
      const tachesList = await tacheService.getAllTaches();
      setTaches(tachesList);
      setErreur(null);
    } catch (err) {
      setErreur(`Erreur: ${err.message}`);
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
      const tacheAjoutee = await tacheService.createTache(nouvelleTache);
      setTaches([...taches, tacheAjoutee]);
      setNouvelleTache({ titre: '', description: '' });
    } catch (err) {
      setErreur(`Erreur: ${err.message}`);
      console.error('Erreur:', err);
    }
  };

  // Fonction pour supprimer une tâche
  const supprimerTache = async (id) => {
    try {
      await tacheService.deleteTache(id);
      setTaches(taches.filter(tache => tache._id !== id));
    } catch (err) {
      setErreur(`Erreur: ${err.message}`);
      console.error('Erreur:', err);
    }
  };

  // Fonction pour marquer une tâche comme terminée/non terminée
  const toggleTacheComplete = async (id) => {
    try {
      const tache = taches.find(t => t._id === id);
      const tacheMiseAJour = await tacheService.updateTache(id, {
        ...tache,
        terminee: !tache.terminee
      });
      
      setTaches(taches.map(t => 
        t._id === id ? tacheMiseAJour : t
      ));
    } catch (err) {
      setErreur(`Erreur: ${err.message}`);
      console.error('Erreur:', err);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNouvelleTache(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="dashboard">
      <Header />
      
      <main className="dashboard-content">
        <div className="container">
          <div className="dashboard-header">
            <h2>Gestionnaire de Tâches</h2>
            <p>Organisez vos tâches quotidiennes efficacement</p>
          </div>
          
          <div className="dashboard-grid">
            <section className="task-form-section">
              <div className="card">
                <h3>Ajouter une nouvelle tâche</h3>
                <form onSubmit={ajouterTache} className="task-form">
                  <div className="form-group">
                    <label htmlFor="titre">Titre</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      value={nouvelleTache.titre}
                      onChange={handleChange}
                      placeholder="Que devez-vous faire ?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={nouvelleTache.description}
                      onChange={handleChange}
                      placeholder="Détails optionnels..."
                      rows="3"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-add">
                    Ajouter la tâche
                  </button>
                </form>
              </div>
            </section>
            
            <section className="tasks-list-section">
              <div className="tasks-header">
                <h3>Mes tâches</h3>
                <div className="tasks-filter">
                  {/* Filtres à implémenter ultérieurement */}
                </div>
              </div>
              
              {erreur && <div className="error-message">{erreur}</div>}
              
              {chargement ? (
                <div className="loading">Chargement des tâches...</div>
              ) : (
                <div className="tasks-container">
                  {taches.length > 0 ? (
                    taches.map(tache => (
                      <TaskCard 
                        key={tache._id}
                        tache={tache}
                        onDelete={supprimerTache}
                        onToggleComplete={toggleTacheComplete}
                      />
                    ))
                  ) : (
                    <div className="empty-tasks">
                      <p>Aucune tâche trouvée. Ajoutez-en une !</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 