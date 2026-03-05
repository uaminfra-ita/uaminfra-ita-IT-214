'use client';

import { useState } from 'react';
import HomePage from './HomePage';
import TeachingPlanPage from './TeachingPlanPage';
import TeamsPage from './TeamsPage';
import CourseMaterialsPage from './CourseMaterialsPage';
import DocumentsPage from './DocumentsPage';

export default function Navigation() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Inicial', icon: '🏠' },
    { id: 'teaching-plan', label: 'Plano de Ensino', icon: '📚' },
    { id: 'teams', label: 'Equipes', icon: '👥' },
    { id: 'materials', label: 'Materiais de Aula', icon: '📖' },
    { id: 'documents', label: 'Documentos', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <img src="/images/ITA_logo.png" alt="ITA Logo" className="h-8 w-auto" />
                <h1 className="text-2xl font-bold text-sky-600">IT-214</h1>
              </div>
              <p className="text-sm text-gray-600">Mobilidade Aérea Urbana</p>
            </div>
            <div className="w-full md:flex-1 overflow-x-auto">
              <div className="flex gap-2 border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 font-semibold whitespace-nowrap flex items-center gap-2 border-b-4 transition-all ${
                      activeTab === tab.id
                        ? 'border-sky-600 text-sky-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'teaching-plan' && <TeachingPlanPage />}
        {activeTab === 'teams' && <TeamsPage />}
        {activeTab === 'materials' && <CourseMaterialsPage />}
        {activeTab === 'documents' && <DocumentsPage />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 md:px-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">IT-214: Mobilidade Aérea Urbana</h3>
          <p className="text-gray-400 mb-4">
            Instituto Tecnológico de Aeronáutica (ITA)
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Email
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contato
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024-2026 ITA. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
