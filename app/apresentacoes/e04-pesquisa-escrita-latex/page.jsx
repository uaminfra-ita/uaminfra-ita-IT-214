import Image from 'next/image';
import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';
import presentationAssets from '@/data/presentation-assets.json';

const presentation = presentations.find((item) => item.slug === 'e04-pesquisa-escrita-latex');
const assets = new Map(presentationAssets.map((asset) => [asset.id, asset]));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata = {
  title: presentation.title,
  description: presentation.subtitle,
};

function Slide({ kicker, title, source, notes, children, className = '' }) {
  return (
    <section className={`e04-slide ${className}`}>
      {kicker && <div className="slide-kicker">{kicker}</div>}
      {title && <h2 className="slide-title">{title}</h2>}
      {children}
      {source && <p className="slide-source">{source}</p>}
      {notes && <aside className="notes">{notes}</aside>}
    </section>
  );
}

function MediaFigure({ assetId, className = '', frameClassName = '', fit = 'contain', priority = false }) {
  const asset = assets.get(assetId);
  if (!asset) return null;

  return (
    <figure className={`slide-media ${className}`}>
      <div className={`slide-media-frame ${frameClassName}`}>
        <Image
          src={`${basePath}${asset.assetPath}`}
          alt={asset.alt}
          fill
          priority={priority}
          sizes="(max-width: 800px) 96vw, 72vw"
          className={fit === 'cover' ? 'object-cover' : 'object-contain'}
        />
      </div>
      <figcaption>{asset.creditLine}</figcaption>
    </figure>
  );
}

