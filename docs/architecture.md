# Arquitetura do portal

O portal usa Next.js 14 com App Router, React 18 e Tailwind. `output: export` produz `out/`, publicado pelo mecanismo oficial do GitHub Pages sob `/uaminfra-ita-IT-214`. O GitHub Pages é a interface; arquivos, issues, commits, pull requests e Actions permanecem no próprio GitHub.

## Fontes centrais

- `data/course.json`: identidade, objetivos, módulos e equipe.
- `data/activities.json`: cronograma, estado, entregáveis, recursos e apresentação.
- `data/resources.json`: catálogo, público, licença, arquivo e checksum.
- `data/presentations.json`: metadados dos decks e suas fontes.
- `data/access.json`: nomes, papéis e verificadores derivados das contas do piloto.

Os PDFs públicos ficam em `public/resources/articles/`. Apresentações usam Reveal.js, mas o conteúdo e os gráficos permanecem componentes React/SVG do próprio projeto.

## Fluxo de entregas

O login visual valida a credencial no navegador. Ao clicar no envio, o frontend monta um link para `entregas/<studentId>/<activityCode>` na branch pública `student-submissions`; o próprio GitHub controla o upload e o commit. Instrutores e professor consultam a branch diretamente.

Na visão docente, `StaffSubmissionOverview` cruza o `displayName` do catálogo estático com o ID técnico e a árvore pública de arquivos. Busca, filtros e links nominais melhoram a operação sem substituir os IDs opacos nos caminhos. Para uso local fora do portal, `npm run index:submissions` gera um índice HTML/CSV em `.private/submissions/`, classificado para `instructors`.

O painel consulta uma única vez a árvore pública da branch pela API REST do GitHub e deriva contagens de entregas e arquivos LaTeX. A consulta não usa token e possui fallback para os links diretos do repositório.

Projetos LaTeX usam `projetos/<studentId>/main.tex`. O aluno pode editar no github.dev; commits e pull requests acionam `.github/workflows/latex.yml`, que compila sem shell escape e publica PDF e logs como artefatos temporários. O workflow tem somente `contents: read` e não grava resultados na branch.

Senhas legíveis e e-mails usados no login ficam fora do Git. A troca começa por uma issue pública sem credenciais e termina localmente em `.private/` com o comando `reset:password`. Os trabalhos, dúvidas e artefatos são deliberadamente públicos; notas, feedback reservado e qualquer conteúdo sigiloso permanecem fora deste fluxo.
