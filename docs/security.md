# Segurança

## Estado atual

`/area-do-aluno/` possui um bloqueio visual com e-mail e senha validado no próprio navegador. PBKDF2 reduz a exposição direta das senhas, mas não transforma o GitHub Pages em ambiente privado e não impede manipulação do frontend.

O MVP não possui cadastro público, recuperação de senha, upload, submissões, notas ou dados de desempenho.

## Invariantes

- Nenhuma senha legível ou e-mail de login entra no código, Git ou bundle.
- Credenciais legíveis permanecem em `.private/`, pasta ignorada pelo Git.
- Painéis contêm somente dados considerados públicos ou não sigilosos para a disciplina.
- Recursos públicos precisam estar declarados em `resources.json`, com público e checksum.
- Entregas, notas, revisões e materiais individuais reais não podem usar este bloqueio visual.

Se uma senha vazar, gere novamente o lote privado e `data/access.json`. Se um conteúdo sigiloso for publicado, retire-o imediatamente da versão corrente e avalie a necessidade de reescrever o histórico.

## Dependências

O `npm audit` de agosto de 2026 sinaliza advisories no Next.js 14 e no PostCSS interno. O resultado publicado não executa servidor Next, Server Actions, middleware, rewrites ou otimizador de imagens. A migração para Next.js 16/React 19 permanece uma etapa separada; não usar `npm audit fix --force` sem testes de compatibilidade.
