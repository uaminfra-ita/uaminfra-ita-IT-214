# Atendimento automático pelo Google Apps Script

`audience: public`. Esta automação encaminha dúvidas e pedidos de nova senha para o contato público da disciplina. Ela não recebe senha, e-mail pessoal, nota ou feedback acadêmico.

## Publicação na conta da disciplina

1. Entre em [script.google.com](https://script.google.com/) usando `uam.infra@gmail.com` e crie um projeto chamado `Atendimento IT-214`.
2. Substitua o conteúdo de `Code.gs` pelo arquivo deste diretório.
3. Em **Configurações do projeto**, habilite a exibição do manifesto `appsscript.json` e substitua-o pelo manifesto deste diretório.
4. Escolha **Implantar → Nova implantação → Aplicativo da Web**.
5. Configure **Executar como: Eu** e **Quem pode acessar: Qualquer pessoa**. Autorize apenas o envio de e-mail solicitado pelo manifesto.
6. Copie a URL final terminada em `/exec` e grave-a em `data/support-service.json`, no campo `endpoint`.
7. Altere `status` para `active`, execute as validações do projeto e publique o Pages.

Uma nova implantação deve ser criada sempre que `Code.gs` mudar. Não coloque credenciais, tokens ou senhas no código nem no arquivo de configuração. A URL do aplicativo da Web é pública e não é tratada como segredo.

## Proteções incluídas

- aceita somente os dois tipos de solicitação usados pelo portal;
- remove caracteres de controle e limita o tamanho dos campos;
- nunca aceita senha no pedido de redefinição;
- usa campo-armadilha e limites por aluno e por hora;
- devolve ao portal somente o estado do envio e o protocolo;
- aplica a cota diária da própria conta antes do envio.

O login do Pages continua sendo apenas uma separação visual. Uma solicitação de senha nunca deve autorizar automaticamente a redefinição: a equipe precisa confirmar a identidade e entregar a nova credencial por canal privado.
