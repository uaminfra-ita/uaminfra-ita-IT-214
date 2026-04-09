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
    { title: "ebook v5 - 06/04/2026", url: "/files/ebook.pdf" },
    // { title: "Aula 1 - Introdução", url: "/materials/aula1.pdf" },
    // { title: "Aula 2 - Conceitos", url: "/materials/aula2.pdf" },
  ],
  activities: [
    // { title: "Atividade 1", description: "Descrição", dueDate: "2024-02-15", teams: ["Equipe 1"] },
    // { title: "Atividade 2", description: "Descrição", dueDate: "2024-03-01", teams: ["Equipe 1", "Equipe 2"] },
  ],
  materials: [
    { 
      title: "Método AHP.pdf", 
      url: "/files/Método AHP.pdf",
      description: "Material para apoio sobre o Processo Hierárquico Analítico"
    },
    {
      title: "TheAnalyticHierarchyProcess.pdf",
      url: "/files/TheAnalyticHierarchyProcess.pdf",
    },
    {
      title: "data_los_angeles.xls",
      url: "/files/data_los_angeles.xls",
    },
    {
      title: "los_angeles_aula.R",
      url: "/files/los_angeles_aula.R",
    },
    {
      title: "1-s2.0-S0966692326000657-main.pdf",
      url: "/files/1-s2.0-S0966692326000657-main.pdf",
    },
    {
      title: "main.pdf",
      url: "/files/main.pdf",
    },
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
      url: "/files/1-s2.0-S0966692326000657-main.pdf",
    },
    {
      title: "Urban Air Mobility History, Ecosystem",
      url: "/files/Urban Air Mobility History, Ecosystem.pdf",
    },
    {
      title: "Urban Air Mobility Communications and Networking Recent",
      url: "/files/Urban Air Mobility Communications and Networking Recent.pdf",
    },
    {
      title: "A holistic review of the current state of research on aircraft design concepts",
      url: "/files/A holistic review of the current state of research on aircraft design concepts.pdf",
    },
    {
      title: "Urban air mobility A comprehensive review and comparative",
      url: "/files/Urban air mobility A comprehensive review and comparative.pdf",
    },
  ],
};
