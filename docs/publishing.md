# Publicação

## Verificação local

```bash
npm ci
npm run check
npm run lint
npm run test:access
npm run build
npm run audit:out
```

Para simular o GitHub Pages, execute o build com `GITHUB_PAGES=true` e repita `npm run audit:out`. A auditoria exige que todos os PDFs exportados correspondam exatamente ao catálogo público e impede a inclusão de referências privadas. Nenhuma variável de ambiente externa é necessária.

O workflow de LaTeX precisa existir também na branch `student-submissions`, pois os eventos de push e os pull requests de trabalhos usam essa branch. Mantenha `contents: read`, sem segredos e sem permissão de escrita. Recomenda-se proteger `student-submissions` para que alterações em projetos e no workflow passem por pull request.

O workflow usa Node 22 e publica `out/` pelo mecanismo oficial do GitHub Pages. Em **Settings → Pages**, mantenha **Source: GitHub Actions**.

Após o push, confira os jobs `build` e `deploy`, execute manualmente uma compilação LaTeX de teste, teste as rotas públicas e valide login com contas de aluno e docente. Commit, push, alteração de proteção de branch e deploy exigem autorização explícita.