function ActionLink({ href, children, tone = 'light' }) {
  return (
    <a className={`e04-action e04-action-${tone}`} href={href} target="_blank" rel="noreferrer">
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

function WorkflowOrbit() {
  const tools = [
    ['LeapSpace', 158, 74],
    ['Overleaf', 318, 48],
    ['VS Code', 466, 116],
    ['PDF', 388, 246],
    ['Drive', 206, 242],
    ['Pergunta', 82, 162],
  ];
  return (
    <svg className="e04-orbit" viewBox="0 0 560 310" role="img" aria-label="Fluxo circular ligando pergunta, LeapSpace, Overleaf, VS Code, PDF e Drive">
      <defs>
        <linearGradient id="e04-orbit-line" x1="0" x2="1"><stop stopColor="#67e8f9" /><stop offset="1" stopColor="#fb923c" /></linearGradient>
      </defs>
      <path d="M82 162 C92 78 198 28 318 48 S498 90 466 116 S478 232 388 246 S238 288 206 242 S70 250 82 162Z" fill="none" stroke="url(#e04-orbit-line)" strokeWidth="5" strokeDasharray="12 11" />
      {tools.map(([label, x, y], index) => (
        <g key={label}>
          <circle cx={x} cy={y} r={index === 0 ? 31 : 25} fill="#071426" stroke={index === 0 ? '#fb923c' : '#67e8f9'} strokeWidth="4" />
          <text x={x} y={y + 47} textAnchor="middle" fill="#e2e8f0" fontSize="15" fontWeight="850">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function MiniEditor() {
  return (
    <div className="e04-editor" aria-label="Exemplo visual de um editor LaTeX com código e prévia">
      <div className="e04-windowbar"><span /><span /><span /><strong>artigo-it214.tex</strong></div>
      <div className="e04-editor-body">
        <div className="e04-code-pane">
          <span><b>01</b>{'\\documentclass{article}'}</span>
          <span><b>02</b>{'\\title{Infraestrutura UAM}'}</span>
          <span><b>03</b>{'\\begin{document}'}</span>
          <span className="active"><b>04</b>{'\\section{Introdução}'}</span>
          <span><b>05</b>O crescimento da UAM...</span>
          <span><b>06</b>{'\\cite{autor2025}'}</span>
          <span><b>07</b>{'\\end{document}'}</span>
        </div>
        <div className="e04-pdf-pane">
          <span>PDF</span>
          <strong>Infraestrutura UAM</strong>
          <i>Introdução</i>
          <p>O crescimento da mobilidade aérea urbana exige...</p>
          <p>Questões de capacidade, energia e inserção urbana...</p>
        </div>
      </div>
    </div>
  );
}

export default function E04PresentationPage() {
  const templateUrl = `${basePath}/templates/latex/artigo-it214.tex`;
  const studentAreaUrl = `${basePath}/area-do-aluno/`;

  return (
    <PresentationDeck title={presentation.title}>
      <Slide className="slide-cover e04-cover !text-white" notes="Tempo sugerido: 3 minutos. Apresente a aula como um fluxo completo: formular, investigar, escrever, compilar e entregar. Avise que os links dos slides permanecem disponíveis para consulta posterior.">
        <div className="slide-kicker !text-cyan-300">IT-214 · E04 · 25 de agosto de 2026</div>
        <div className="e04-cover-grid">
          <div>
            <h1 className="!font-black !text-white">Da pergunta ao <span>PDF</span></h1>
            <p>Pesquisa e escrita em LaTeX com LeapSpace, Overleaf, VS Code e Drive.</p>
          </div>
          <WorkflowOrbit />
        </div>
      </Slide>

      <Slide kicker="Destino da aula" title="Hoje você sai com uma introdução que compila" notes="Tempo sugerido: 4 minutos. Leia o resultado esperado como uma única promessa. Explique que qualidade aqui significa coerência entre problema, evidência, lacuna e pergunta — não quantidade de páginas.">
        <div className="e04-finish-line">
          <p><span>Um arquivo <code>.tex</code> organizado, com <strong>contexto</strong>, <strong>motivação</strong>, <strong>lacuna UAM</strong>, <strong>aderência ao tema</strong> e uma <strong>pergunta de pesquisa</strong> explícita.</span></p>
          <div><span>CP1</span><strong>Introdução pronta para revisão</strong></div>
        </div>
      </Slide>

      <Slide kicker="Uma sequência, não quatro aplicativos" title="Cada ferramenta entra quando existe uma decisão a tomar" notes="Tempo sugerido: 5 minutos. Percorra o fluxo da esquerda para a direita. Evite abrir ferramentas ainda; primeiro fixe a lógica que será repetida na oficina.">
        <ol className="e04-route">
          {[
            ['01', 'Delimitar', 'tema → pergunta'],
            ['02', 'Investigar', 'LeapSpace'],
            ['03', 'Verificar', 'artigos originais'],
            ['04', 'Escrever', 'Overleaf ou VS Code'],
            ['05', 'Entregar', 'PDF + fonte no Drive'],
          ].map(([number, title, detail]) => <li key={number}><span>{number}</span><strong>{title}</strong><small>{detail}</small></li>)}
        </ol>
        <p className="e04-mantra">Investigar → verificar → escrever → compilar → guardar.</p>
      </Slide>

      <Slide kicker="O papel de cada ferramenta" title="Escolha pelo trabalho que precisa ser feito" notes="Tempo sugerido: 5 minutos. Leia cada faixa como uma decisão operacional. Overleaf e VS Code são caminhos de escrita compatíveis; ninguém precisa dominar os dois hoje.">
        <div className="e04-tool-bands">
          <a href="https://www.sciencedirect.com/leapspace" target="_blank" rel="noreferrer"><strong>LeapSpace</strong><span>descobrir evidências e rastrear fontes</span><b>EXPLORAR ↗</b></a>
          <a href="https://www.overleaf.com/project" target="_blank" rel="noreferrer"><strong>Overleaf</strong><span>começar rápido e compilar no navegador</span><b>ESCREVER ↗</b></a>
          <a href="https://code.visualstudio.com/download" target="_blank" rel="noreferrer"><strong>VS Code</strong><span>trabalhar localmente com mais controle</span><b>ORGANIZAR ↗</b></a>
          <a href={studentAreaUrl} target="_blank" rel="noreferrer"><strong>Drive</strong><span>guardar a entrega oficial da disciplina</span><b>ENTREGAR ↗</b></a>
        </div>
      </Slide>

      <Slide kicker="Antes de pesquisar" title="Uma boa pergunta cabe em uma frase — e deixa claro o que será comparado" source="Síntese didática da equipe IT-214 (2026)." notes="Tempo sugerido: 6 minutos. Construa a pergunta por camadas. Peça aos alunos que substituam as palavras destacadas pelo recorte de seus artigos.">
        <div className="e04-question-formula">
          <div><span>contexto</span><strong>vertiportos urbanos</strong></div>
          <b>+</b>
          <div><span>recorte</span><strong>cidades brasileiras</strong></div>
          <b>+</b>
          <div><span>relação</span><strong>energia × capacidade</strong></div>
        </div>
        <blockquote>Como a infraestrutura de recarga influencia a capacidade operacional de vertiportos em cidades brasileiras?</blockquote>
      </Slide>

      <Slide kicker="LeapSpace · entrar e orientar" title="Comece pelo problema; a plataforma ajuda a decompor a busca" source="Elsevier, página oficial do LeapSpace (2026); suporte de acesso institucional (2026)." notes="Tempo sugerido: 5 minutos. Abra o link. Demonstre o acesso por organização quando necessário. Explique que a ferramenta auxilia a exploração, mas a evidência continua sendo verificada na publicação original.">
        <div className="e04-screen-layout">
          <MediaFigure assetId="elsevier-2026-leapspace-official" frameClassName="e04-screen e04-screen-cover" fit="cover" priority />
          <div className="e04-screen-note"><span>1</span><p>Entre pelo acesso institucional, descreva o problema em linguagem natural e só depois acrescente recortes.</p><ActionLink href="https://www.sciencedirect.com/leapspace" tone="dark">Abrir LeapSpace</ActionLink></div>
        </div>
      </Slide>

      <Slide kicker="LeapSpace · perguntar melhor" title="Dê contexto suficiente para receber uma síntese útil" source="Elsevier, LeapSpace Reference Guide (2026), seções Standard search e Ask in natural language." notes="Tempo sugerido: 6 minutos. Cole o prompt e mostre as quatro partes: domínio, pergunta, recorte e saída. Troque apenas uma restrição por vez para observar o efeito na busca.">
        <div className="e04-prompt">
          <span>PROMPT DE PARTIDA</span>
          <p>Investigue como a <mark>infraestrutura elétrica de vertiportos</mark> afeta a <mark>capacidade operacional</mark>. Priorize estudos desde <mark>2020</mark>, compare métodos e apresente <mark>fontes verificáveis, divergências e lacunas</mark>.</p>
          <div><b>tema</b><b>relação</b><b>recorte</b><b>saída esperada</b></div>
        </div>
      </Slide>

      <Slide kicker="LeapSpace · verificar" title="A resposta orienta; a fonte sustenta o artigo" source="Elsevier, LeapSpace Reference Guide (2026), pp. 11–15." notes="Tempo sugerido: 6 minutos. Use a captura para localizar referências, detalhes e Trust Cards. Reforce a sequência: abrir citação, ler resumo, conferir método e limitações no texto original, registrar DOI.">
        <div className="e04-proof-layout">
          <MediaFigure assetId="elsevier-2026-leapspace-standard-search" frameClassName="e04-proof-image" />
          <ol>
            <li><span>1</span><strong>Abra a citação</strong></li>
            <li><span>2</span><strong>Confira método e limites</strong></li>
            <li><span>3</span><strong>Registre DOI e evidência</strong></li>
          </ol>
        </div>
      </Slide>

      <Slide kicker="Arquitetura da introdução" title="A introdução conduz o leitor do cenário até a pergunta" notes="Tempo sugerido: 7 minutos. Leia as faixas como uma narrativa contínua. Aponte que cada bloco prepara o seguinte; a lacuna não pode surgir sem contexto e evidência anteriores.">
        <div className="e04-intro-stack">
          {[
            ['01', 'Contexto', 'qual transformação está acontecendo?'],
            ['02', 'Problema', 'por que isso importa para a UAM?'],
            ['03', 'Evidência', 'o que a literatura já demonstra?'],
            ['04', 'Lacuna', 'o que ainda não foi respondido?'],
            ['05', 'Pergunta', 'o que este artigo investigará?'],
          ].map(([number, title, question]) => <div key={number}><span>{number}</span><strong>{title}</strong><p>{question}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Como o LaTeX pensa" title="Você escreve estrutura; o compilador constrói a página" source="Overleaf, Learn LaTeX in 30 minutes; modelo LaTeX IT-214 (2026)." notes="Tempo sugerido: 5 minutos. Mostre a relação entre comandos e aparência. Explique que o arquivo .tex é texto simples e o PDF é um produto gerado, por isso não se corrige o PDF diretamente.">
        <div className="e04-latex-split">
          <MiniEditor />
          <MediaFigure assetId="it214-2026-latex-template-preview" frameClassName="e04-paper-preview" />
        </div>
        <p className="e04-equation"><code>.tex</code><span>+</span><code>compilador</code><span>=</span><strong>PDF</strong></p>
      </Slide>

      <Slide kicker="Modelo da disciplina" title="Não comece com uma página vazia" source="Equipe docente IT-214, Modelo LaTeX do artigo IT-214 (2026)." notes="Tempo sugerido: 4 minutos. Baixe o arquivo e mostre as seções existentes. Oriente os alunos a preservar a estrutura e preencher primeiro a introdução; resumo e resultados ainda são rascunhos futuros.">
        <div className="e04-template-layout">
          <MediaFigure assetId="it214-2026-latex-template-preview" frameClassName="e04-template-paper" />
          <div>
            <p>O modelo já traz preâmbulo, idioma, margens, resumo, seções e referências. Hoje, o foco está em <strong>Introdução</strong>.</p>
            <ActionLink href={templateUrl} tone="dark">Baixar artigo-it214.tex</ActionLink>
          </div>
        </div>
      </Slide>

      <Slide kicker="Caminho A · Overleaf" title="Crie o projeto, envie o modelo e recompile" source="Overleaf User Documentation, Your first project (2026)." notes="Tempo sugerido: 6 minutos. Demonstre New Project, Upload Project ou Blank Project. Para esta aula, o caminho mais direto é criar um projeto e enviar o arquivo artigo-it214.tex.">
        <div className="e04-overleaf-layout">
          <MediaFigure assetId="overleaf-2026-first-project-docs" frameClassName="e04-overleaf-screen" fit="cover" />
          <ol>
            <li><span>01</span><strong>Novo projeto</strong></li>
            <li><span>02</span><strong>Envie o .tex</strong></li>
            <li><span>03</span><strong>Recompile</strong></li>
          </ol>
        </div>
        <div className="e04-inline-links"><ActionLink href="https://www.overleaf.com/project" tone="dark">Abrir Overleaf</ActionLink><ActionLink href="https://docs.overleaf.com/getting-started/your-first-project">Ver guia oficial</ActionLink></div>
      </Slide>

      <Slide kicker="Overleaf · quando algo quebra" title="Leia o primeiro erro antes de alterar o texto" source="Overleaf User Documentation; síntese didática IT-214 (2026)." notes="Tempo sugerido: 5 minutos. Provoque um erro removendo uma chave e mostre o log. Corrija apenas o primeiro erro, recompile e observe quantos avisos desaparecem.">
        <div className="e04-debug">
          <div className="bad"><span>ERRO</span><code>{'\\section{Introdução'}</code><p>chave de fechamento ausente</p></div>
          <div className="e04-debug-arrow" aria-hidden="true">→</div>
          <div className="good"><span>CORREÇÃO</span><code>{'\\section{Introdução}'}</code><p>salvar → recompilar → conferir PDF</p></div>
        </div>
        <p className="e04-debug-rule">Primeiro erro → linha indicada → menor correção possível → nova compilação.</p>
      </Slide>

      <Slide kicker="Caminho B · VS Code" title="Para compilar localmente, instale o editor, o TeX e a extensão" source="Visual Studio Marketplace, LaTeX Workshop (2026); TeX Users Group, TeX Live." notes="Tempo sugerido: 5 minutos. Explique as três camadas: VS Code é o editor, TeX Live fornece o compilador e LaTeX Workshop conecta edição, build e visualização.">
        <div className="e04-vscode-layout">
          <MediaFigure assetId="vscode-2026-latex-workshop-marketplace" frameClassName="e04-vscode-screen" fit="cover" />
          <div className="e04-install-stack"><span><b>1</b> VS Code</span><span><b>2</b> TeX Live</span><span><b>3</b> LaTeX Workshop</span></div>
        </div>
        <div className="e04-inline-links"><ActionLink href="https://code.visualstudio.com/download" tone="dark">Baixar VS Code</ActionLink><ActionLink href="https://tug.org/texlive/">Instalar TeX Live</ActionLink><ActionLink href="https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop">Extensão</ActionLink></div>
      </Slide>

      <Slide kicker="VS Code · rotina local" title="Edite, compile e visualize sem sair do projeto" source="LaTeX Workshop, documentação e Visual Studio Marketplace (2026)." notes="Tempo sugerido: 4 minutos. Mostre o botão TeX na barra lateral e a visualização do PDF. Atalho padrão de build pode variar; use o comando Build LaTeX project pela paleta quando necessário.">
        <div className="e04-local-workflow">
          <MiniEditor />
          <div className="e04-command-palette"><span>Ctrl + Shift + P</span><strong>LaTeX Workshop: Build LaTeX project</strong><small>depois: View LaTeX PDF</small></div>
        </div>
      </Slide>

      <Slide kicker="Organização" title="O Drive recebe o trabalho completo, não apenas o PDF" notes="Tempo sugerido: 4 minutos. Mostre a estrutura mínima. Oriente o aluno a entrar pela Área do Aluno para cair na própria pasta, sem navegar pelo GitHub.">
        <div className="e04-folder-layout">
          <div className="e04-tree" aria-label="Estrutura recomendada de arquivos do artigo">
            <strong>📁 artigo-it214-nome</strong>
            <span>├── 📄 artigo-it214.tex</span>
            <span>├── 📄 referencias.bib</span>
            <span>├── 📁 figuras</span>
            <span>└── 📄 artigo-it214.pdf</span>
          </div>
          <div className="e04-delivery"><span>ÁREA DO ALUNO</span><p>Abra sua pasta individual, escolha a atividade E04 e envie a fonte, referências, figuras e PDF.</p><ActionLink href={studentAreaUrl} tone="dark">Abrir minha pasta</ActionLink></div>
        </div>
      </Slide>

      <Slide kicker="Oficina · 35 minutos" title="Agora o fluxo acontece no seu próprio tema" notes="Tempo sugerido: 20 a 35 minutos, conforme o ritmo da turma. Circule entre os grupos. Faça uma parada rápida ao final de cada etapa para que todos avancem juntos.">
        <div className="e04-workshop">
          <div><span>10 min</span><strong>Investigar</strong><p>uma pergunta + três fontes candidatas</p></div>
          <div><span>10 min</span><strong>Verificar</strong><p>método, limite e DOI de cada fonte</p></div>
          <div><span>15 min</span><strong>Escrever</strong><p>introdução em cinco blocos + PDF compilado</p></div>
        </div>
        <p className="e04-workshop-output">Saída mínima: uma pergunta explícita e um parágrafo que justifique por que ela importa.</p>
      </Slide>

      <Slide kicker="CP1 · antes de encerrar" title="Seu artigo precisa contar uma história verificável" notes="Tempo sugerido: 5 minutos. Use esta tela como checklist final. Reforce que os botões permanecem disponíveis depois da aula. O aluno deve sair sabendo onde pesquisar, escrever, consultar o guia e entregar.">
        <div className="e04-checklist">
          {['Tema delimitado', 'Problema motivado', 'Evidências verificadas', 'Lacuna declarada', 'Pergunta explícita', 'PDF compilado'].map((item) => <span key={item}>✓ {item}</span>)}
        </div>
        <div className="e04-final-links">
          <ActionLink href="https://www.sciencedirect.com/leapspace" tone="dark">Pesquisar</ActionLink>
          <ActionLink href={templateUrl}>Baixar modelo</ActionLink>
          <ActionLink href="https://www.overleaf.com/project">Escrever</ActionLink>
          <ActionLink href={studentAreaUrl}>Entregar</ActionLink>
        </div>
        <p className="e04-final-line">LeapSpace ajuda a investigar. Overleaf ajuda a começar. VS Code dá controle. Drive guarda a entrega.</p>
      </Slide>
    </PresentationDeck>
  );
}
