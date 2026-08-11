# Acesso piloto no GitHub Pages

## Limite da solução

`/area-do-aluno/` valida e-mail e senha inteiramente no navegador. O catálogo público contém hashes de e-mail, salts e hashes PBKDF2 das senhas, além de nomes e papéis. A senha legível não entra no Git, mas uma pessoa tecnicamente habilitada pode inspecionar ou alterar o bundle e simular outro papel.

Esta solução serve somente para separar visualmente conteúdos não sigilosos durante o piloto. Não usar para notas, entregas, feedback individual, documentos privados ou controle de presença.

## Cadastro local

Mantenha `.private/contas-piloto/usuarios.csv` no formato:

```csv
full_name,email,role
Pessoa Aluna,email-institucional,student
Pessoa Docente,email-institucional,instructor
```

Gere as senhas e o catálogo público:

```text
npm run prepare:accounts
npm run generate:access
npm run test:access
```

- `credenciais.csv` permanece em `.private/contas-piloto/` e deve ser distribuído por canal separado.
- `data/access.json` é versionado e contém somente dados adequados ao ambiente público.
- `prepare:accounts` preserva a senha de contas cujo e-mail já exista no arquivo de credenciais e gera uma senha aleatória de alta entropia somente para contas novas. Depois de alterar o lote, sempre reexecute `generate:access`.
- A turma 2026/2 possui 12 contas: oito alunos, três instrutores e um professor responsável.

## Papéis

- `student`: vê seu painel, cronograma e leituras gerais.
- `instructor`: vê o painel docente e a lista pública de participantes do piloto.
- `admin`: identifica o professor responsável e usa a visualização docente neste MVP.
- `disabled`: impede o acesso normal daquela entrada.

A sessão guarda somente o identificador da conta em `sessionStorage` e termina ao fechar a aba ou usar “Encerrar sessão”.
