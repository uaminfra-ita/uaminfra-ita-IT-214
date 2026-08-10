# Regras permanentes do portal IT-214

Estas instruções valem para todo o repositório.

## Conteúdo e público

- Nunca inferir o público de um documento. Antes de adicioná-lo, registrar `audience` como `public`, `course`, `student`, `group` ou `instructors`.
- “Geral para a disciplina” não significa “público na internet”. Somente conteúdo marcado explicitamente como `public` pode entrar em `public/` ou no GitHub Pages.
- Conteúdo de aluno, grupo ou docentes nunca pode ser colocado no Git público. Se não houver armazenamento privado, não publicar.
- Todo recurso deve possuir identificador estável, autoria, fonte, licença, resumo, relações acadêmicas e checksum quando for arquivo local.
- Evitar duplicatas: reutilizar o mesmo `resourceId` em atividades, apresentações e atribuições.
- Não copiar figuras ou trechos protegidos quando uma visualização original e citada atender ao objetivo didático.

## Segurança e dados acadêmicos

- Nunca implementar autenticação por senha, hash, salt ou segredo validado no frontend.
- Nunca versionar credenciais, tokens, chaves administrativas, diagnósticos, notas, submissões ou perfis acadêmicos privados.
- A futura área autenticada deverá usar provedor real, armazenamento privado, RBAC/RLS, URLs temporárias e trilha de auditoria.
- Abertura de um documento não prova leitura; registrar esses eventos separadamente.
- Aprovação de submissão é metadado auditável e restrito a docentes; não altera nem substitui o arquivo aprovado.

## Alterações no portal

- Manter `data/activities.json`, `data/resources.json` e `data/presentations.json` como fontes centrais e validar todas as relações.
- Usar `America/Sao_Paulo` para datas acadêmicas e estados explícitos para conclusão, cancelamento e recessos.
- Preservar exportação estática e compatibilidade com o base path `/uaminfra-ita-IT-214`.
- Apresentações devem oferecer teclado, toque, tela cheia, visão geral, notas, impressão e movimento reduzido.
- Fotos e links pessoais só podem ser adicionados quando fornecidos ou confirmados pela própria equipe.

## Antes de commit ou deploy

- Conferir `git diff` e a classificação de público de cada novo documento.
- Executar `npm ci`, `npm run check`, `npm run lint` e os builds local e GitHub Pages.
- Confirmar que `out/` não contém segredos, dados de alunos ou arquivos não declarados.
- Commit, push e publicação remota exigem autorização explícita do usuário.

Consulte também `docs/architecture.md`, `docs/security.md`, `docs/content-governance.md`, `docs/backend-roadmap.md` e `docs/publishing.md`.
