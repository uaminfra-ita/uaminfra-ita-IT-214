# Modelo de artigo IT-214

Este projeto oferece uma estrutura inicial para o artigo da disciplina. As
orientações entre colchetes e os textos de exemplo devem ser substituídos pelo
conteúdo do autor.

## Estrutura

- `main.tex`: configura o documento e reúne os capítulos;
- `capitulos/`: contém uma seção do artigo por arquivo;
- `referencias/referencias.bib`: concentra as referências bibliográficas;
- `figuras/`: recebe imagens citadas no texto.

## Overleaf

1. Crie um projeto com **New Project → Upload Project**.
2. Envie o arquivo ZIP completo.
3. Confirme que `main.tex` é o documento principal.
4. Clique em **Recompile**.

## Compilação local

Com uma distribuição TeX instalada, execute na raiz do projeto:

```text
latexmk -pdf main.tex
```

Também é possível compilar com `pdflatex`, `bibtex` e mais duas execuções de
`pdflatex`. Não envie arquivos auxiliares (`.aux`, `.log`, `.bbl`); entregue o
projeto-fonte e o PDF final.

## Referências e figuras

Use uma chave estável para cada item do arquivo `.bib`, como
`sobrenomeAnoPalavra`. No texto, use `\citep{chave}` para uma citação entre
parênteses ou `\citet{chave}` para citar o autor na frase.

Antes de inserir uma figura, mencione-a no texto. Depois da figura, explique o
que ela demonstra e por que isso importa para a pergunta de pesquisa. Registre
a autoria e a licença de qualquer material que não tenha sido produzido por
você.
