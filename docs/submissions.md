# Entregas pelo portal

## Estado atual

A Área do Aluno abre uma pasta individual no Google Drive. Cada aluno possui três destinos: `Atividades`, `Projeto LaTeX` e `Dúvidas e solicitações`. O vínculo entre o identificador opaco da conta e as pastas fica em `data/drive-submissions.json`.

O login do GitHub Pages é apenas uma separação visual. O controle real dos arquivos é feito pelas permissões do Drive; cada pasta individual deve ser compartilhada somente com o aluno correspondente e com a equipe docente. A pasta raiz da disciplina não deve ser liberada para toda a turma.

## Experiência do aluno

1. O aluno entra na Área do Aluno e seleciona uma atividade aberta.
2. O portal abre diretamente a pasta `Atividades` vinculada à sua conta.
3. O arquivo pode estar em qualquer formato e deve começar com o código da atividade, por exemplo `E02 - glossario.pdf`.
4. Novas versões podem substituir o arquivo anterior ou receber um sufixo de versão.
5. Fontes LaTeX, bibliografia, figuras e PDF compilado ficam em `Projeto LaTeX`.

O portal não lê nem conta arquivos do Drive. A ausência de uma contagem na página não significa ausência de entrega.

## Dúvidas e solicitações de acesso

O painel prepara o texto da dúvida ou do pedido de nova senha e abre a pasta `Dúvidas e solicitações`. O aluno cria um Google Doc e cola o conteúdo. Nunca devem ser informadas a senha atual, a senha nova, notas ou outros dados sigilosos.

## Conferência docente

O painel docente permite pesquisar pelo nome, escolher o código da atividade e abrir as três pastas de cada aluno. A conferência é manual porque um site estático não possui credencial segura para consultar o conteúdo privado do Drive.

Para gerar um índice local classificado como `instructors`, execute:

```bash
npm run index:submissions
```

O comando cria `submission-index.html` e `submission-index.csv` em `.private/submissions/`. Esses arquivos nunca devem ser publicados ou versionados.

## Reversão

Os destinos ficam centralizados em `data/drive-submissions.json` e `lib/driveCourse.mjs`. Uma troca de armazenamento deve alterar essa camada e preservar os IDs de acesso das contas.
