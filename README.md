# IT-214 — Mobilidade Aérea Urbana

Portal acadêmico da disciplina IT-214 do Instituto Tecnológico de Aeronáutica. [https://uaminfra-ita.github.io/uaminfra-ita-IT-214](https://uaminfra-ita.github.io/uaminfra-ita-IT-214/)
## Rotas

- `/`: apresentação, objetivos, módulos e equipe docente.
- `/biblioteca`: artigos públicos, referências e plano da disciplina.
- `/atividades`: cronograma dos 16 encontros, entregáveis e checkpoints.
- `/apresentacoes/e02-nivelamento-uam`: apresentação da aula de 11/08/2026.
- `/area-do-aluno`: login, painéis de aluno/docente e envio de atividades pelo GitHub.

## Conteúdo

Curso, atividades, recursos, apresentações, ativos visuais e acesso piloto são declarados em `data/`. Arquivos públicos ficam em `public/resources/` e só passam na validação quando possuem público explícito, licença, relação acadêmica e checksum correto. A Biblioteca inclui artigos gerais, relatórios técnicos da FAA, NREL e CITYAM e o plano de ensino oficial de 2026/2.

A Área do aluno usa somente o GitHub Pages para o login visual e o GitHub para receber as entregas. O botão de envio abre a pasta correta na branch pública `student-submissions`; o aluno anexa o arquivo e confirma “Commit changes”. Senhas legíveis e e-mails de login permanecem em `.private/`, fora do Git; o catálogo versionado recebe apenas hashes e nomes do piloto.

As entregas são públicas por decisão da disciplina e ficam na branch `student-submissions`, separadas pelo identificador opaco de cada aluno. O portal consulta a sessão autenticada e mostra a cada aluno apenas as atividades associadas à própria conta. Consulte [a documentação de entregas](docs/submissions.md).

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

GitHub, GitHub Pages e a branch de entregas são públicos. Não envie notas, feedback individual, documentos confidenciais ou qualquer dado sigiloso pelo portal.
