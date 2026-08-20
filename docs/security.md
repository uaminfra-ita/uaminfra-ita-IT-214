# Segurança

## Estado atual

`/area-do-aluno/` valida e-mail e senha no navegador para organizar a experiência. Essa validação não é autenticação forte. Os arquivos acadêmicos ficam no Google Drive, cuja autenticação e permissões constituem o controle real de acesso.

O MVP não possui cadastro público, troca automática de senha, notas ou dados de desempenho. O GitHub permanece responsável somente pelo código e pela publicação do Pages. O endereço `uam.infra@gmail.com` foi classificado explicitamente pela equipe como contato público da disciplina.

## Invariantes

- Nenhuma senha legível entra no código, Git ou bundle. E-mails de login permanecem privados, exceto `uam.infra@gmail.com`, cuja publicação foi explicitamente autorizada pela equipe exclusivamente como canal público de atendimento.
- Credenciais legíveis permanecem em `.private/`, pasta ignorada pelo Git.
- `data/drive-submissions.json` contém IDs de pastas e declara `audience: public`, pois é incluído no bundle; os IDs não substituem permissões do Drive.
- Cada pasta individual deve ser compartilhada somente com o aluno correspondente e a equipe docente.
- A pasta raiz da disciplina não deve conceder edição para toda a turma.
- O índice nominal de submissões tem público `instructors`, é gerado em `.private/` e nunca deve ser versionado.
- Dúvidas e solicitações de senha são preparadas como composições do Gmail Web para o contato público e nunca contêm senha atual, senha nova, e-mail pessoal do aluno, nota ou feedback reservado.
- O portal não consulta o conteúdo do Drive e não afirma automaticamente que uma atividade foi entregue, lida ou aprovada.
- Recursos publicados pelo Pages continuam exigindo `audience: public`, licença, relações acadêmicas e checksum.

O identificador em `sessionStorage` pode ser alterado por quem controla o navegador. Isso pode trocar o link exibido, mas não deve conceder acesso ao arquivo: o Drive precisa negar qualquer conta não autorizada.

Se uma senha vazar, redefina-a pelo fluxo privado e recrie `data/access.json`. Se uma pasta for compartilhada incorretamente, corrija imediatamente as permissões no Drive e revise os arquivos acessíveis.

## Dependências

O `npm audit` de agosto de 2026 sinaliza advisories no Next.js 14 e no PostCSS interno. O resultado publicado não executa servidor Next, Server Actions, middleware, rewrites ou otimizador de imagens. A migração para Next.js 16/React 19 permanece uma etapa separada; não usar `npm audit fix --force` sem testes de compatibilidade.
