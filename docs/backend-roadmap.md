# Roteiro do ambiente acadêmico

## MVP vigente

O GitHub Pages oferece a interface da disciplina e direciona cada conta às pastas individuais do Google Drive. O Drive controla autenticação, compartilhamento e armazenamento; o portal não mantém token de escrita no frontend.

O fluxo atual cobre atividades em qualquer formato e organização do projeto LaTeX pelo Drive. Dúvidas e pedidos de nova senha usam um formulário dentro do Pages e uma automação mínima do Google Apps Script, executada pela conta da disciplina. O frontend não armazena credenciais de e-mail.

## Evolução futura

Contagem automática de entregas, revisão privada, aprovação acadêmica, notas e edição LaTeX com pré-visualização instantânea exigem uma aplicação autenticada. O Apps Script atual possui escopo deliberadamente restrito ao envio das duas notificações de atendimento.

Os destinos estão centralizados em `data/drive-submissions.json`, o que permite trocar a camada de armazenamento sem alterar as identidades das contas.
