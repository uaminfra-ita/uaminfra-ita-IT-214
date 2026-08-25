# IT-214 — Mobilidade Aérea Urbana

Portal acadêmico da disciplina IT-214 do Instituto Tecnológico de Aeronáutica. [https://uaminfra-ita.github.io/uaminfra-ita-IT-214](https://uaminfra-ita.github.io/uaminfra-ita-IT-214/)
## Rotas

- `/`: apresentação, objetivos, módulos e equipe docente.
- `/biblioteca`: artigos públicos, referências, modelos e plano da disciplina.
- `/atividades`: cronograma dos 16 encontros, entregáveis e checkpoints.
- `/apresentacoes/e02-nivelamento-uam`: apresentação da aula de 11/08/2026.
- `/apresentacoes/e03-regulamentacao-conops`: apresentação da aula de 18/08/2026.
- `/area-do-aluno`: login, painéis de aluno/docente e acesso às pastas individuais do Google Drive.

## Conteúdo

Curso, atividades, recursos, apresentações, ativos visuais e acesso piloto são declarados em `data/`. Arquivos públicos ficam em `public/resources/` e `public/templates/` e só passam na validação quando possuem público explícito, licença, relação acadêmica e checksum correto. A Biblioteca inclui artigos gerais, documentos técnicos da ANAC, DECEA, FAA, EASA, NREL e CITYAM, o plano de ensino oficial de 2026/2 e três modelos para o artigo.

A Área do aluno usa o GitHub Pages como interface e o Google Drive para atividades, projetos LaTeX, dúvidas e solicitações de acesso. O botão de envio abre a pasta individual correta; senhas legíveis e e-mails de login permanecem em `.private/`, fora do Git, e o catálogo versionado recebe apenas hashes e nomes do piloto.

Os arquivos não são copiados para o GitHub. O acesso real depende das permissões do Drive, enquanto o login do Pages somente seleciona a pasta correspondente ao identificador opaco da conta. Consulte [a documentação de entregas](docs/submissions.md).

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm ci
npm run check
npm run lint
npm run build
npm run dev
```

O build usa `out/`. No GitHub Actions, `GITHUB_PAGES=true` aplica o base path `/uaminfra-ita-IT-214` e o workflow publica o diretório pelo mecanismo oficial do Pages.

## Contas do piloto

O fluxo local usa dois arquivos ignorados pelo Git e um catálogo público derivado:

```bash
npm run prepare:accounts
npm run generate:access
npm run test:access
```

O primeiro comando preserva as senhas existentes e gera senhas fortes para contas novas em `.private/contas-piloto/credenciais.csv`; o segundo grava somente hashes em `data/access.json`. O lote atual contém oito alunos, três instrutores e um professor responsável. Consulte [a documentação de autenticação](docs/authentication.md) antes de alterar as contas.

## Apresentações

Reveal.js oferece navegação por teclado/toque, visão geral, progresso, notas do apresentador e impressão. Na apresentação E02:

- setas ou espaço avançam os slides;
- `Esc` abre a visão geral;
- `S` abre as notas;
- o botão “Imprimir” prepara a versão para PDF.

As imagens do deck são locais e possuem procedência em `data/presentation-assets.json`. O catálogo registra fonte primária, crédito, base de uso, texto alternativo, slides relacionados e checksum; arquivos não declarados quebram a validação.

## Segurança e privacidade

O código e o bundle do GitHub Pages são públicos. Os arquivos acadêmicos ficam no Drive e só devem ser compartilhados com as contas autorizadas. Nunca envie senhas, notas ou feedback reservado pelo portal.
