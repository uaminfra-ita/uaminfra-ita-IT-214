# 📊 Estrutura Final do Projeto

```
uaminfra-ita-IT-214/
│
├── 🗂️  app/                              # Aplicação Next.js
│   ├── layout.jsx                       # Layout global com metadados
│   ├── page.jsx                        # Página inicial (renderiza Navigation)
│   └── globals.css                     # Estilos CSS globais
│
├── 🗂️  components/                      # Componentes React reutilizáveis
│   ├── Navigation.jsx                  # ⭐ Componente principal (com abas)
│   ├── HomePage.jsx                    # Página Inicial
│   ├── TeachingPlanPage.jsx           # Plano de Ensino
│   ├── TeamsPage.jsx                   # Equipes
│   ├── CourseMaterialsPage.jsx         # Materiais de Aula
│   └── DocumentsPage.jsx               # Documentos e Normas
│
├── 🗂️  data/                            # Dados da aplicação
│   └── courseData.js                   # ⭐ ARQUIVO PRINCIPAL (editar conteúdo aqui!)
│
├── 🗂️  public/                          # Arquivos estáticos
│   ├── files/                          # Plano de ensino, cronograma, etc.
│   │   └── README.md                   # Instruções
│   ├── materials/                      # Aulas, notas, slides
│   │   └── README.md                   # Instruções
│   ├── docs/                           # Documentos, normas, artigos
│   │   ├── normativos/                 # (opcional)
│   │   ├── regulacoes/                 # (opcional)
│   │   ├── conops/                     # (opcional)
│   │   ├── artigos/                    # (opcional)
│   │   └── README.md                   # Instruções
│   ├── images/                         # Fotos dos instrutores
│   │   ├── instructor1.jpg
│   │   ├── instructor2.jpg
│   │   ├── instructor3.jpg
│   │   └── README.md                   # Instruções
│   └── favicon.ico                     # Ícone do site
│
├── 🗂️  .github/
│   └── workflows/
│       └── deploy.yml                  # Configuração de Deploy automático
│
├── 📄  Arquivos de Configuração
│   ├── package.json                    # Dependências do projeto
│   ├── next.config.js                  # Configuração do Next.js
│   ├── tailwind.config.js              # Configuração do Tailwind CSS
│   ├── postcss.config.js               # Configuração do PostCSS
│   ├── jsconfig.json                   # Aliases de importação (@/)
│   ├── .eslintrc.json                  # Configuração do ESLint
│   ├── .gitignore                      # Arquivos ignorados pelo Git
│   └── .env.example                    # Variáveis de ambiente (exemplo)
│
├── 📄  Documentação
│   ├── README.md                       # ⭐ Documentação principal
│   ├── CONTEUDO.md                     # Guia detalhado para adicionar conteúdo
│   ├── INICIO_RAPIDO.md                # Guia rápido para começar
│   └── ESTRUTURA.md                    # Este arquivo
│
└── 🚀 Scripts Disponíveis (executar com npm)
    ├── npm run dev        # Iniciar servidor de desenvolvimento
    ├── npm run build      # Build para produção
    ├── npm start          # Iniciar servidor de produção
    ├── npm run lint       # Verificar código
    └── npm run export     # Exportar como estático
```

## 🎯 Arquivos Principais

### 1. **data/courseData.js** ⭐ MAIS IMPORTANTE
Arquivo central contendo:
- Informações da disciplina
- Dados dos instrutores
- Plano de ensino
- Equipes
- Materiais de aula
- Documentos

**👉 Editar este arquivo para adicionar/alterar conteúdo!**

### 2. **components/Navigation.jsx** ⭐ COMPONENTE PRINCIPAL
Componente que:
- Renderiza as 5 abas
- Alterna entre páginas
- Contém barra de navegação
- Inclui rodapé

### 3. **app/page.jsx**
Página inicial que renderiza o componente `Navigation`

### 4. **public/** 📁 ARQUIVOS ESTÁTICOS
Pastas para:
- `/files/` - Documentos do plano de ensino
- `/materials/` - Materiais de aula
- `/docs/` - Documentos e normas
- `/images/` - Fotos dos instrutores

## 🎨 Abas Disponíveis

```
┌─────────────────────────────────────────────┐
│ IT-214 | Mobilidade Aérea Urbana           │
├─────────────────────────────────────────────┤
│ 🏠     📚      👥      📖      📋          │
│ Inicial Plano  Equipes Materiais Documentos│
└─────────────────────────────────────────────┘
```

| Aba | Arquivo | Conteúdo |
|-----|---------|----------|
| 🏠 **Inicial** | `HomePage.jsx` | Título, código, instrutores, intro |
| 📚 **Plano de Ensino** | `TeachingPlanPage.jsx` | Plano + downloads |
| 👥 **Equipes** | `TeamsPage.jsx` | Instrutores + Equipes + GitHub |
| 📖 **Materiais** | `CourseMaterialsPage.jsx` | Aulas + Atividades |
| 📋 **Documentos** | `DocumentsPage.jsx` | Normas + Regulações + ConOps + Artigos |

## 🗂️ Fluxo de Dados

```
data/courseData.js (dados)
         ↓
components/*.jsx (componentes)
         ↓
Navigation.jsx (renderiza)
         ↓
app/page.jsx (exibe)
         ↓
Navegador (usuário vê)
```

## 📝 Como Editar

1. **Abra**: `data/courseData.js`
2. **Edite**: Os dados que deseja alterar
3. **Salve**: Ctrl+S
4. **Recarregue**: F5 no navegador (em dev)

Tudo é automático! ✨

## 🚀 Deploy

1. **Push para GitHub**
   ```bash
   git push origin main
   ```

2. **GitHub Actions** executa automaticamente:
   - `npm install`
   - `npm run build`
   - Deploy para GitHub Pages

3. **Acesse**: `https://seu-usuario.github.io/uaminfra-ita-IT-214`

## 📦 Dependências

- `react@18.2.0` - Biblioteca UI
- `next@14.0.0` - Framework web
- `tailwindcss@3.3.6` - CSS utility
- `autoprefixer@10.4.16` - PostCSS plugin
- `postcss@8.4.31` - CSS processador

---

**Última atualização**: Março 2026
