# Arquitetura do portal

O portal usa Next.js 14 com App Router, React 18 e Tailwind. `output: export` produz `out/`, publicado pelo GitHub Pages sob `/uaminfra-ita-IT-214`. O Pages fornece a interface estática; o Google Drive recebe atividades e projetos LaTeX, enquanto uma automação mínima do Google Apps Script encaminha dúvidas e pedidos de nova senha ao contato público da disciplina.

## Fontes centrais

- `data/course.json`: identidade, objetivos, módulos e equipe.
- `data/activities.json`: cronograma, estado, entregáveis, recursos e apresentação.
- `data/resources.json`: catálogo, público, licença, arquivo e checksum.
- `data/presentations.json`: metadados dos decks e suas fontes.
- `data/access.json`: nomes, papéis e verificadores derivados das contas do piloto.
- `data/drive-submissions.json`: metadados e IDs das pastas individuais do Drive.
- `data/course-contact.json`: contato público autorizado para dúvidas e pedidos de nova senha.
- `data/support-service.json`: estado, endpoint público e artefatos verificados da automação de atendimento.
- `data/brand-assets.json`: identidade visual pública e checksum do ícone do navegador.

Os PDFs públicos ficam em `public/resources/`. Apresentações usam Reveal.js, mas o conteúdo e os gráficos permanecem componentes React/SVG do próprio projeto.

## Fluxo de entregas

O login visual valida a credencial no navegador e seleciona o destino pelo ID opaco da conta. `lib/driveCourse.mjs` transforma os IDs de pasta em links HTTPS. O Drive exige a sessão Google autorizada e aplica o controle real de acesso.

Na visão docente, `StaffSubmissionOverview` cruza os nomes do catálogo estático com os destinos do Drive. O painel oferece busca nominal e links diretos para atividades e LaTeX. Ele não usa token nem consulta arquivos privados; portanto, a conferência é manual.

Projetos LaTeX ficam na pasta individual `Projeto LaTeX`. O aluno baixa o modelo público, edita no ambiente de sua preferência e envia fontes, figuras, bibliografia e PDF compilado. A compilação automática no navegador não faz parte deste MVP.

## Dúvidas e senhas

O painel envia um formulário HTML para o aplicativo da Web em `integrations/google-apps-script/`. O Apps Script valida e limita as solicitações e usa somente o escopo `script.send_mail` para encaminhar a mensagem a `uam.infra@gmail.com`. A resposta volta para um `iframe` oculto por `postMessage`, permitindo confirmação na própria página sem expor tokens no bundle.

O endpoint permanece vazio e os botões ficam desativados enquanto a automação não for publicada na conta da disciplina. A URL `/exec`, depois de gerada, é registrada como configuração pública em `data/support-service.json`. A redefinição da senha continua local em `.private/` pelo comando `reset:password`, e a nova senha é entregue por canal privado.
