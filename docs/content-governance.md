# Governança de conteúdo

Antes de publicar um recurso, a equipe deve confirmar:

1. público: internet, turma, aluno, grupo ou docentes;
2. titularidade e permissão de distribuição;
3. autoria, DOI ou fonte oficial;
4. finalidade didática e atividades relacionadas;
5. existência de versão anterior para evitar duplicidade.

Somente `audience: public` admite `assetPath` no GitHub Pages. Material da turma ou individual deve permanecer no Google Drive com compartilhamento restrito; o Pages pode publicar apenas o identificador não sigiloso necessário para montar o link. Alterações de arquivo público exigem atualização do SHA-256 e revisão da licença.

O contato em `data/course-contact.json` possui `audience: public` e autorização explícita da equipe. Nenhum outro e-mail pode ser publicado por analogia; novos endereços exigem classificação e confirmação próprias.

Figuras de slides devem ser originais sempre que possível. Ideias derivadas recebem referência próxima e cada deck termina com bibliografia. Fotografias ou ilustrações externas só entram no portal quando obtidas da fonte primária e declaradas em `data/presentation-assets.json`, com crédito, finalidade de uso, URL de origem, texto alternativo e SHA-256. Os slides nunca carregam imagens remotas em tempo de execução.

Documentos técnicos sem DOI usam `documentNumber` e uma `publisherUrl` oficial. Artigos acadêmicos continuam obrigados a declarar DOI. Licença e condições de redistribuição permanecem nos dados e na validação mesmo quando não são exibidas nos cartões da Biblioteca.
