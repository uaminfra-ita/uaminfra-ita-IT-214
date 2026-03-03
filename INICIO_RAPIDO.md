# 🚀 Guia Rápido de Início

## Primeiros Passos

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

### 3. Abrir no Navegador
Acesse [http://localhost:3000](http://localhost:3000)

## 📝 Editar Conteúdo Rapidamente

**Abra este arquivo**: `data/courseData.js`

Todos os conteúdos estão aqui:
- ✏️ Mensagens de boas-vindas
- 👥 Informações dos instrutores
- 📚 Plano de ensino
- 👨‍💼 Equipes
- 📖 Materiais de aula
- 📋 Documentos

## 📁 Adicionar Arquivos

Coloque os arquivos em:
```
public/
├── files/          ← Plano de ensino, etc
├── materials/      ← Aulas, notas
├── docs/          ← Documentos, normas
└── images/        ← Fotos dos instrutores
```

Depois, adicione o link em `data/courseData.js`

## 🌐 Deploy Automático (GitHub Pages)

1. **Push para GitHub**
   ```bash
   git add .
   git commit -m "Adicionado novo conteúdo"
   git push origin main
   ```

2. **GitHub Actions fará o build e deploy automaticamente**

3. **Acesse em**: `https://seu-usuario.github.io/uaminfra-ita-IT-214`

## 📋 Estrutura de Navegação

```
🏠 Inicial
  ├─ Título e código
  ├─ Instrutores
  └─ Mensagem de boas-vindas

📚 Plano de Ensino
  ├─ Descrição
  └─ Arquivos para download

👥 Equipes
  ├─ Instrutores
  ├─ Equipes de trabalho
  └─ Links GitHub

📖 Materiais de Aula
  ├─ Aulas
  └─ Atividades

📋 Documentos
  ├─ Normativos
  ├─ Regulações
  ├─ ConOps
  └─ Artigos
```

## 🎨 Cores

- **Inicial**: Azul 🔵
- **Plano de Ensino**: Laranja 🟠
- **Equipes**: Verde 🟢
- **Materiais**: Roxo 🟣
- **Documentos**: Índigo 🟣

## 💡 Dicas

1. **Recomposição automática**: Qualquer alteração em `data/courseData.js` recarrega a página
2. **Responsivo**: O site funciona perfeitamente em celular, tablet e desktop
3. **Performance**: Otimizado para GitHub Pages
4. **Sem banco de dados**: Tudo é estático e rápido!

## 📖 Documentação Completa

Leia [CONTEUDO.md](CONTEUDO.md) para instruções detalhadas

## ⚙️ Build para Produção

```bash
npm run build
```

Gera arquivos otimizados em `out/`

---

**Pronto para começar? Edite `data/courseData.js` e veja as mudanças em tempo real!** ✨
