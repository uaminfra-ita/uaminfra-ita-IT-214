# Entregas pelo portal

## Estado atual

A Área do Aluno orienta o aluno a anexar atividades diretamente no GitHub. A E02 está aberta e a E03 aparece como programada. O botão já abre a branch pública `student-submissions` deste mesmo repositório, na pasta correta do aluno e da atividade.

Cada entrega fica em `entregas/<studentId>/<atividade>/<protocolo>/`. O identificador vem da sessão, nunca de um campo controlado pelo navegador. Na página, o aluno consulta apenas o próprio caminho; instrutores e professor veem o resumo da turma.

## Experiência desejada

1. O aluno escolhe uma atividade aberta.
2. Arrasta ou seleciona os arquivos permitidos.
3. Confere nomes e tamanhos, adiciona uma observação opcional e envia.
4. O aluno anexa os arquivos e confirma “Commit changes” no GitHub.
5. Cada novo commit funciona como uma versão da entrega.

## Regras do fluxo

- o aluno precisa estar autenticado no GitHub para concluir o commit;
- a pasta usada é `entregas/<studentId>/<activityCode>/`;
- os formatos e limites mostrados no portal são uma orientação; o professor deve conferir o commit e os arquivos recebidos;
- a branch pública deve conter somente trabalhos que possam ser vistos por qualquer pessoa;
- cada commit preserva as versões anteriores e permite comparar alterações.

As entregas são públicas. O portal não deve ser usado para notas, feedback reservado, documentos pessoais ou outros conteúdos sigilosos.

## Reversão

Se o formato de envio precisar mudar, basta alterar o link em `SubmissionWorkspace.jsx`; não há serviço externo ou segredo para desligar.
