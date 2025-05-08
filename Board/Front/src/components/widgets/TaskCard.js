import React from 'react';
import './TaskCard.css';

/**
 * Carte de tâche avec design moderne et pourpre
 * @param {Object} props
 * @param {Object} props.tache - Données de la tâche
 * @param {Function} props.onDelete - Fonction pour supprimer la tâche
 * @param {Function} props.onToggleComplete - Fonction pour marquer comme terminé
 */
const TaskCard = ({ tache, onDelete, onToggleComplete }) => {
  const formattedDate = new Date(tache.dateCreation).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`task-card ${tache.terminee ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{tache.titre}</h3>
          <div className="task-actions">
            <button 
              className="btn-complete" 
              onClick={() => onToggleComplete(tache._id)}
              title={tache.terminee ? "Marquer comme non terminée" : "Marquer comme terminée"}
            >
              {tache.terminee ? "✓" : "○"}
            </button>
            <button 
              className="btn-delete" 
              onClick={() => onDelete(tache._id)}
              title="Supprimer"
            >
              ×
            </button>
          </div>
        </div>
        
        {tache.description && (
          <p className="task-description">{tache.description}</p>
        )}
        
        <div className="task-footer">
          <span className="task-date">Créée le {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 