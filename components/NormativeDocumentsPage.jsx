'use client';

import { useMemo, useState } from 'react';
import { normativeDocuments } from '@/data/courseData';

export default function NormativeDocumentsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  const totalFiles = normativeDocuments.reduce(
    (total, group) => total + group.files.length,
    0
  );

  const filteredGroups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return normativeDocuments
      .filter(
        (group) =>
          activeCategory === 'Todas' || group.category === activeCategory
      )
      .map((group) => ({
        ...group,
        files: group.files.filter((file) => {
          const searchable = `${file.title} ${file.fileName} ${group.category}`.toLowerCase();
          return !normalizedQuery || searchable.includes(normalizedQuery);
        }),
      }))
      .filter((group) => group.files.length > 0);
  }, [activeCategory, query]);

  const categories = ['Todas', ...normativeDocuments.map((group) => group.category)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4 md:px-8 rounded-lg shadow-md mb-8">
          <p className="text-sky-100 font-semibold mb-2">Biblioteca normativa</p>
          <h1 className="text-4xl font-bold mb-2">Documentos Normativos</h1>
          <p className="text-sky-100">
            Normas, regulamentos e documentos tecnicos de apoio para estudos de infraestrutura aeronautica e UAM.
          </p>
        </div>

        <section className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600">Arquivos</p>
              <p className="text-3xl font-bold text-sky-600">{totalFiles}</p>
            </div>
            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600">Categorias</p>
              <p className="text-3xl font-bold text-sky-600">
                {normativeDocuments.length}
              </p>
            </div>
            <div className="bg-sky-50 border-l-4 border-sky-600 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600">Formato</p>
              <p className="text-3xl font-bold text-sky-600">PDF</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <label className="block flex-1">
              <span className="text-sm font-semibold text-gray-700">Buscar documento</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex.: ICA 11-3, Annex 14, RBAC 154"
                className="mt-2 w-full rounded-lg border-2 border-sky-200 px-4 py-3 text-gray-800 outline-none transition focus:border-sky-600"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold border-2 transition-colors ${
                    activeCategory === category
                      ? 'bg-sky-600 border-sky-600 text-white'
                      : 'bg-white border-sky-200 text-gray-700 hover:border-sky-600 hover:text-sky-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {filteredGroups.length > 0 ? (
          <div className="space-y-8">
            {filteredGroups.map((group) => (
              <section key={group.category} className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <div className="mb-6 border-b-4 border-sky-600 pb-3">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{group.category}</h2>
                      <p className="text-gray-600 mt-1">{group.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-sky-700 bg-sky-50 px-3 py-2 rounded-lg">
                      {group.files.length} documento{group.files.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.files.map((file) => (
                    <a
                      key={file.fileName}
                      href={file.url}
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
                        <p className="font-semibold text-gray-800 break-words">{file.title}</p>
                        <p className="text-sm text-gray-600 break-words">{file.fileName}</p>
                        <p className="text-sm text-sky-700 font-semibold mt-1">Clique para acessar</p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Nenhum documento encontrado</h2>
            <p className="text-gray-600">Ajuste a busca ou selecione outra categoria.</p>
          </section>
        )}
      </div>
    </div>
  );
}
