# IT-214 — Mobilidade Aérea Urbana

Portal acadêmico da disciplina IT-214 do Instituto Tecnológico de Aeronáutica. O projeto usa Next.js 14, React 18 e Tailwind CSS, com exportação estática para GitHub Pages.

## Estrutura

- `/`: informações gerais, objetivos e equipe docente.
- `/biblioteca`: artigos, documentos técnicos/regulatórios e plano da disciplina.
- `/atividades`: cronograma dos 16 encontros e quatro checkpoints do artigo.
- `/area-do-aluno`: painel individual, entregas, leituras e modo de apresentação.
- `data/`: fontes únicas para curso, cronograma, recursos, alunos e hashes de acesso.
- `students/<login>/`: arquivos e personalização de cada aluno.

## Desenvolvimento local

Requer Node.js 20 ou superior.

```bash
npm ci
npm run check
npm run lint
npm run dev
```

O build estático é produzido por:

```bash
npm run build
```

Em GitHub Actions, o projeto aplica automaticamente o base path `/uaminfra-ita-IT-214` e publica a pasta `out/` pelo mecanismo oficial do GitHub Pages.

## Entregas dos alunos

Os nomes dos arquivos determinam sua classificação no painel:

- `E01_` até `E16_`: entregas dos encontros semanais.
- `CP1_` até `CP4_`: checkpoints do artigo.
- Demais nomes: seção “Outros arquivos”.

O botão “Enviar pelo navegador” abre diretamente a pasta do aluno na interface de upload do GitHub. O site reflete novos arquivos após o próximo build da branch `main`.

### Personalização

Cada aluno pode criar `students/<login>/profile.json`. O modelo está em `students/_profile.example.json` e aceita:

- `headline`: título da área e do modo de apresentação;
- `bio`: apresentação acadêmica curta;
- `accent`: `cyan`, `blue`, `emerald`, `amber` ou `violet`;
- `featuredFiles`: até oito nomes de arquivos existentes na pasta;
- `links`: até cinco endereços HTTPS com `label` e `url`.

Perfis ausentes ou inválidos usam valores padrão e não interrompem o build.

## Credenciais

Os hashes e salts usados pelo frontend ficam em `data/access.json`. As senhas legíveis são geradas localmente em `.private/credenciais-alunos.csv`; toda a pasta `.private/` é ignorada pelo Git.

Para a primeira geração:

```bash
npm run credentials
```

Para revogar todas as senhas e gerar novas:

```bash
npm run credentials -- --force
```

Faça backup seguro do CSV antes de trocar de computador. Nunca remova `.private/` do `.gitignore`.

## Limite de privacidade

A autenticação é somente uma separação visual. O GitHub Pages e este repositório são públicos; arquivos, hashes, dados empacotados e pastas podem ser encontrados diretamente no GitHub. Isolamento real exige repositórios privados individuais ou um backend autenticado.

## Publicação

O workflow `.github/workflows/deploy.yml` valida dados, executa lint e build e envia `out/` ao GitHub Pages. No repositório remoto, configure **Settings → Pages → Source** como **GitHub Actions** antes do primeiro deploy.
