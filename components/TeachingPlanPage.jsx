'use client';

import { teachingPlan } from '@/data/courseData';

export default function TeachingPlanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4 md:px-8">
          <h1 className="text-4xl font-bold mb-2">Plano de Ensino</h1>
          <p className="text-amber-100">Estrutura e conteúdo da disciplina IT-214</p>
        </div>

        {/* Teaching Plan Description */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-amber-500 pb-3">
            Descrição do Plano
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {teachingPlan.description}
            </p>
          </div>
        </div>

        {/* Files Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-amber-500 pb-3">
            Arquivos do Plano
          </h2>

          {teachingPlan.files.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teachingPlan.files.map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-500 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <svg
                      className="h-8 w-8 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-600">Clique para download</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-500">
              <p className="text-gray-700">
                Arquivos serão adicionados em breve. Documentos em .pdf, .tex e outros formatos estarão disponíveis aqui.
              </p>
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="bg-amber-50 rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações Adicionais</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">•</span>
              <span>O plano de ensino apresenta os objetivos, metodologias e cronograma da disciplina</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">•</span>
              <span>Todos os documentos estão disponíveis para download em diversos formatos</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-3 font-bold">•</span>
              <span>Consulte regularmente esta page para atualizações do conteúdo</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
