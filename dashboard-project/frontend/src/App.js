import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Personnel
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Widget Météo */}
          <div className="widget bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Météo</h2>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">En cours de développement</p>
            </div>
          </div>
          
          {/* Widget Tâches */}
          <div className="widget bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tâches</h2>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">En cours de développement</p>
            </div>
          </div>
          
          {/* Widget Notes */}
          <div className="widget bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Notes</h2>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">En cours de développement</p>
            </div>
          </div>
          
          {/* Widget Informations Système */}
          <div className="widget bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Système</h2>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">En cours de développement</p>
            </div>
          </div>
          
          {/* Widget Calendrier */}
          <div className="widget bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Calendrier</h2>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">En cours de développement</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
