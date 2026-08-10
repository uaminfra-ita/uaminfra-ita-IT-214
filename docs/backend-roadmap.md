# Roteiro do ambiente acadêmico privado

## Plataforma proposta

Supabase reunirá Auth, Postgres e Storage privado. O frontend público poderá usar apenas a chave publicável, protegida por RLS; `service_role` ficará exclusivamente em funções de servidor e segredos do ambiente.

## Modelo

Entidades previstas: perfis, matrículas, papéis, atividades, recursos, atribuições, submissões, versões, revisões, aprovações, eventos de acesso e auditoria.

Papéis:

- aluno: somente dados, arquivos e feedback próprios;
- docente: turma, fila de revisão e aprovação;
- administrador: configuração e auditoria.

Fluxo de submissão: `submitted → under_review → approved | revision_requested → resubmitted`. Versões são imutáveis, entregas atrasadas são aceitas e marcadas em `America/Sao_Paulo`, e aprovação é um registro separado do arquivo.

Tipos iniciais: PDF, DOCX, PPTX e Markdown. MIME, assinatura, tamanho e extensão deverão concordar antes do armazenamento.
