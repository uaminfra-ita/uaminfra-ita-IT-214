# Publicação

## Verificação local

```bash
npm ci
npm run check
npm run lint
npm run build
```

Para simular o GitHub Pages, execute o build com `GITHUB_PAGES=true`. Confirme a geração de todas as rotas, PDFs e assets com referências ao base path `/uaminfra-ita-IT-214`.

## GitHub Pages

O workflow `.github/workflows/deploy.yml` usa Node 20, valida os dados, cria `out/`, envia o artefato oficial e publica no ambiente `github-pages`. O repositório deve usar **Settings → Pages → Source: GitHub Actions**.

Após o push, confira a conclusão dos jobs `build` e `deploy`, abra cada rota diretamente e valide downloads e apresentação em tela cheia.
