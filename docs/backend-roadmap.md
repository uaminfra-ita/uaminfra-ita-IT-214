# Roteiro do ambiente acadêmico

## MVP vigente

O GitHub Pages oferece a interface da disciplina e direciona cada conta às pastas individuais do Google Drive. O Drive controla autenticação, compartilhamento e armazenamento; o portal não mantém token de escrita no frontend.

O fluxo atual cobre atividades em qualquer formato, organização do projeto LaTeX, dúvidas e pedidos de nova senha. A conferência docente é manual porque o Pages não possui credencial para ler pastas privadas.

## Evolução futura

Contagem automática de entregas, notificações, revisão privada, aprovação acadêmica, notas e edição LaTeX com pré-visualização instantânea exigem uma aplicação autenticada ou uma automação do Google Workspace executada fora do frontend público.

Os destinos estão centralizados em `data/drive-submissions.json`, o que permite trocar a camada de armazenamento sem alterar as identidades das contas.
