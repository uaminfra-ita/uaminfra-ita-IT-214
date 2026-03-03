# IT-214: Mobilidade Aérea Urbana

Portal da Disciplina IT-214 - Mobilidade Aérea Urbana do Instituto Tecnológico de Aeronáutica (ITA).

## 📋 Sobre a Disciplina

Disciplina de pós-graduação que aborda os conceitos, tecnologias e desafios da **Mobilidade Aérea Urbana (Urban Air Mobility - UAM)**. O curso fornece uma visão abrangente sobre sistemas de veículos aéreos autônomos urbanos, regulamentações, operações e aplicações práticas.

### Instrutores

- **Prof. Dr. Marcelo Xavier Guterres**
- **MSc. Gabriela Oliveira de Souza**
- **Rodrigo Mollo Furlan**

## 🚀 Estrutura do Portal

O portal está organizado em 5 abas principais:

### 1. 🏠 Página Inicial
- Apresentação da disciplina
- Informações dos instrutores
- Mensagem de boas-vindas

### 2. 📚 Plano de Ensino
- Descrição do plano de ensino
- Download de documentos relacionados (.pdf, .tex, etc.)

### 3. 👥 Equipes
- Apresentação dos instrutores
- Listagem de equipes de trabalho
- Membros de cada equipe
- Links para repositórios GitHub

### 4. 📖 Materiais de Aula
- Aulas e notas de classe
- Atividades e trabalhos
- Datas de vencimento

### 5. 📋 Documentos e Normas
- Documentos Normativos
- Regulações
- ConOps (Conceito de Operações)
- Artigos Científicos

## 🛠️ Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)** - Framework React
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização
- **[React 18](https://react.dev/)** - Biblioteca UI
- **[GitHub Pages](https://pages.github.com/)** - Hospedagem

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js 18 ou superior
- npm ou yarn

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/uaminfra-ita-IT-214.git
   cd uaminfra-ita-IT-214
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente** (opcional)
   ```bash
   cp .env.example .env.local
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse o portal**
   Abra http://localhost:3000 no seu navegador

## 📁 Estrutura do Projeto

```
uaminfra-ita-IT-214/
├── app/                          # Diretório principal do Next.js
│   ├── layout.jsx               # Layout global
│   ├── page.jsx                 # Página inicial
│   └── globals.css              # Estilos globais
├── components/                   # Componentes React
│   ├── Navigation.jsx           # Barra de navegação com abas
│   ├── HomePage.jsx             # Página inicial
│   ├── TeachingPlanPage.jsx    # Plano de ensino
│   ├── TeamsPage.jsx            # Equipes
│   ├── CourseMaterialsPage.jsx  # Materiais de aula
│   └── DocumentsPage.jsx        # Documentos e normas
├── data/                         # Dados da disciplina
│   └── courseData.js            # Informações centralizadas
├── public/                       # Arquivos estáticos
│   ├── favicon.ico
│   ├── images/                  # Imagens dos instrutores
│   ├── files/                   # Documentos (.pdf, .tex, etc.)
│   └── materials/               # Materiais de aula
├── package.json                 # Dependências do projeto
├── next.config.js              # Configuração do Next.js
├── tailwind.config.js          # Configuração do Tailwind CSS
├── postcss.config.js           # Configuração do PostCSS
├── jsconfig.json               # Aliases de importação
├── .gitignore                  # Arquivos ignorados pelo Git
├── .env.example                # Variáveis de ambiente exemplo
└── README.md                   # Este arquivo
```

## 🔧 Editar Conteúdo

### Adicionar/Editar Informações da Disciplina

Edite o arquivo [data/courseData.js](data/courseData.js):

```javascript
export const disciplineInfo = {
  code: "IT-214",
  title: "Mobilidade Aérea Urbana",
  instructors: [/* ... */],
  introduction: "Sua mensagem aqui",
};
```

### Adicionar Materiais de Aula

```javascript
export const courseMaterials = {
  lectures: [
    { title: "Aula 1 - Introdução", url: "/materials/aula1.pdf" },
    // ...
  ],
  activities: [
    { title: "Atividade 1", description: "...", dueDate: "2024-02-15", teams: ["Equipe 1"] },
    // ...
  ],
};
```

### Adicionar Equipes

```javascript
export const teams = [
  {
    id: 1,
    name: "Equipe 1",
    description: "Descrição da equipe",
    members: [
      { name: "Membro 1", role: "Coordenador" },
      // ...
    ],
    githubLink: "https://github.com/team1",
  },
  // ...
];
```

### Adicionar Documentos

```javascript
export const documents = {
  normative: [
    { title: "Norma XXX", url: "/docs/norma1.pdf" },
    // ...
  ],
  regulatory: [/* ... */],
  conops: [/* ... */],
  articles: [/* ... */],
};
```

## 🌐 Deploy no GitHub Pages

### 1. Crie um repositório GitHub
Se ainda não tiver, crie um repositório chamado `uaminfra-ita-IT-214` no GitHub.

### 2. Configure o repositório remoto
```bash
git remote add origin https://github.com/seu-usuario/uaminfra-ita-IT-214.git
git branch -M main
git push -u origin main
```

### 3. Build para produção
```bash
npm run build
```

### 4. Configure GitHub Actions (Opcional)
Crie um workflow `.github/workflows/deploy.yml` para deploy automático:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 5. Configure GitHub Pages
1. Vá para Settings do repositório
2. Selecione "Pages"
3. Em "Source", escolha "Deploy from a branch"
4. Selecione a branch `gh-pages` e a pasta `/root`

## 📝 Adicionar Imagens

Coloque as imagens dos instrutores em `public/images/`:
- `instructor1.jpg` - Prof. Dr. Marcelo Xavier Guterres
- `instructor2.jpg` - MSc. Gabriela Oliveira de Souza
- `instructor3.jpg` - Rodrigo Mollo Furlan

Edite o caminho em [data/courseData.js](data/courseData.js):

```javascript
instructors: [
  {
    // ...
    image: "/images/instructor1.jpg",
  },
  // ...
],
```

## 📄 Adicionar Arquivos e Documentos

Coloque os arquivos em:
- `public/files/` - Plano de ensino (.pdf, .tex, etc.)
- `public/materials/` - Materiais de aula
- `public/docs/` - Documentos, normas e artigos

Depois, adicione os links em [data/courseData.js](data/courseData.js).

## 🎨 Personalização

A paleta de cores pode ser modificada em [tailwind.config.js](tailwind.config.js):

```javascript
colors: {
  primary: '#0ea5e9',    // Azul
  secondary: '#f59e0b',  // Âmbar
}
```

Cada aba usa cores diferentes:
- **Inicial**: Azul (sky)
- **Plano de Ensino**: Âmbar (amber/orange)
- **Equipes**: Verde (green/emerald)
- **Materiais**: Roxo (purple/pink)
- **Documentos**: Índigo (indigo/purple)

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Lint do código
npm run lint

# Exportar como estático (GitHub Pages)
npm run export
```

## 📧 Contato

Para dúvidas ou sugestões sobre o portal, entre em contato com os instrutores:

- Prof. Dr. Marcelo Xavier Guterres
- MSc. Gabriela Oliveira de Souza
- Rodrigo Mollo Furlan

## 📜 Licença

Este projeto é mantido pelo Instituto Tecnológico de Aeronáutica (ITA).

## ✨ Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Última atualização**: Março 2026
