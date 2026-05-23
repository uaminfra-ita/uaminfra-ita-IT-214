(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    8087: function (module, exports, require) {
      Promise.resolve().then(require.bind(require, 7125));
    },
    7125: function (module, exports, require) {
      "use strict";
      require.d(exports, {
        default: function () {
          return Navigation;
        },
      });

      var React = require(2265);
      var h = React.createElement;

      var instructors = [
        "Prof. Dr. Marcelo Xavier Guterres",
        "MSc. Gabriela Oliveira de Souza",
        "Rodrigo Mollo Furlan",
      ];

      var articles = [
        {
          title: "A city-centric approach to estimate and evaluate global Urban Air Mobility demand",
          url: "/files/A City-Centric Approach to Estimate the Global Demand of Urban Air Mobility.pdf",
          description: "Material de apoio para avaliacao e selecao de cidades para UAM",
        },
        {
          title: "Urban Air Mobility Communications and Networking Recent Advances, Techniques, and Challenges",
          url: "/files/Urban Air Mobility Communications and Networking Recent.pdf",
          description: "Material de apoio para infraestrutura de rede e tecnologias de comunicacao para UAM",
        },
        {
          title: "Urban Air Mobility History, Ecosystem, Market Potential, and Challenges",
          url: "/files/Urban Air Mobility History, Ecosystem.pdf",
          description: "Material de apoio para historico, ecossistema e potencial de mercado da UAM",
        },
        {
          title: "Urban air mobility: A comprehensive review and comparative analysis with autonomous and electric ground transportation",
          url: "/files/Urban air mobility A comprehensive review and comparative.pdf",
          description: "Material de apoio para analise comparativa entre UAM e modais terrestres",
        },
        {
          title: "A holistic review of the current state of research on aircraft design concepts",
          url: "/files/A holistic review of the current state of research on aircraft design concepts.pdf",
          description: "Material de apoio para conceitos de design e aplicacoes AAM",
        },
        {
          title: "An optimization framework for efficient urban air mobility systems",
          url: "/files/1-s2.0-S0966692326000657-main.pdf",
          description: "Material de apoio para localizacao de vertiportos, frota e despacho operacional",
        },
        {
          title: "Models, Methods, Concepts & Applications of the Analytic Hierarchy Process",
          url: "/files/TheAnalyticHierarchyProcess.pdf",
          description: "Second Edition",
        },
      ];

      var materials = [
        { title: "ebook v5 - 06/04/2026", url: "/files/ebook.pdf" },
        { title: "Metodo AHP.pdf", url: "/files/Método AHP.pdf" },
        { title: "TheAnalyticHierarchyProcess.pdf", url: "/files/TheAnalyticHierarchyProcess.pdf" },
        { title: "data_los_angeles.xls", url: "/files/data_los_angeles.xls" },
        { title: "los_angeles_aula.R", url: "/files/los_angeles_aula.R" },
        { title: "1-s2.0-S0966692326000657-main.pdf", url: "/files/1-s2.0-S0966692326000657-main.pdf" },
        { title: "main.pdf", url: "/files/main.pdf" },
      ];

      var normativeDocuments = [
        {
          category: "ICAO",
          description: "Anexos, documentos e procedimentos internacionais de referencia.",
          files: [
            ["Annex 14 - Volume I, 9th Edition, Amendment 18", "AN14_v1_9ed_amend_18.pdf"],
            ["Annex 14 - Volume I (Consolidated)", "AN14_V1_cons.pdf"],
            ["Annex 14 - Volume II (Consolidated)", "AN14_V2_cons.pdf"],
            ["Doc 8168 - Volume II, 7th Edition, Amendment 10", "8168_v2_7ed_amend_10_en.pdf"],
            ["Doc 9137 - Part 6 (Consolidated)", "Doc_9137_p6_cons_en.pdf"],
            ["Doc 9981 - PANS Aerodromes, 3rd Edition", "Doc_9981_3ed_en_PANS-AD.pdf"],
            ["Doc 9981 - PANS Aerodromes, Amendment 5", "Doc_9981_3ed_PANS-AD_amend_5_en.pdf"],
          ],
        },
        {
          category: "DECEA / Comando da Aeronautica",
          description: "Instrucoes, tabelas e anexos aplicaveis ao contexto brasileiro.",
          files: [
            ["ICA 11-3/2020", "ICA 11-3_2020.pdf"],
            ["Tabelas da ICA 11-3", "01 - TABELAS DA ICA 11-3.pdf"],
            ["Anexos da ICA 11-3", "02 - Anexos_ICA_11-3.pdf"],
            ["Tabelas e Anexos da ICA 11-3", "Tabelas_e_Anexos_ICA_11-3.pdf"],
            ["ICA 11-4/2020", "ICA 11-4_2020.pdf"],
            ["ICA 11-408/2020", "ICA 11-408_2020.pdf"],
            ["Figuras da ICA 11-408", "Figuras ICA 11-408.pdf"],
            ["Tabelas da ICA 11-408", "Tabelas ICA 11-408.pdf"],
            ["ICA 63-19/2020", "ICA 63-19_2020.pdf"],
            ["Tabelas da ICA 63-19", "Tabelas ICA 63-19.pdf"],
            ["TCA 53-2", "TCA 53-2.pdf"],
          ],
        },
        {
          category: "ANAC",
          description: "RBACs e instrucoes suplementares relacionados a aerodromos e heliportos.",
          files: [
            ["RBAC 154 - Emenda 08", "RBAC154EMD08.pdf"],
            ["RBAC 155 - Emenda 01, Helipontos", "RBAC155EMD01 _HELPN.pdf"],
            ["IS 153.51-001A - SMS", "IS153.51-001A_SMS.pdf"],
            ["IS 154.5-001A", "IS154.5-001A.pdf"],
          ],
        },
        {
          category: "FAA",
          description: "Regulamentos e ordens tecnicas dos Estados Unidos.",
          files: [
            ["14 CFR Part 77.19", "14 CFR Part 77.19.pdf"],
            ["Order 6750.16E - ILS Siting Criteria", "Order_6750_16E_ILS_Siting_Criteria_06-09-2014_for_Web_posting[1].pdf"],
            ["Order 6820.10 - VOR, DVOR and VORTAC", "Order_6820.10_VOR_DVOR_VORTAC.pdf"],
            ["Order 6820.14 - DME", "Order_6820.14_DME.pdf"],
            ["Order JO 7400.2R", "Order_JO7400.2R_Basic_w_Chg_1_dtd_8_7_25.pdf"],
          ],
        },
      ].map(function (group) {
        return Object.assign({}, group, {
          files: group.files.map(function (file) {
            return { title: file[0], fileName: file[1], url: "/normas/" + file[1] };
          }),
        });
      });

      function FileIcon() {
        return h(
          "svg",
          { className: "h-8 w-8 text-sky-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
          h("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
          })
        );
      }

      function Hero(props) {
        return h(
          "div",
          { className: "bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4 md:px-8 rounded-lg shadow-md mb-8" },
          props.kicker && h("p", { className: "text-sky-100 font-semibold mb-2" }, props.kicker),
          h("h1", { className: "text-4xl font-bold mb-2" }, props.title),
          h("p", { className: "text-sky-100" }, props.description)
        );
      }

      function LinkCard(props) {
        return h(
          "a",
          {
            href: props.href,
            target: "_blank",
            rel: "noopener noreferrer",
            className:
              "flex items-center p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg border-2 border-sky-300 hover:from-sky-100 hover:to-blue-100 transition-all hover:shadow-md",
          },
          h("div", { className: "flex-shrink-0" }, h(FileIcon)),
          h(
            "div",
            { className: "ml-4 min-w-0" },
            h("p", { className: "font-semibold text-gray-800 break-words" }, props.title),
            props.detail && h("p", { className: "text-sm text-gray-600 mt-1 break-words" }, props.detail),
            h("p", { className: "text-sm text-sky-700 font-semibold mt-1" }, "Clique para acessar")
          )
        );
      }

      function PageShell(props) {
        return h(
          "div",
          { className: "min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 md:px-8" },
          h("div", { className: "max-w-6xl mx-auto" }, props.children)
        );
      }

      function HomePage() {
        return h(
          "div",
          { className: "min-h-screen bg-gradient-to-br from-blue-50 to-sky-50" },
          h(
            "section",
            { className: "bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4 md:px-8" },
            h(
              "div",
              { className: "max-w-6xl mx-auto text-center" },
              h("h1", { className: "text-4xl md:text-5xl font-bold mb-2" }, "Mobilidade Aerea Urbana"),
              h("p", { className: "text-2xl text-sky-100 mb-2" }, "IT-214"),
              h(
                "div",
                { className: "flex flex-wrap justify-center gap-3 mt-4" },
                instructors.map(function (name) {
                  return h("span", { key: name, className: "bg-sky-500 px-4 py-2 rounded-full text-sm md:text-base" }, name);
                })
              )
            )
          ),
          h(
            "section",
            { className: "max-w-6xl mx-auto py-12 px-4 md:px-8" },
            h(
              "div",
              { className: "bg-white rounded-lg shadow-md p-8" },
              h("h2", { className: "text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3" }, "Bem-vindo a Disciplina"),
              h("p", { className: "text-gray-700 leading-relaxed text-lg" }, "Adicionar mensagem de introducao a disciplina aqui...")
            )
          )
        );
      }

      function SimplePage(props) {
        return h(
          PageShell,
          null,
          h(Hero, { title: props.title, description: props.description }),
          h(
            "section",
            { className: "bg-white rounded-lg shadow-md p-8" },
            h("h2", { className: "text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3" }, props.title),
            h("p", { className: "text-gray-700" }, props.emptyText)
          )
        );
      }

      function CourseMaterialsPage() {
        return h(
          PageShell,
          null,
          h(Hero, { title: "Materiais de Aula", description: "Acesso a aulas, notas e atividades da disciplina" }),
          h(
            "section",
            { className: "bg-white rounded-lg shadow-md p-8" },
            h("h2", { className: "text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3" }, "Materiais"),
            h(
              "div",
              { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
              materials.map(function (item) {
                return h(LinkCard, { key: item.url, href: item.url, title: item.title });
              })
            )
          )
        );
      }

      function DocumentsPage() {
        return h(
          PageShell,
          null,
          h(Hero, { title: "Documentos", description: "Acesso a artigos cientificos e materiais complementares da disciplina" }),
          h(
            "section",
            { className: "bg-white rounded-lg shadow-md p-8" },
            h("h2", { className: "text-2xl font-bold text-gray-800 mb-6 border-b-4 border-sky-600 pb-3" }, "Artigos Cientificos"),
            h(
              "div",
              { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
              articles.map(function (item) {
                return h(LinkCard, { key: item.url, href: item.url, title: item.title, detail: item.description });
              })
            )
          )
        );
      }

      function NormativeDocumentsPage() {
        var state = React.useState("");
        var query = state[0];
        var setQuery = state[1];
        var categoryState = React.useState("Todas");
        var activeCategory = categoryState[0];
        var setActiveCategory = categoryState[1];
        var totalFiles = normativeDocuments.reduce(function (total, group) {
          return total + group.files.length;
        }, 0);
        var categories = ["Todas"].concat(
          normativeDocuments.map(function (group) {
            return group.category;
          })
        );
        var normalizedQuery = query.trim().toLowerCase();
        var filteredGroups = normativeDocuments
          .filter(function (group) {
            return activeCategory === "Todas" || group.category === activeCategory;
          })
          .map(function (group) {
            return Object.assign({}, group, {
              files: group.files.filter(function (file) {
                var text = (file.title + " " + file.fileName + " " + group.category).toLowerCase();
                return !normalizedQuery || text.indexOf(normalizedQuery) !== -1;
              }),
            });
          })
          .filter(function (group) {
            return group.files.length > 0;
          });

        return h(
          PageShell,
          null,
          h(Hero, {
            kicker: "Biblioteca normativa",
            title: "Documentos Normativos",
            description: "Normas, regulamentos e documentos tecnicos de apoio para estudos de infraestrutura aeronautica e UAM.",
          }),
          h(
            "section",
            { className: "bg-white rounded-lg shadow-md p-6 md:p-8 mb-8" },
            h(
              "div",
              { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
              h("div", { className: "bg-sky-50 border-l-4 border-sky-600 rounded-lg p-4" }, h("p", { className: "text-sm font-semibold text-gray-600" }, "Arquivos"), h("p", { className: "text-3xl font-bold text-sky-600" }, totalFiles)),
              h("div", { className: "bg-sky-50 border-l-4 border-sky-600 rounded-lg p-4" }, h("p", { className: "text-sm font-semibold text-gray-600" }, "Categorias"), h("p", { className: "text-3xl font-bold text-sky-600" }, normativeDocuments.length)),
              h("div", { className: "bg-sky-50 border-l-4 border-sky-600 rounded-lg p-4" }, h("p", { className: "text-sm font-semibold text-gray-600" }, "Formato"), h("p", { className: "text-3xl font-bold text-sky-600" }, "PDF"))
            )
          ),
          h(
            "section",
            { className: "bg-white rounded-lg shadow-md p-6 md:p-8 mb-8" },
            h(
              "div",
              { className: "flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between" },
              h(
                "label",
                { className: "block flex-1" },
                h("span", { className: "text-sm font-semibold text-gray-700" }, "Buscar documento"),
                h("input", {
                  type: "search",
                  value: query,
                  onChange: function (event) {
                    return setQuery(event.target.value);
                  },
                  placeholder: "Ex.: ICA 11-3, Annex 14, RBAC 154",
                  className: "mt-2 w-full rounded-lg border-2 border-sky-200 px-4 py-3 text-gray-800 outline-none transition focus:border-sky-600",
                })
              ),
              h(
                "div",
                { className: "flex flex-wrap gap-2" },
                categories.map(function (category) {
                  return h(
                    "button",
                    {
                      key: category,
                      type: "button",
                      onClick: function () {
                        return setActiveCategory(category);
                      },
                      className:
                        "px-4 py-2 rounded-lg font-semibold border-2 transition-colors " +
                        (activeCategory === category
                          ? "bg-sky-600 border-sky-600 text-white"
                          : "bg-white border-sky-200 text-gray-700 hover:border-sky-600 hover:text-sky-700"),
                    },
                    category
                  );
                })
              )
            )
          ),
          filteredGroups.length
            ? h(
                "div",
                { className: "space-y-8" },
                filteredGroups.map(function (group) {
                  return h(
                    "section",
                    { key: group.category, className: "bg-white rounded-lg shadow-md p-6 md:p-8" },
                    h(
                      "div",
                      { className: "mb-6 border-b-4 border-sky-600 pb-3" },
                      h(
                        "div",
                        { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-2" },
                        h("div", null, h("h2", { className: "text-2xl font-bold text-gray-800" }, group.category), h("p", { className: "text-gray-600 mt-1" }, group.description)),
                        h("span", { className: "text-sm font-semibold text-sky-700 bg-sky-50 px-3 py-2 rounded-lg" }, group.files.length + " documento" + (group.files.length === 1 ? "" : "s"))
                      )
                    ),
                    h(
                      "div",
                      { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                      group.files.map(function (file) {
                        return h(LinkCard, { key: file.fileName, href: file.url, title: file.title, detail: file.fileName });
                      })
                    )
                  );
                })
              )
            : h(
                "section",
                { className: "bg-white rounded-lg shadow-md p-8 text-center" },
                h("h2", { className: "text-2xl font-bold text-gray-800 mb-2" }, "Nenhum documento encontrado"),
                h("p", { className: "text-gray-600" }, "Ajuste a busca ou selecione outra categoria.")
              )
        );
      }

      function NavIcon(props) {
        return h(
          "svg",
          { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", strokeWidth: 2 },
          h("rect", { x: props.x || 4, y: 4, width: 16, height: 16, rx: 2 }),
          h("line", { x1: 8, y1: 10, x2: 16, y2: 10 }),
          h("line", { x1: 8, y1: 14, x2: 16, y2: 14 })
        );
      }

      function Navigation() {
        var state = React.useState("home");
        var activeTab = state[0];
        var setActiveTab = state[1];
        var tabs = [
          { id: "home", label: "Inicial", component: h(HomePage), icon: h(NavIcon) },
          { id: "teaching-plan", label: "Plano de Ensino", component: h(SimplePage, { title: "Plano de Ensino", description: "Estrutura e conteudo da disciplina IT-214", emptyText: "Arquivos serao adicionados em breve." }), icon: h(NavIcon) },
          { id: "teams", label: "Equipes", component: h(SimplePage, { title: "Equipes", description: "Conheca os grupos de trabalho", emptyText: "As equipes de trabalho serao adicionadas em breve." }), icon: h(NavIcon) },
          { id: "materials", label: "Materiais de Aula", component: h(CourseMaterialsPage), icon: h(NavIcon) },
          { id: "documents", label: "Documentos", component: h(DocumentsPage), icon: h(NavIcon) },
          { id: "normative-documents", label: "Documentos Normativos", component: h(NormativeDocumentsPage), icon: h(NavIcon) },
        ];
        var currentTab =
          tabs.find(function (tab) {
            return tab.id === activeTab;
          }) || tabs[0];

        return h(
          "div",
          { className: "min-h-screen bg-sky-50" },
          h(
            "nav",
            { className: "bg-white shadow-md sticky top-0 z-50" },
            h(
              "div",
              { className: "max-w-7xl mx-auto px-4 md:px-8" },
              h(
                "div",
                { className: "flex flex-col md:flex-row items-start md:items-center gap-4 py-4" },
                h(
                  "div",
                  { className: "w-full md:w-auto mb-4 md:mb-0" },
                  h(
                    "div",
                    { className: "flex items-center gap-2" },
                    h("img", { src: "/images/ITA_logo.png", alt: "ITA Logo", className: "h-8 w-auto" }),
                    h("h1", { className: "text-2xl font-bold text-sky-600" }, "IT-214")
                  ),
                  h("p", { className: "text-sm text-gray-600" }, "Mobilidade Aerea Urbana")
                ),
                h(
                  "div",
                  { className: "w-full md:flex-1 overflow-x-auto" },
                  h(
                    "div",
                    { className: "flex gap-2 border-b border-gray-200" },
                    tabs.map(function (tab) {
                      return h(
                        "button",
                        {
                          key: tab.id,
                          onClick: function () {
                            return setActiveTab(tab.id);
                          },
                          className:
                            "px-4 py-3 font-semibold whitespace-nowrap flex items-center gap-2 border-b-4 transition-all " +
                            (activeTab === tab.id
                              ? "border-sky-600 text-sky-600"
                              : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"),
                        },
                        h("span", { className: "flex-shrink-0" }, tab.icon),
                        h("span", { className: "hidden sm:inline" }, tab.label)
                      );
                    })
                  )
                )
              )
            )
          ),
          h("main", null, currentTab.component),
          h(
            "footer",
            { className: "bg-gray-800 text-white py-8 px-4 md:px-8 mt-12" },
            h(
              "div",
              { className: "max-w-6xl mx-auto text-center" },
              h("h3", { className: "text-xl font-bold mb-2" }, "IT-214: Mobilidade Aerea Urbana"),
              h("p", { className: "text-gray-400 mb-4" }, "Instituto Tecnologico de Aeronautica (ITA)"),
              h("p", { className: "text-gray-500 text-sm" }, "© 2024-2026 ITA. Todos os direitos reservados.")
            )
          )
        );
      }
    },
  },
  function (require) {
    require.O(0, [971, 117, 744], function () {
      return require((require.s = 8087));
    });
    _N_E = require.O();
  },
]);
