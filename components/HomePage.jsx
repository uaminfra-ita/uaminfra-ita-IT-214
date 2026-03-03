'use client';

import { disciplineInfo } from '@/data/courseData';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {disciplineInfo.title}
          </h1>
          <p className="text-2xl text-sky-100 mb-2">{disciplineInfo.code}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {disciplineInfo.instructors.map((instructor) => (
              <span key={instructor.id} className="bg-sky-500 px-4 py-2 rounded-full text-sm md:text-base">
                {instructor.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3">
            Bem-vindo à Disciplina
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {disciplineInfo.introduction}
          </p>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="max-w-6xl mx-auto py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Equipe Docente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplineInfo.instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="bg-gradient-to-r from-sky-500 to-blue-500 h-32"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{instructor.name}</h3>
                <p className="text-sky-600 font-semibold mb-3">{instructor.title}</p>
                <p className="text-gray-600">{instructor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="bg-sky-100 py-12 px-4 md:px-8 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">IT-214</div>
              <p className="text-gray-600">Código da Disciplina</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">3</div>
              <p className="text-gray-600">Instrutores</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-sky-600 mb-2">~</div>
              <p className="text-gray-600">Equipes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
