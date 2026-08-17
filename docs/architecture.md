# Arquitetura do portal

O portal usa Next.js 14 com App Router, React 18 e Tailwind. `output: export` produz `out/`, publicado pelo mecanismo oficial do GitHub Pages sob `/uaminfra-ita-IT-214`. O GitHub Pages e o editor do GitHub são os únicos serviços do fluxo.

## Fontes centrais

- `data/course.json`: identidade, objetivos, módulos e equipe.
- `data/activities.json`: cronograma, estado, entregáveis, recursos e apresentação.
- `data/resources.json`: catálogo, público, licença, arquivo e checksum.
- `data/presentations.json`: metadados dos decks e suas fontes.
- `data/access.json`: nomes, papéis e verificadores derivados das contas do piloto.

Os PDFs públicos ficam em `public/resources/articles/`. Apresentações usam Reveal.js, mas o conteúdo e os gráficos permanecem componentes React/SVG do próprio projeto.

## Fluxo de entregas

O login visual valida a credencial no navegador. Ao clicar no envio, o frontend monta um link para `entregas/<studentId>/<activityCode>` na branch pública `student-submissions`; o próprio GitHub controla o upload e o commit. Instrutores e professor consultam a branch diretamente.

Senhas legíveis e e-mails usados no login ficam fora do Git. Trocas de senha ficam no KV `ACCOUNTS`, também como PBKDF2. Os trabalhos são deliberadamente públicos; notas, feedback reservado e qualquer conteúdo sigiloso permanecem fora deste fluxo.
