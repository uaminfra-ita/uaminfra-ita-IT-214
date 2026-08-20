# Publicação

## Verificação local

```bash
npm ci
npm run check
npm run lint
npm run test:access
npm run test:support
npm run build
npm run audit:out
```

Para simular o GitHub Pages, execute o build com `GITHUB_PAGES=true` e repita `npm run audit:out`. A auditoria exige que todos os PDFs exportados correspondam exatamente ao catálogo público e impede a inclusão de referências privadas. Nenhuma variável de ambiente externa é necessária.

O atendimento automático exige uma implantação separada e manual na conta da disciplina. Siga `integrations/google-apps-script/README.md`, grave a URL `/exec` em `data/support-service.json` e altere o estado para `active`. Enquanto isso não ocorrer, o Pages mantém os botões desativados e exibe o contato público como alternativa. A URL da implantação é pública; tokens e credenciais nunca devem ser adicionados ao repositório.

O workflow LaTeX da branch `student-submissions` é legado e não participa do fluxo vigente pelo Drive. Não adicionar tokens do Drive ao frontend nem aos artefatos do Pages.

O workflow usa Node 22 e publica `out/` pelo mecanismo oficial do GitHub Pages. Em **Settings → Pages**, mantenha **Source: GitHub Actions**.

Após o push, confira os jobs `build` e `deploy`, teste as rotas públicas, valide login com contas de aluno e docente, confirme que cada conta abre somente a pasta correta no Drive e envie uma dúvida de teste. Commit, push, alteração de permissões e deploy exigem autorização explícita.
