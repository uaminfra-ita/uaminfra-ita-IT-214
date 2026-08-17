# Acesso piloto no GitHub Pages

## Limite da solução

`/area-do-aluno/` valida e-mail e senha no navegador. O catálogo público contém hashes de e-mail, salts e hashes PBKDF2 das senhas, além de nomes e papéis. A senha legível não entra no Git.

Essa separação organiza a navegação e monta a pasta do aluno no link de envio; ela não é uma autenticação do GitHub. O aluno precisa ter uma sessão do GitHub para anexar e confirmar o commit. Não usar para notas, feedback reservado, documentos privados ou controle de presença.

O identificador salvo em `sessionStorage` pode ser alterado por quem controla o navegador. Ele serve para personalizar links, nunca para autorizar acesso a conteúdo sigiloso ou comprovar a identidade acadêmica.

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

A sessão visual fica em `sessionStorage` e termina ao fechar a aba ou ao usar “Encerrar sessão”.

## Redefinição de senha

O Pages não recebe nem grava uma senha nova. O aluno abre uma issue pública de solicitação sem informar senha, e-mail ou dado pessoal. Um instrutor confere o pedido e executa localmente:

```bash
npm run reset:password -- --user-id <identificador-opaco>
```

O comando gera uma nova senha aleatória, atualiza o CSV privado, recria `data/access.json` e executa o teste positivo e negativo das credenciais. A senha exibida no terminal deve ser entregue ao aluno por canal privado. O `data/access.json` alterado só entra em vigor depois de revisão, commit e publicação autorizados.
