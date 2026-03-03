# 📚 Guia de Adição de Conteúdo

Este documento fornece instruções passo a passo para adicionar e editar conteúdo no portal IT-214.

## 🎯 Arquivos Principais a Editar

Todo o conteúdo dinâmico é centralizado em um único arquivo:

**Arquivo principal**: `data/courseData.js`

## 📝 Como Adicionar Conteúdo

### 1️⃣ Mensagem de Introdução (Página Inicial)

Edite em `data/courseData.js`:

```javascript
export const disciplineInfo = {
  // ...
  introduction: "Bem-vindo à disciplina de Mobilidade Aérea Urbana! Esta disciplina aborda...",
};
```

### 2️⃣ Descrição do Plano de Ensino

Edite em `data/courseData.js`:

```javascript
export const teachingPlan = {
  description: `
    O plano de ensino desta disciplina contempla:
    
    - Conceitos fundamentais de UAM
    - Sistemas de controle de tráfego aéreo urbano
    - Regulamentações internacionais
    - Estudos de caso e aplicações práticas
    
    ...
  `,
  files: [
    // será preenchido a seguir
  ],
};
```

### 3️⃣ Adicionar Arquivos do Plano

1. **Coloque o arquivo em**: `public/files/`
   
   Exemplo:
   - `public/files/plano-ensino-2024.pdf`
   - `public/files/cronograma.tex`

2. **Adicione o link em** `data/courseData.js`:

```javascript
export const teachingPlan = {
  description: "...",
  files: [
    { name: "Plano de Ensino 2024", url: "/files/plano-ensino-2024.pdf" },
    { name: "Cronograma", url: "/files/cronograma.tex" },
    { name: "Ementa", url: "/files/ementa.pdf" },
  ],
};
```

### 4️⃣ Adicionar Equipes

1. **Edite** `data/courseData.js`:

```javascript
export const teams = [
  {
    id: 1,
    name: "Equipe Alpha",
    description: "Equipe responsável por análise de sistemas de controle",
    members: [
      { name: "João Silva", role: "Coordenador" },
      { name: "Maria Santos", role: "Desenvolvedor" },
      { name: "Pedro Costa", role: "Pesquisador" },
    ],
    githubLink: "https://github.com/seu-usuario/equipe-alpha",
  },
  {
    id: 2,
    name: "Equipe Beta",
    description: "Equipe responsável por simulações de tráfego aéreo",
    members: [
      { name: "Ana Ferreira", role: "Coordenadora" },
      { name: "Carlos Mendes", role: "Engenheiro" },
    ],
    githubLink: "https://github.com/seu-usuario/equipe-beta",
  },
  // Adicione mais equipes conforme necessário
];
```

### 5️⃣ Adicionar Materiais de Aula

#### Adicionar Aulas:

1. **Coloque os arquivos em**: `public/materials/`

2. **Edite** `data/courseData.js`:

```javascript
export const courseMaterials = {
  lectures: [
    { title: "Aula 1 - Introdução a UAM", url: "/materials/aula1-introducao.pdf" },
    { title: "Aula 2 - Conceitos Fundamentais", url: "/materials/aula2-conceitos.pdf" },
    { title: "Aula 3 - Regulamentações", url: "/materials/aula3-regulacoes.pdf" },
    { title: "Aula 4 - Tecnologias de Controle", url: "/materials/aula4-tecnologias.pdf" },
  ],
  activities: [
    // será preenchido a seguir
  ],
};
```

#### Adicionar Atividades:

```javascript
export const courseMaterials = {
  lectures: [/* ... */],
  activities: [
    {
      title: "Atividade 1 - Análise de Conceito",
      description: "Análise crítica de um sistema UAM existente. Entregar relatório em PDF.",
      dueDate: "2024-03-15",
      teams: ["Equipe Alpha", "Equipe Beta"],
    },
    {
      title: "Atividade 2 - Simulação de Tráfego",
      description: "Simulação de operações de múltiplos VANTs em ambiente urbano.",
      dueDate: "2024-04-20",
      teams: ["Equipe Beta"],
    },
    {
      title: "Atividade 3 - Apresentação Final",
      description: "Apresentação dos resultados do projeto da equipe.",
      dueDate: "2024-05-30",
      teams: ["Equipe Alpha", "Equipe Beta"],
    },
  ],
};
```

