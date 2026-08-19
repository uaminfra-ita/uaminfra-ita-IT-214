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

O workflow LaTeX da branch `student-submissions` é legado e não participa do fluxo vigente pelo Drive. Não adicionar tokens do Drive ao frontend nem aos artefatos do Pages.

O workflow usa Node 22 e publica `out/` pelo mecanismo oficial do GitHub Pages. Em **Settings → Pages**, mantenha **Source: GitHub Actions**.

Após o push, confira os jobs `build` e `deploy`, teste as rotas públicas, valide login com contas de aluno e docente e confirme que cada conta abre somente a pasta correta no Drive. Commit, push, alteração de permissões e deploy exigem autorização explícita.
