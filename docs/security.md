# Segurança

## Estado atual

`/area-do-aluno/` valida e-mail e senha no navegador para organizar a experiência. O botão de envio abre o GitHub, que exige a autenticação própria da conta que fará o commit. A interface, as entregas, as dúvidas e os projetos LaTeX continuam públicos por decisão da disciplina.

O MVP não possui cadastro público, troca automática de senha, notas ou dados de desempenho.

## Invariantes

- Nenhuma senha legível ou e-mail de login entra no código, Git ou bundle.
- Credenciais legíveis permanecem em `.private/`, pasta ignorada pelo Git.
- Painéis e entregas contêm somente dados considerados públicos ou não sigilosos para a disciplina.
- Pastas públicas de entregas e projetos usam IDs opacos; nomes não fazem parte desses caminhos.
- O índice nominal de submissões tem público `instructors`, é gerado somente em `.private/` e nunca deve ser versionado.
- Recursos públicos precisam estar declarados em `resources.json`, com público e checksum.
- Notas, revisões privadas e materiais sigilosos não podem usar este fluxo.
- Solicitações de troca de senha nunca contêm a senha atual, a senha nova ou o e-mail do aluno.
- A compilação LaTeX roda sem shell escape e com `contents: read`; o resultado é um artefato temporário, não um commit automático.
- O painel pode ler apenas metadados e caminhos públicos da branch; essa leitura não comprova autoria, entrega no prazo ou aprovação docente.

O filtro individual do Pages melhora a navegação, mas não torna os arquivos secretos: qualquer pessoa pode consultar a branch pública, as issues, os artefatos permitidos e os commits pelo GitHub. O identificador em `sessionStorage` também pode ser alterado pelo usuário.

Se uma senha vazar, gere novamente o lote privado e `data/access.json`. Se um conteúdo sigiloso for publicado, retire-o imediatamente da versão corrente e avalie a necessidade de reescrever o histórico.

## Dependências

O `npm audit` de agosto de 2026 sinaliza advisories no Next.js 14 e no PostCSS interno. O resultado publicado não executa servidor Next, Server Actions, middleware, rewrites ou otimizador de imagens. A migração para Next.js 16/React 19 permanece uma etapa separada; não usar `npm audit fix --force` sem testes de compatibilidade.