### 6️⃣ Adicionar Documentos e Normas

#### Estrutura de Documentos:

```javascript
export const documents = {
  normative: [
    { title: "Norma NBR XXXX - UAM", url: "/docs/nbr-uam.pdf" },
    { title: "Resolução ANAC YYY", url: "/docs/resolucao-anac-yyy.pdf" },
  ],
  regulatory: [
    { title: "Regulação EASA Part-XXX", url: "/docs/easa-part-xxx.pdf" },
    { title: "FAA Advisory Circular ZZZ", url: "/docs/faa-ac-zzz.pdf" },
  ],
  conops: [
    { title: "ConOps Sistema de Controle de Tráfego Urbano", url: "/docs/conops-atco.pdf" },
    { title: "ConOps Operações de Entrega de Carga", url: "/docs/conops-cargo.pdf" },
  ],
  articles: [
    { title: "Urban Air Mobility: A Comprehensive Review", url: "/docs/article1.pdf" },
    { title: "Safety Considerations for UAM Systems", url: "/docs/article2.pdf" },
  ],
};
```

#### Passos:

1. **Coloque os arquivos em**: `public/docs/`

2. **Organize em subpastas** (opcional):
   - `public/docs/normative/`
   - `public/docs/regulatory/`
   - `public/docs/conops/`
   - `public/docs/articles/`

3. **Edite** `data/courseData.js` e adicione os links

## 📸 Adicionar Fotos dos Instrutores

1. **Coloque as imagens em**: `public/images/`

   Nome das imagens:
   - `instructor1.jpg` - Prof. Dr. Marcelo Xavier Guterres
   - `instructor2.jpg` - MSc. Gabriela Oliveira de Souza
   - `instructor3.jpg` - Rodrigo Mollo Furlan

2. **As imagens são automaticamente carregadas** no arquivo `data/courseData.js`

## 🎨 Personalizar Descrições dos Instrutores

Edite `data/courseData.js`:

```javascript
export const disciplineInfo = {
  // ...
  instructors: [
    {
      id: 1,
      name: "Prof. Dr. Marcelo Xavier Guterres",
      title: "Professor",
      bio: "Prof. Dr. Marcelo é especialista em... com mais de 20 anos de experiência...",
      image: "/images/instructor1.jpg",
    },
    // ...
  ],
};
```

## 🔗 Adicionar Links em Bio dos Instrutores

Você pode adicionar informações de contato. Edite o arquivo `components/TeamsPage.jsx` para estender a exibição com email ou URLs.

## ⚡ Sugestões de Formatos de Arquivo

- **Plano de Ensino**: `.pdf`, `.tex`, `.docx`, `.odt`
- **Aulas**: `.pdf`, `.pptx`, `.ppt`
- **Atividades**: Descrição de texto no `courseData.js`
- **Documentos**: `.pdf`

## 🔄 Atualizar Conteúdo

Após fazer alterações em `data/courseData.js`:

1. **Salve o arquivo**
2. **O servidor de desenvolvimento recarrega automaticamente** (se estiver rodando)
3. **Recarregue a página no navegador** (F5)

## ✅ Verificação

- ✓ Verifique se todos os links estão corretos
- ✓ Teste os downloads
- ✓ Valide o layout em dispositivos móveis
- ✓ Confirme que as cores estão consistentes

## 🚨 Solução de Problemas

### Arquivo não aparece no download
- Verifique se o arquivo está em `public/`
- Confirme o caminho exato: `/files/`, `/materials/`, `/docs/`, etc.
- Verifique se há espaços extras no nome do arquivo

### Página não recarrega após editar
- Limpe o cache do navegador (Ctrl+Shift+Del)
- Reinicie o servidor: `npm run dev`

### Imagens não aparecem
- Coloque as imagens em `public/images/`
- Use nomes sem espaços ou caracteres especiais
- Formatos suportados: `.jpg`, `.png`, `.gif`, `.webp`

## 📞 Suporte

Para dúvidas, consulte o [README.md](../README.md) ou entre em contato com os instrutores.

---

**Última atualização**: Março 2026
