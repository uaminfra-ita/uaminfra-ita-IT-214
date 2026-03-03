# 📁 Documentos e Normas

Coloque os documentos nesta pasta, organizados por tipo:

## Estrutura recomendada

```
docs/
├── normativos/
│   ├── norma1.pdf
│   └── norma2.pdf
├── regulacoes/
│   ├── regulacao1.pdf
│   └── regulacao2.pdf
├── conops/
│   ├── conops1.pdf
│   └── conops2.pdf
└── artigos/
    ├── artigo1.pdf
    └── artigo2.pdf
```

Ou simplesmente colocar todos nesta raiz:
- `norma-xxx.pdf`
- `regulacao-yyy.pdf`
- `conops-zzz.pdf`
- `artigo-aaa.pdf`

Depois, adicione os links em `data/courseData.js`:

```javascript
normative: [
  { title: "Norma XXX", url: "/docs/norma-xxx.pdf" },
],
```
