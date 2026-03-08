// Dados da Disciplina IT-214
export const disciplineInfo = {
  code: "IT-214",
  title: "Mobilidade Aérea Urbana",
  instructors: [
    {
      id: 1,
      name: "Prof. Dr. Marcelo Xavier Guterres",
      title: "Professor",
      bio: "Adicionar descrição do instrutor",
      image: "/images/instructor1.jpg",
    },
    {
      id: 2,
      name: "MSc. Gabriela Oliveira de Souza",
      title: "Instrutor",
      bio: "Adicionar descrição do instrutor",
      image: "/images/instructor2.jpg",
    },
    {
      id: 3,
      name: "Rodrigo Mollo Furlan",
      title: "Instrutor",
      bio: "Adicionar descrição do instrutor",
      image: "/images/instructor3.jpg",
    },
  ],
  introduction: "Adicionar mensagem de introdução à disciplina aqui...",
};

export const teachingPlan = {
  description: "Adicionar descrição do plano de ensino aqui...",
  files: [
    // { name: "Plano de Ensino 2024", url: "/files/plano-ensino.pdf" },
    // { name: "Cronograma", url: "/files/cronograma.tex" },
  ],
};

export const teams = [
  {
    id: 1,
    name: "Grupo A",
    description: "Grupo de Trabalho A",
    members: [],
    githubLink: null,
  },
  {
    id: 2,
    name: "Grupo B",
    description: "Grupo de Trabalho B",
    members: [],
    githubLink: "https://biellgg14.github.io/IT-214/",
  },
];

export const courseMaterials = {
  lectures: [
    { title: "ebook v2 - 08/03/2026", url: "/files/ebook.pdf" },
    // { title: "Aula 1 - Introdução", url: "/materials/aula1.pdf" },
    // { title: "Aula 2 - Conceitos", url: "/materials/aula2.pdf" },
  ],
  activities: [
    // { title: "Atividade 1", description: "Descrição", dueDate: "2024-02-15", teams: ["Equipe 1"] },
    // { title: "Atividade 2", description: "Descrição", dueDate: "2024-03-01", teams: ["Equipe 1", "Equipe 2"] },
  ],
};

export const documents = {
  normative: [
    // { title: "Norma XXX", url: "/docs/norma1.pdf" },
  ],
  regulatory: [
    // { title: "Regulação YYY", url: "/docs/regulacao1.pdf" },
  ],
  conops: [
    // { title: "ConOps ZZZ", url: "/docs/conops1.pdf" },
  ],
  articles: [
    { 
      title: "A city-centric approach to estimate and evaluate global Urban Air Mobility demand", 
      url: "/files/A City-Centric Approach to Estimate the Global Demand of Urban Air Mobility.pdf",
      description: "Material de apoio para avaliação e seleção de cidades para UAM"
    },
  ],
};
