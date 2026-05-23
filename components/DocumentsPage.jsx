'use client';

import { documents } from '@/data/courseData';

export default function DocumentsPage() {
  const articlesData = documents?.articles || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4 md:px-8 rounded-lg shadow-md mb-8">
          <h1 className="text-4xl font-bold mb-2">Documentos</h1>
          <p className="text-sky-100">Acesso a artigos cientificos e materiais complementares da disciplina</p>
        </div>

        {articlesData.length > 0 ? (
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3">
              Artigos Cientificos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articlesData.map((doc, index) => (
                <a
                  key={index}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border-2 border-sky-300 hover:from-sky-100 hover:to-blue-100 transition-all hover:shadow-md"
                >
                  <div className="flex-shrink-0">
                    <svg
                      className="h-8 w-8 text-sky-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="font-semibold text-gray-800 break-words">{doc.title}</p>
                    {doc.description && (
                      <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                    )}
                    <p className="text-sm text-sky-700 font-semibold mt-1">Clique para acessar</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Nenhum documento cadastrado</h2>
            <p className="text-gray-600">Os materiais serao adicionados em breve.</p>
          </section>
        )}
      </div>
    </div>
  );
}
