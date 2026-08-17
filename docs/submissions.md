# Entregas pelo portal

## Estado atual

A Área do Aluno orienta o aluno a anexar atividades diretamente no GitHub. A E02 está aberta e a E03 aparece como programada. O botão abre a branch pública `student-submissions` deste mesmo repositório, na pasta indicada para a conta e para a atividade.

Cada entrega fica em `entregas/<studentId>/<atividade>/`. O identificador vem da sessão visual do navegador e não constitui autorização segura. O GitHub registra o autor real do commit e aplica as permissões da branch. Instrutores e professor consultam os arquivos e o histórico público da turma pelo painel.

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
- o painel consulta a árvore pública da branch sem token e pode ficar temporariamente indisponível por limite ou falha da API do GitHub;
- o caminho montado no navegador pode ser alterado pelo usuário; a autoria e a revisão do commit continuam sendo os controles efetivos.

As entregas são públicas. O portal não deve ser usado para notas, feedback reservado, documentos pessoais ou outros conteúdos sigilosos.

## Reversão

Se o formato de envio precisar mudar, os links centralizados em `lib/githubCourse.mjs` podem voltar a apontar para a raiz da branch. Não há segredo ou armazenamento externo para desligar.
