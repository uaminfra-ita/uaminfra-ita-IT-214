'use client';

import { documents } from '@/data/courseData';

export default function DocumentsPage() {
  try {
    // Debug: verificar se documents está sendo importado
    const articlesData = documents?.articles || [];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4 md:px-8 rounded-lg shadow-md mb-8">
            <h1 className="text-4xl font-bold mb-2">Documentos e Normas</h1>
            <p className="text-sky-100">Acesso a materiais regulatórios, normativos e artigos científicos</p>
          </div>

          {/* Debug Info */}
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-8">
            <p className="text-blue-900 font-semibold">Status do Carregamento:</p>
            <p className="text-sm text-blue-800 mt-2">Artigos carregados: {articlesData.length}</p>
            <p className="text-sm text-blue-800 mt-1">Type: {typeof articlesData}</p>
          </div>

          {/* Articles Section */}
          {articlesData.length > 0 ? (
            <section>
              <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-2xl font-bold">Artigos Científicos ({articlesData.length})</h2>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {articlesData.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-sky-50 rounded-lg border-2 border-sky-600 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex-shrink-0">
                        <svg
                          className="h-8 w-8 text-sky-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 1 1 0 000-2 4 4 0 00-4 4v10a4 4 0 004 4h12a4 4 0 004-4V5a4 4 0 00-4-4 1 1 0 000 2 2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-semibold text-sky-600">{doc.title}</p>
                        {doc.description && <p className="text-sm text-gray-500 mt-1">{doc.description}</p>}
                        <p className="text-sm text-gray-600">Clique para download</p>
                      </div>
                      <svg
                        className="h-5 w-5 text-sky-600 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11 3a1 1 0 100 2h3.586L9.293 9.293a1 1 0 000 1.414l1.414 1.414a1 1 0 001.414 0L17 7.414V11a1 1 0 102 0V5a1 1 0 00-1-1h-6z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 text-center">
              <p className="text-yellow-800 font-semibold">Nenhum artigo carregado</p>
              <p className="text-sm text-yellow-700 mt-2">Dados: {JSON.stringify(articlesData)}</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-red-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 border-2 border-red-400 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Erro ao carregar Documentos</h1>
            <p className="text-red-700 font-mono whitespace-pre-wrap">{error?.message}</p>
            <p className="text-sm text-red-600 mt-4">{error?.stack}</p>
          </div>
        </div>
      </div>
    );
  }
}
