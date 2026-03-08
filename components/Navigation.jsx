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
    { 
      id: 'home', 
      label: 'Inicial', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="4" height="4" fill="currentColor" />
          <rect x="10" y="4" width="4" height="4" fill="currentColor" />
          <rect x="4" y="10" width="4" height="4" fill="currentColor" />
          <rect x="10" y="10" width="4" height="4" fill="currentColor" />
        </svg>
      )
    },
    { 
      id: 'teaching-plan', 
      label: 'Plano de Ensino', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <rect x="6" y="4" width="3" height="3" fill="currentColor" />
          <rect x="11" y="4" width="3" height="3" fill="currentColor" />
          <rect x="16" y="4" width="3" height="3" fill="currentColor" />
          <rect x="6" y="9" width="3" height="3" fill="currentColor" />
          <rect x="11" y="9" width="3" height="3" fill="currentColor" />
          <rect x="16" y="9" width="3" height="3" fill="currentColor" />
          <rect x="6" y="14" width="3" height="3" fill="currentColor" />
          <rect x="11" y="14" width="3" height="3" fill="currentColor" />
          <rect x="16" y="14" width="3" height="3" fill="currentColor" />
        </svg>
      )
    },
    { 
      id: 'teams', 
      label: 'Equipes', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3" fill="currentColor" />
          <path d="M12 14c-3.3 0-5.55 1.67-5.55 2.5v1.5h11.1v-1.5c0-.83-2.25-2.5-5.55-2.5z" fill="currentColor" />
        </svg>
      )
    },
    { 
      id: 'materials', 
      label: 'Materiais de Aula', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 2h12c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 4v3h12V6H6zm0 5v3h12v-3H6zm0 5v3h12v-3H6z" fill="currentColor" />
        </svg>
      )
    },
    { 
      id: 'documents', 
      label: 'Documentos', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <line x1="5" y1="4" x2="19" y2="4" stroke="currentColor" />
          <line x1="5" y1="8" x2="19" y2="8" stroke="currentColor" />
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" />
          <line x1="5" y1="16" x2="19" y2="16" stroke="currentColor" />
          <rect x="3" y="2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
    },
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
                    <span className="flex-shrink-0">{tab.icon}</span>
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
