# Arquitetura do portal

O portal público usa Next.js 14 com App Router, React 18 e Tailwind. `output: export` produz `out/`, publicado pelo mecanismo oficial do GitHub Pages sob `/uaminfra-ita-IT-214`.

## Fontes centrais

- `data/course.json`: identidade, objetivos, módulos e equipe.
- `data/activities.json`: cronograma, estado, entregáveis, recursos e apresentação.
- `data/resources.json`: catálogo, público, licença, arquivo e checksum.
- `data/presentations.json`: metadados dos decks e suas fontes.

Os PDFs públicos ficam em `public/resources/articles/`. Apresentações usam Reveal.js, mas o conteúdo e os gráficos permanecem componentes React/SVG do próprio projeto.

## Limite público/privado

GitHub Pages é somente a camada pública. Autenticação, documentos restritos e submissões futuras serão serviços externos; o Git não será banco de dados acadêmico nem armazenamento de trabalhos.
