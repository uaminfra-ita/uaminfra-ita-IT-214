# Publicação

## Verificação local

```bash
npm ci
npm run check
npm run lint
npm run test:access
npm run build
```

Para simular o GitHub Pages, execute o build com `GITHUB_PAGES=true`. Nenhuma variável de ambiente externa é necessária.

O workflow usa Node 22 e publica `out/` pelo mecanismo oficial do GitHub Pages. Em **Settings → Pages**, mantenha **Source: GitHub Actions**.

Após o push, confira os jobs `build` e `deploy`, teste as rotas públicas e valide login com as duas contas piloto. Commit, push e deploy exigem autorização explícita.
