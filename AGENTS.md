# Regras permanentes do portal IT-214

Estas instruções valem para todo o repositório.

## Conteúdo e público

- Nunca inferir o público de um documento. Antes de adicioná-lo, registrar `audience` como `public`, `course`, `student`, `group` ou `instructors`.
- “Geral para a disciplina” não significa “público na internet”. Somente conteúdo marcado explicitamente como `public` pode entrar em `public/` ou no GitHub Pages.
- Entregas classificadas explicitamente como `public` podem ser gravadas na branch pública `student-submissions`, em pastas identificadas por IDs opacos. Materiais sigilosos continuam proibidos no Git público.
- Todo recurso deve possuir identificador estável, autoria, fonte, licença, resumo, relações acadêmicas e checksum quando for arquivo local.
- Evitar duplicatas: reutilizar o mesmo `resourceId` em atividades, apresentações e atribuições.
- Não copiar figuras ou trechos protegidos quando uma visualização original e citada atender ao objetivo didático.

## Segurança e dados acadêmicos

- A Área do aluno usa apenas uma separação visual no frontend estático. Ela não constitui autenticação segura nem controle real de autorização.
- Nunca versionar senhas legíveis, e-mails de login, diagnósticos, notas, feedback privado ou perfis acadêmicos privados. Credenciais legíveis permanecem somente em `.private/`.
- `data/access.json` pode conter nomes, papéis, identificadores derivados, salts e hashes de senha do piloto, mas nunca e-mails ou senhas legíveis.
- Como todo o bundle do GitHub Pages é público, somente informações não sigilosas podem aparecer nos painéis de aluno e docente.
- O MVP direciona trabalhos públicos para o editor do GitHub na branch `student-submissions`. Revisão, notas e aprovação não fazem parte desse fluxo.
- Abertura de um documento não prova leitura; registrar esses eventos separadamente.
- Aprovação de submissão é metadado auditável e restrito a docentes; não altera nem substitui o arquivo aprovado.

## Alterações no portal

- Manter `data/activities.json`, `data/resources.json` e `data/presentations.json` como fontes centrais e validar todas as relações.
- Usar `America/Sao_Paulo` para datas acadêmicas e estados explícitos para conclusão, cancelamento e recessos.
- Preservar exportação estática e compatibilidade com o base path `/uaminfra-ita-IT-214`.
- Mudanças no catálogo estático de acesso exigem teste positivo e negativo com as credenciais privadas locais e conferência dos papéis.
- Apresentações devem oferecer teclado, toque, tela cheia, visão geral, notas, impressão e movimento reduzido.
- Fotos e links pessoais só podem ser adicionados quando fornecidos ou confirmados pela própria equipe.

## Antes de commit ou deploy

- Conferir `git diff` e a classificação de público de cada novo documento.
- Executar `npm ci`, `npm run check`, `npm run lint` e os builds local e GitHub Pages.
- Confirmar que `out/` não contém segredos, dados de alunos ou arquivos não declarados.
- Commit, push e publicação remota exigem autorização explícita do usuário.

Consulte também `docs/architecture.md`, `docs/security.md`, `docs/content-governance.md`, `docs/backend-roadmap.md` e `docs/publishing.md`.
