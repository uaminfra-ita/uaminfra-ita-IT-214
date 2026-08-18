# Entregas pelo portal

## Estado atual

A Área do Aluno orienta o aluno a anexar atividades diretamente no GitHub. A E02 está aberta e a E03 aparece como programada. O botão abre a branch pública `student-submissions` deste mesmo repositório, na pasta indicada para a conta e para a atividade.

Cada entrega fica em `entregas/<studentId>/<atividade>/`. O identificador vem da sessão visual do navegador e não constitui autorização segura. O GitHub registra o autor real do commit e aplica as permissões da branch. Instrutores e professor consultam os arquivos e o histórico público da turma pelo painel.

O painel docente resolve a dificuldade de leitura dos IDs sem renomear as pastas públicas. A central permite pesquisar pelo nome, filtrar alunos por andamento, escolher uma atividade para conferência e abrir links nominais que apontam para o ID técnico correto.

## Experiência desejada

1. O aluno escolhe uma atividade aberta.
2. Confere prazo, quantidade, tamanho e formatos indicados no portal.
3. Abre o upload do GitHub na pasta correspondente.
4. Anexa os arquivos e confirma “Commit changes” ou propõe uma alteração por pull request.
5. Cada novo commit funciona como uma versão da entrega.

## Regras do fluxo

- o aluno precisa estar autenticado no GitHub para concluir o commit;
- a pasta usada é `entregas/<studentId>/<activityCode>/`;
- os formatos e limites mostrados no portal são uma orientação; o professor deve conferir o commit e os arquivos recebidos;
- a branch pública deve conter somente trabalhos que possam ser vistos por qualquer pessoa;
- cada commit preserva as versões anteriores e permite comparar alterações.
- nomes reais não entram nos caminhos de entrega ou projeto; o vínculo nominal é apresentado somente pela interface docente e pelo índice local;
- o painel consulta a árvore pública da branch sem token e pode ficar temporariamente indisponível por limite ou falha da API do GitHub;
- o caminho montado no navegador pode ser alterado pelo usuário; a autoria e a revisão do commit continuam sendo os controles efetivos.

As entregas são públicas. O portal não deve ser usado para notas, feedback reservado, documentos pessoais ou outros conteúdos sigilosos.

## Índice privado para docentes

Quando a equipe precisar consultar o GitHub fora do painel, gere um mapa local de nomes, IDs e links:

```bash
npm run index:submissions
```

O comando cria `submission-index.html` e `submission-index.csv` dentro de `.private/submissions/`. O público desses arquivos é `instructors`; eles não devem ser anexados ao portal, ao GitHub Pages ou a commits. O índice não contém e-mail, senha, nota ou avaliação, e pode ser recriado a partir do catálogo vigente.

## Reversão

Se o formato de envio precisar mudar, os links centralizados em `lib/githubCourse.mjs` podem voltar a apontar para a raiz da branch. Não há segredo ou armazenamento externo para desligar.
