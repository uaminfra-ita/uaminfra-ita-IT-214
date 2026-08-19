# Arquitetura do portal

O portal usa Next.js 14 com App Router, React 18 e Tailwind. `output: export` produz `out/`, publicado pelo GitHub Pages sob `/uaminfra-ita-IT-214`. O Pages fornece a interface estática; o Google Drive recebe atividades, projetos LaTeX, dúvidas e solicitações.

## Fontes centrais

- `data/course.json`: identidade, objetivos, módulos e equipe.
- `data/activities.json`: cronograma, estado, entregáveis, recursos e apresentação.
- `data/resources.json`: catálogo, público, licença, arquivo e checksum.
- `data/presentations.json`: metadados dos decks e suas fontes.
- `data/access.json`: nomes, papéis e verificadores derivados das contas do piloto.
- `data/drive-submissions.json`: metadados e IDs das pastas individuais do Drive.

Os PDFs públicos ficam em `public/resources/`. Apresentações usam Reveal.js, mas o conteúdo e os gráficos permanecem componentes React/SVG do próprio projeto.

## Fluxo de entregas

O login visual valida a credencial no navegador e seleciona o destino pelo ID opaco da conta. `lib/driveCourse.mjs` transforma os IDs de pasta em links HTTPS. O Drive exige a sessão Google autorizada e aplica o controle real de acesso.

Na visão docente, `StaffSubmissionOverview` cruza os nomes do catálogo estático com os destinos do Drive. O painel oferece busca nominal e links diretos para atividades, LaTeX e solicitações. Ele não usa token nem consulta arquivos privados; portanto, a conferência é manual.

Projetos LaTeX ficam na pasta individual `Projeto LaTeX`. O aluno baixa o modelo público, edita no ambiente de sua preferência e envia fontes, figuras, bibliografia e PDF compilado. A compilação automática no navegador não faz parte deste MVP.

## Dúvidas e senhas

O painel copia um texto estruturado e abre `Dúvidas e solicitações`. O aluno registra a demanda em um Google Doc sem incluir credenciais. A redefinição da senha continua local em `.private/` pelo comando `reset:password`, e a nova senha é entregue por canal privado.
