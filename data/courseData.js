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
      url: "/files/A City-Centric Approach to Estimate the Global Demand of Urban Air Mobility.pdf",
      description: "Material de apoio para avaliação e seleção de cidades para UAM"
    },
    {
      title: "Urban Air Mobility Communications and Networking Recent Advances, Techniques, and Challenges",
      url: "/files/Urban Air Mobility Communications and Networking Recent.pdf",
      description: "Material de apoio para o mapeamento de infraestrutura de rede e tecnologias de comunicação essenciais para a operação segura e eficiente da UAM"
    },
    {
      title: "Urban Air Mobility History, Ecosystem, Market Potential, and Challenges",
      url: "/files/Urban Air Mobility History, Ecosystem.pdf",
      description: "Material de apoio para a compreensão histórica, estruturação do ecossistema e análise do potencial de mercado da UAM"
    },
    {
      title: "Urban air mobility: A comprehensive review and comparative analysis with autonomous and electric ground transportation for informing future research",
      url: "/files/Urban air mobility A comprehensive review and comparative.pdf",
      description: "Material de apoio para a análise comparativa entre a UAM e modais terrestres autônomos e elétricos para o direcionamento de pesquisas futuras"
    },
    {
      title: "A holistic review of the current state of research on aircraft design concepts and consideration for advanced air mobility applications",
      url: "/files/A holistic review of the current state of research on aircraft design concepts.pdf",
      description: "Material de apoio para a revisão holística de conceitos de design, arquiteturas de propulsão e critérios de avaliação para aeronaves de AAM"
    },
    {
      title: "An optimization framework for the design and operation of efficient urban air mobility systems: An application in the Ile-de-France region",
      url: "/files/1-s2.0-S0966692326000657-main.pdf",
      description: "Material de apoio para o desenvolvimento de um framework de otimização integrada de localização de vertiportos, frota e despacho operacional para sistemas de UAM"
    },
    {
      title: "Models, Methods, Concepts & Applications of the Analytic Hierarchy Process",
      url: "/files/TheAnalyticHierarchyProcess.pdf",
      description: "Second Edition"
    },
  ],
};

export const normativeDocuments = [
  {
    category: "ICAO",
    description: "Anexos, documentos e procedimentos internacionais de referência.",
    files: [
      {
        title: "Annex 14 - Volume I, 9th Edition, Amendment 18",
        fileName: "AN14_v1_9ed_amend_18.pdf",
      },
      {
        title: "Annex 14 - Volume I (Consolidated)",
        fileName: "AN14_V1_cons.pdf",
      },
      {
        title: "Annex 14 - Volume II (Consolidated)",
        fileName: "AN14_V2_cons.pdf",
      },
      {
        title: "Doc 8168 - Volume II, 7th Edition, Amendment 10",
        fileName: "8168_v2_7ed_amend_10_en.pdf",
      },
      {
        title: "Doc 9137 - Part 6 (Consolidated)",
        fileName: "Doc_9137_p6_cons_en.pdf",
      },
      {
        title: "Doc 9981 - PANS Aerodromes, 3rd Edition",
        fileName: "Doc_9981_3ed_en_PANS-AD.pdf",
      },
      {
        title: "Doc 9981 - PANS Aerodromes, Amendment 5",
        fileName: "Doc_9981_3ed_PANS-AD_amend_5_en.pdf",
      },
    ],
  },
  {
    category: "DECEA / Comando da Aeronáutica",
    description: "Instrucoes, tabelas e anexos aplicaveis ao contexto brasileiro.",
    files: [
      {
        title: "ICA 11-3/2020",
        fileName: "ICA 11-3_2020.pdf",
      },
      {
        title: "Tabelas da ICA 11-3",
        fileName: "01 - TABELAS DA ICA 11-3.pdf",
      },
      {
        title: "Anexos da ICA 11-3",
        fileName: "02 - Anexos_ICA_11-3.pdf",
      },
      {
        title: "Tabelas e Anexos da ICA 11-3",
        fileName: "Tabelas_e_Anexos_ICA_11-3.pdf",
      },
      {
        title: "ICA 11-4/2020",
        fileName: "ICA 11-4_2020.pdf",
      },
      {
        title: "ICA 11-408/2020",
        fileName: "ICA 11-408_2020.pdf",
      },
      {
        title: "Figuras da ICA 11-408",
        fileName: "Figuras ICA 11-408.pdf",
      },
      {
        title: "Tabelas da ICA 11-408",
        fileName: "Tabelas ICA 11-408.pdf",
      },
      {
        title: "ICA 63-19/2020",
        fileName: "ICA 63-19_2020.pdf",
      },
      {
        title: "Tabelas da ICA 63-19",
        fileName: "Tabelas ICA 63-19.pdf",
      },
      {
        title: "TCA 53-2",
        fileName: "TCA 53-2.pdf",
      },
    ],
  },
  {
    category: "ANAC",
    description: "RBACs e instrucoes suplementares relacionados a aerodromos e heliportos.",
    files: [
      {
        title: "RBAC 154 - Emenda 08",
        fileName: "RBAC154EMD08.pdf",
      },
      {
        title: "RBAC 155 - Emenda 01, Helipontos",
        fileName: "RBAC155EMD01 _HELPN.pdf",
      },
      {
        title: "IS 153.51-001A - SMS",
        fileName: "IS153.51-001A_SMS.pdf",
      },
      {
        title: "IS 154.5-001A",
        fileName: "IS154.5-001A.pdf",
      },
    ],
  },
  {
    category: "FAA",
    description: "Regulamentos e ordens tecnicas dos Estados Unidos.",
    files: [
      {
        title: "14 CFR Part 77.19",
        fileName: "14 CFR Part 77.19.pdf",
      },
      {
        title: "Order 6750.16E - ILS Siting Criteria",
        fileName: "Order_6750_16E_ILS_Siting_Criteria_06-09-2014_for_Web_posting[1].pdf",
      },
      {
        title: "Order 6820.10 - VOR, DVOR and VORTAC",
        fileName: "Order_6820.10_VOR_DVOR_VORTAC.pdf",
      },
      {
        title: "Order 6820.14 - DME",
        fileName: "Order_6820.14_DME.pdf",
      },
      {
        title: "Order JO 7400.2R",
        fileName: "Order_JO7400.2R_Basic_w_Chg_1_dtd_8_7_25.pdf",
      },
    ],
  },
].map((group) => ({
  ...group,
  files: group.files.map((file) => ({
    ...file,
    url: `/normas/${file.fileName}`,
  })),
}));
