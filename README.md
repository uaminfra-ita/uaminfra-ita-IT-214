# IT-214 — Mobilidade Aérea Urbana

Portal acadêmico público da disciplina IT-214 do Instituto Tecnológico de Aeronáutica. O projeto usa Next.js 14, React 18, Tailwind CSS e Reveal.js, com exportação estática para GitHub Pages.

## Rotas

- `/`: apresentação, objetivos, módulos e equipe docente.
- `/biblioteca`: artigos públicos, referências e plano da disciplina.
- `/atividades`: cronograma dos 16 encontros, entregáveis e checkpoints.
- `/apresentacoes/e02-nivelamento-uam`: apresentação da aula de 11/08/2026.
- `/area-do-aluno`: aviso da migração para uma arquitetura privada.

## Conteúdo

Curso, atividades, recursos e apresentações são declarados em `data/`. Arquivos públicos ficam em `public/resources/` e só passam na validação quando possuem público explícito, licença, relação acadêmica e checksum correto.

O repositório não recebe mais trabalhos de alunos nem implementa senhas no frontend. Consulte [as regras operacionais](AGENTS.md) e [a documentação técnica](docs/architecture.md).

## Desenvolvimento

Requer Node.js 20 ou superior.

```bash
npm ci
npm run check
npm run lint
npm run build
npm run dev
```

O build usa `out/`. No GitHub Actions, `GITHUB_PAGES=true` aplica o base path `/uaminfra-ita-IT-214` e o workflow publica o diretório pelo mecanismo oficial do Pages.

## Apresentações

Reveal.js oferece navegação por teclado/toque, visão geral, progresso, notas do apresentador e impressão. Na apresentação E02:

- setas ou espaço avançam os slides;
- `Esc` abre a visão geral;
- `S` abre as notas;
- o botão “Imprimir” prepara a versão para PDF.

## Segurança e privacidade

GitHub e GitHub Pages são públicos. Somente recursos classificados como públicos podem ser versionados. A futura área acadêmica usará autenticação real, armazenamento privado e políticas de autorização fora do Git.
