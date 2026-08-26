# Arquitetura do portal

O portal usa Next.js 14 com App Router, React 18 e Tailwind. `output: export` produz `out/`, publicado pelo GitHub Pages sob `/uaminfra-ita-IT-214`. O Pages fornece a interface estática; o Google Drive recebe atividades e projetos LaTeX, enquanto dúvidas e pedidos de nova senha seguem para o contato público da disciplina.

## Fontes centrais

- `data/course.json`: identidade, objetivos, módulos e equipe.
- `data/activities.json`: cronograma, estado, entregáveis, recursos e apresentação.
- `data/resources.json`: catálogo, público, licença, arquivo e checksum.
- `data/presentations.json`: metadados dos decks e suas fontes.
- `data/access.json`: nomes, papéis e verificadores derivados das contas do piloto.
- `data/drive-submissions.json`: metadados e IDs das pastas individuais do Drive.
- `data/course-contact.json`: contato público autorizado para dúvidas e pedidos de nova senha.
- `data/brand-assets.json`: identidade visual pública e checksum do ícone do navegador.

Os PDFs públicos ficam em `public/resources/`, e os modelos públicos em `public/templates/`. Apresentações usam Reveal.js, mas o conteúdo e os gráficos permanecem componentes React/SVG do próprio projeto.

## Fluxo de entregas

O login visual valida a credencial no navegador e seleciona o destino pelo ID opaco da conta. `lib/driveCourse.mjs` transforma os IDs de pasta em links HTTPS. O Drive exige a sessão Google autorizada e aplica o controle real de acesso.

Na visão docente, `StaffSubmissionOverview` cruza os nomes do catálogo estático com os destinos do Drive. O painel oferece busca nominal e links diretos para atividades e LaTeX. Ele não usa token nem consulta arquivos privados; portanto, a conferência é manual.

O portal oferece três caminhos públicos: o projeto LaTeX organizado da IT-214; o Elsarticle da Elsevier, disponível como arquivo numérico rápido e pacote oficial completo; e um modelo editável em Word fornecido como referência à equipe docente. O aluno edita o formato escolhido e envia fontes, figuras, bibliografia e PDF final para a pasta individual `Projeto LaTeX`. A compilação automática no navegador não faz parte deste MVP.

## Dúvidas e senhas

O painel monta links `mailto:` com destinatário, assunto, nome, identificador e mensagem já preenchidos. O envio somente ocorre quando o aluno confirma no aplicativo de e-mail. A redefinição da senha continua local em `.private/` pelo comando `reset:password`, e a nova senha é entregue por canal privado.
