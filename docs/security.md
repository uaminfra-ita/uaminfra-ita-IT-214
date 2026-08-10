# Segurança

## Estado atual

A antiga validação de login no navegador foi retirada porque hashes e arquivos públicos não criavam controle de acesso. `/area-do-aluno/` permanece apenas como comunicação da migração.

## Invariantes

- Nenhuma credencial ou chave administrativa no código, Git ou bundle.
- Nenhum nome de aluno, submissão, diagnóstico ou feedback individual no portal público.
- Arquivos públicos precisam estar declarados em `resources.json`, com público e checksum.
- Arquivos privados futuros usarão bucket privado e URLs temporárias.
- Políticas RLS serão testadas tanto para permissão quanto para negação.

Incidentes ou inclusões acidentais devem interromper a publicação, revogar credenciais afetadas e remover o conteúdo da versão corrente. Reescrita de histórico exige avaliação específica.

## Dependências

O `npm audit` de agosto de 2026 sinaliza advisories no Next.js 14 e no PostCSS interno. Neste projeto, o risco de runtime é reduzido porque o resultado publicado é HTML estático: não há servidor Next, Server Actions, middleware, rewrites nem otimizador de imagens em produção, e o CSS processado vem apenas do repositório. A migração para Next.js 16/React 19 deve ser tratada separadamente, com testes de compatibilidade, em vez de usar `npm audit fix --force`.
