'use client';

import { documents } from '@/data/courseData';

export default function DocumentsPage() {
  const docCategories = [
    {
      id: 'normative',
      title: 'Documentos Normativos',
      icon: '📋',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      items: documents.normative,
    },
    {
      id: 'regulatory',
      title: 'Regulações',
      icon: '⚖️',
      color: 'from-sky-500 to-blue-500',
      borderColor: 'border-sky-600',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600',
      items: documents.regulatory,
    },
    {
      id: 'conops',
      title: 'ConOps (Conceito de Operações)',
      icon: '✈️',
      color: 'from-blue-400 to-cyan-500',
      borderColor: 'border-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      items: documents.conops,
    },
    {
      id: 'articles',
      title: 'Artigos Científicos',
      icon: '📰',
      color: 'from-sky-400 to-blue-400',
      borderColor: 'border-sky-500',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600',
      items: documents.articles,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Documentos e Normas</h1>
          <p className="text-sky-100">Acesso a materiais regulatórios, normativos e artigos científicos</p>
        </div>

        {/* Document Categories */}
        <div className="grid grid-cols-1 gap-8">
          {docCategories.map((category) => (
            <section key={category.id}>
              <div
                className={`bg-gradient-to-r ${category.color} text-white rounded-lg shadow-md p-6 mb-4`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
              </div>

              <div className={`bg-white rounded-lg shadow-md p-8`}>
                {category.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center p-4 ${category.bgColor} rounded-lg border-2 ${category.borderColor} hover:shadow-md transition-all cursor-pointer`}
                      >
                        <div className="flex-shrink-0">
                          <svg
                            className={`h-8 w-8 ${category.textColor}`}
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
                          <p className={`font-semibold ${category.textColor}`}>{doc.title}</p>
                          <p className="text-sm text-gray-600">Clique para download</p>
                        </div>
                        <svg
                          className={`h-5 w-5 ${category.textColor} flex-shrink-0`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11 3a1 1 0 100 2h3.586L9.293 9.293a1 1 0 000 1.414l1.414 1.414a1 1 0 001.414 0L17 7.414V11a1 1 0 102 0V5a1 1 0 00-1-1h-6z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className={`${category.bgColor} rounded-lg p-8 border-l-4 ${category.borderColor} text-center`}>
                    <p className="text-gray-700">
                      Documentos nesta categoria serão adicionados em breve. Fique atento para atualizações!
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* General Information */}
        <section className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Sobre os Documentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-600 text-white">
                  📋
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Normativos</h3>
                <p className="text-gray-600">
                  Documentos que estabelecem procedimentos e padrões para a disciplina
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  ⚖️
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Regulações</h3>
                <p className="text-gray-600">
                  Regulamentações e diretrizes que regem a execução das atividades
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
                  ✈️
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">ConOps</h3>
                <p className="text-gray-600">
                  Conceitos de operações e especificações técnicas para o domínio
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600 text-white">
                  📰
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Artigos</h3>
                <p className="text-gray-600">
                  Pesquisas e artigos científicos relacionados ao tema da disciplina
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
