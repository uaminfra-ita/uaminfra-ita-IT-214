# Publicação

## Verificação local

```bash
npm ci
npm run check
npm run lint
npm run test:access
npm run build
npm run export:pdf
npm run audit:out
```

Para simular o GitHub Pages, execute o build e `npm run export:pdf` com `GITHUB_PAGES=true` e repita `npm run audit:out`. A auditoria exige que PDFs, ZIPs e DOCXs exportados correspondam exatamente ao catálogo público e impede a inclusão de referências privadas. Nenhuma variável de ambiente externa é necessária.

`npm run export:pdf` abre cada apresentação de `out/` no Chrome (modo `?print-pdf`) e grava `out/apresentacoes/<slug>/<slug>.pdf`, o arquivo do botão **Baixar PDF**. O comando precisa do Google Chrome ou do Chromium (caminho opcional em `CHROME_PATH`), falha se alguma imagem não carregar ou se o número de páginas diferir do número de slides, e aceita slugs como argumento para exportar só algumas aulas. Os PDFs não entram no Git: são gerados a cada deploy. Em `npm run dev` o botão não encontra o arquivo, porque ele só existe depois do build.

O workflow LaTeX da branch `student-submissions` é legado e não participa do fluxo vigente pelo Drive. Não adicionar tokens do Drive ao frontend nem aos artefatos do Pages.

O workflow usa Node 22 e publica `out/` pelo mecanismo oficial do GitHub Pages. Em **Settings → Pages**, mantenha **Source: GitHub Actions**.

Após o push, confira os jobs `build` e `deploy`, teste as rotas públicas, valide login com contas de aluno e docente e confirme que cada conta abre somente a pasta correta no Drive. Commit, push, alteração de permissões e deploy exigem autorização explícita.
