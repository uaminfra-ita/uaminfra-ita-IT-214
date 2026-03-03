'use client';

import { courseMaterials } from '@/data/courseData';

export default function CourseMaterialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Materiais de Aula</h1>
          <p className="text-sky-100">Acesso a aulas, notas e atividades da disciplina</p>
        </div>

        {/* Class Materials Section */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3">
            📚 Aulas
          </h2>

          {courseMaterials.lectures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseMaterials.lectures.map((lecture, index) => (
                <a
                  key={index}
                  href={lecture.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border-2 border-sky-300 hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 transition-all cursor-pointer hover:shadow-md"
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
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{lecture.title}</p>
                    <p className="text-sm text-gray-600">Clique para acessar</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-sky-50 rounded-lg p-6 border-l-4 border-sky-600">
              <p className="text-gray-700">
                As notas de aula e materiais didáticos serão adicionados em breve nesta seção.
              </p>
            </div>
          )}
        </section>

        {/* Activities Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3">
            ✏️ Atividades
          </h2>

          {courseMaterials.activities.length > 0 ? (
            <div className="space-y-4">
              {courseMaterials.activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-6 border-l-4 border-sky-600 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{activity.title}</h3>
                      <p className="text-gray-600 mt-2">{activity.description}</p>
                    </div>
                    <div className="mt-3 md:mt-0 flex-shrink-0 bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold whitespace-nowrap ml-4">
                      {activity.dueDate}
                    </div>
                  </div>

                  {activity.teams && activity.teams.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activity.teams.map((team, teamIndex) => (
                        <span
                          key={teamIndex}
                          className="bg-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {team}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-sky-50 rounded-lg p-6 border-l-4 border-sky-600">
              <p className="text-gray-700">
                As atividades para cada grupo serão divulgadas nesta seção conforme o cronograma da disciplina.
              </p>
            </div>
          )}
        </section>

        {/* Info Box */}
        <div className="bg-sky-50 rounded-lg shadow-md p-8 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Dicas Importantes</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-sky-600 mr-3 font-bold">•</span>
              <span>Todos os materiais estão organizados por ordem de apresentação</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-600 mr-3 font-bold">•</span>
              <span>Verifique as datas de vencimento das atividades regularmente</span>
            </li>
            <li className="flex items-start">
              <span className="text-sky-600 mr-3 font-bold">•</span>
              <span>Entre em contato com os instrutores em caso de dúvidas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
