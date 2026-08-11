# Arquitetura do portal

O portal usa Next.js 14 com App Router, React 18 e Tailwind. `output: export` produz `out/`, publicado pelo mecanismo oficial do GitHub Pages sob `/uaminfra-ita-IT-214`. Todo o ambiente publicado é estático e público.

## Fontes centrais

- `data/course.json`: identidade, objetivos, módulos e equipe.
- `data/activities.json`: cronograma, estado, entregáveis, recursos e apresentação.
- `data/resources.json`: catálogo, público, licença, arquivo e checksum.
- `data/presentations.json`: metadados dos decks e suas fontes.
- `data/access.json`: nomes, papéis e verificadores derivados das contas do piloto.

Os PDFs públicos ficam em `public/resources/articles/`. Apresentações usam Reveal.js, mas o conteúdo e os gráficos permanecem componentes React/SVG do próprio projeto.

## Limite público/privado

O login estático apenas organiza a experiência visual. As senhas legíveis e os e-mails usados para login ficam em `.private/`, mas os dados exibidos após o login também fazem parte do JavaScript público. O Git não é banco acadêmico nem armazenamento de trabalhos.
