import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';

const presentation = presentations.find((item) => item.slug === 'e03-regulamentacao-conops');

export const metadata = {
  title: presentation.title,
  description: presentation.subtitle,
};

function Slide({ kicker, title, source, notes, children, className = '' }) {
  return (
    <section className={className}>
      {kicker && <div className="slide-kicker">{kicker}</div>}
      {title && <h2 className="slide-title">{title}</h2>}
      {children}
      {source && <p className="slide-source">{source}</p>}
      {notes && <aside className="notes">{notes}</aside>}
    </section>
  );
}

function CoverNetwork() {
  const nodes = [
    ['regulação', 92, 82], ['operador', 278, 46], ['PSU', 462, 110],
    ['ATM', 640, 52], ['vertiporto', 710, 178], ['aeronave', 492, 212], ['cidade', 210, 205],
  ];
  const links = [[0, 1], [0, 6], [1, 2], [1, 5], [2, 3], [2, 5], [3, 4], [4, 5], [4, 6], [5, 6]];
  return (
    <svg viewBox="0 0 800 260" className="conops-cover-network" role="img" aria-label="Rede conceitual conectando regulação, operadores, serviços, espaço aéreo, aeronave, vertiporto e cidade">
      <defs><linearGradient id="e03-link" x1="0" x2="1"><stop stopColor="#22d3ee" /><stop offset="1" stopColor="#34d399" /></linearGradient></defs>
      {links.map(([from, to]) => <line key={`${from}-${to}`} x1={nodes[from][1]} y1={nodes[from][2]} x2={nodes[to][1]} y2={nodes[to][2]} stroke="url(#e03-link)" strokeWidth="3" opacity=".58" />)}
      {nodes.map(([label, x, y]) => <g key={label}><circle cx={x} cy={y} r="22" fill="#071426" stroke="#67e8f9" strokeWidth="4" /><text x={x} y={y + 45} textAnchor="middle" fill="#cbd5e1" fontSize="15" fontWeight="800">{label}</text></g>)}
    </svg>
  );
}

function Arrow() {
  return <span className="conops-arrow" aria-hidden="true">→</span>;
}

export default function E03PresentationPage() {
  return (
    <PresentationDeck title={presentation.title}>
      <Slide className="slide-cover !text-white" notes="Tempo sugerido: 3 minutos. Apresente a pergunta da aula e esclareça que o foco é compreender como documentos de concepção organizam responsabilidades e evolução operacional, não decorar siglas.">
        <div className="slide-kicker !text-cyan-300">IT-214 · E03 · 18 de agosto de 2026</div>
        <h1 className="mt-8 max-w-5xl !font-black !text-white">CONOPS UAM: <span className="text-cyan-300">do conceito à operação no Brasil</span></h1>
        <p className="mt-7 max-w-3xl !text-xl !leading-8 !text-slate-300">Regulamentação, espaço aéreo e papéis institucionais.</p>
        <CoverNetwork />
      </Slide>

      <Slide kicker="Pergunta central" title="O que transforma um voo possível em uma operação regular?" source="Síntese didática baseada em FAA UAM ConOps 2.0 (2023) e DECEA PCA 351-7 (2024)." notes="Tempo sugerido: 5 minutos. Peça exemplos para cada bloco. Registre verbalmente as dependências entre eles; a resposta será retomada no slide 17.">
        <p className="slide-question mt-7">Uma aeronave certificada, sozinha, não constitui um sistema de mobilidade aérea.</p>
        <div className="conops-question-grid mt-8">
          {[
            ['Quem autoriza?', 'regras, certificação e fiscalização'],
            ['Onde opera?', 'volume, rota, acesso e separação'],
            ['Quem coordena?', 'ATC, operador, PSU e vertiporto'],
            ['Como evolui?', 'dados, automação, capacidade e evidência'],
          ].map(([question, answer], index) => <div className="slide-card" key={question}><span>0{index + 1}</span><strong>{question}</strong><p>{answer}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Instrumento de planejamento" title="CONOPS descreve o sistema antes de prescrever a solução" source="FAA UAM ConOps 2.0, pp. 5 e 18; DECEA PCA 351-7, arts. 1º–5º e 398–400." notes="Tempo sugerido: 5 minutos. Diferencie visão operacional de regulamento e projeto executivo. Mostre que o CONOPS cria linguagem comum e hipóteses verificáveis.">
        <div className="conops-boundary mt-8">
          <div><span>ENTRADAS</span><strong>problema + atores + premissas</strong></div><Arrow /><div className="active"><span>CONOPS</span><strong>operações + relações + evolução</strong></div><Arrow /><div><span>SAÍDAS</span><strong>normas + projetos + testes</strong></div>
        </div>
        <div className="slide-grid mt-8">
          <div className="slide-card"><strong>Ele define</strong><p>ambiente, papéis, serviços, fluxos de informação, cenários e caminho de maturidade.</p></div>
          <div className="slide-card"><strong>Ele não substitui</strong><p>certificação, regra de voo, desenho do vertiporto, análise de segurança ou plano de implementação.</p></div>
        </div>
      </Slide>

      <Slide kicker="Corpus da aula" title="Dois CONOPS no centro; quatro documentos fecham as interfaces" source="FAA (2023, 2024); DECEA (2024); ANAC (2023); EASA (2022)." notes="Tempo sugerido: 4 minutos. Explique a hierarquia: FAA e DECEA sustentam a narrativa; os demais documentos respondem onde a concepção precisa encontrar certificação, implementação e infraestrutura.">
        <div className="conops-doc-map mt-7">
          <div className="conops-doc-core"><span>CONOPS FORMAL</span><strong>FAA UAM ConOps 2.0</strong><small>NAS · corredores · rede federada</small></div>
          <div className="conops-doc-core"><span>CONOPS FORMAL</span><strong>DECEA PCA 351-7</strong><small>SISCEAB · volumes UAM · níveis UML</small></div>
          {[
            ['FAA AAM Plan', 'implementação'], ['ANAC Panorama', 'certificação'], ['EASA PTS', 'projeto'], ['FAA EB 105A', 'infraestrutura'],
          ].map(([name, role]) => <div className="conops-doc-context" key={name}><strong>{name}</strong><small>{role}</small></div>)}
        </div>
      </Slide>

      <Slide kicker="Escopo comparado" title="FAA e DECEA partem do mesmo desafio, mas desenham ambientes distintos" source="FAA UAM ConOps 2.0, seções 1–4; DECEA PCA 351-7, capítulos I–III." notes="Tempo sugerido: 6 minutos. Leia cada linha horizontalmente. Evite tratar os modelos como traduções diretas: o PCA adapta conceitos às competências e estruturas brasileiras.">
        <div className="conops-compare mt-7">
          <div className="conops-compare-head"><span>Dimensão</span><strong>FAA</strong><strong>DECEA</strong></div>
          {[
            ['Sistema', 'National Airspace System', 'SISCEAB'],
            ['Estrutura', 'UAM Corridors e Cooperative Areas', 'volumes de espaço aéreo UAM'],
            ['Serviços', 'PSU em rede federada', 'PSU + sistema central interoperável'],
            ['Evolução', 'initial → midterm → mature', 'UML-1 → UML-6'],
            ['Integração', 'ATS + ambiente cooperativo xTM', 'ATM com UAM/UTM como subsistemas'],
          ].map((row) => <div className="conops-compare-row" key={row[0]}>{row.map((cell, index) => <span className={index === 0 ? 'font-black text-ink' : ''} key={cell}>{cell}</span>)}</div>)}
        </div>
      </Slide>

      <Slide kicker="Princípios" title="Escala só é aceitável se preservar segurança e integração" source="FAA UAM ConOps 2.0, seção 2; DECEA PCA 351-7, arts. 1º, 45, 50–55 e 373–375." notes="Tempo sugerido: 4 minutos. Reforce que capacidade não é aumentada removendo controles, mas combinando performance, informação e novas formas de coordenação.">
        <div className="conops-principles mt-8">
          {[
            ['01', 'Sem redução de segurança', 'novas operações não degradam as operações existentes'],
            ['02', 'Integração antes de segregação', 'compartilhar quando requisitos de performance permitirem'],
            ['03', 'Autoridade permanece pública', 'regulação e supervisão não são delegadas à automação'],
            ['04', 'Evolução sustentada por evidência', 'simulação, validação e dados precedem escala'],
          ].map(([number, title, text]) => <div key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></div>)}
        </div>
      </Slide>

      <Slide kicker="Papéis institucionais" title="Cada autoridade regula uma interface diferente do sistema" source="ANAC, AAM Panorama e Perspectivas (2023), p. 27; DECEA PCA 351-7, arts. 7º–15; FAA e EASA." notes="Tempo sugerido: 7 minutos. Esta matriz prepara o entregável E03. Diferencie autoridade nacional, referência internacional e órgão estrangeiro usado para harmonização.">
        <div className="conops-actor-grid mt-7">
          {[
            ['ANAC', 'aeronave, operador e infraestrutura', 'certifica · normatiza · fiscaliza'],
            ['DECEA', 'espaço aéreo e navegação', 'regula · provê · coordena'],
            ['OACI', 'harmonização internacional', 'padrões · conceitos · grupos de estudo'],
            ['FAA', 'sistema dos Estados Unidos', 'regula NAS · desenvolve ConOps'],
            ['EASA', 'sistema europeu', 'certificação · regras · especificações'],
          ].map(([actor, scope, verbs]) => <div key={actor}><strong>{actor}</strong><p>{scope}</p><span>{verbs}</span></div>)}
        </div>
        <p className="slide-transition">No Brasil, ANAC e DECEA são complementares; FAA e EASA são referências, não autoridades nacionais.</p>
      </Slide>

      <Slide kicker="Ambiente operacional" title="UAM acrescenta uma camada cooperativa; não apaga o ATM" source="FAA UAM ConOps 2.0, seção 1.3; DECEA PCA 351-7, arts. 38–54 e 75–84." notes="Tempo sugerido: 5 minutos. Percorra o diagrama de baixo para cima. Explique que as estruturas atuais permanecem e recebem volumes, serviços e requisitos adicionais.">
        <div className="conops-airspace mt-8">
          <div className="layer cooperative"><strong>Serviços cooperativos UAM / xTM</strong><span>intenção · conformidade · desconflito · fluxo</span></div>
          <div className="layer bridge"><strong>Interfaces digitais</strong><span>PSU ↔ operador ↔ ATS ↔ vertiporto</span></div>
          <div className="layer atm"><strong>ATM e estruturas existentes</strong><span>FIR · CTA · CTR · ATZ · REA · REH · procedimentos IFR/VFR</span></div>
        </div>
        <p className="slide-takeaway mt-7"><strong>Complementaridade</strong><span>UTM e UAM são subsistemas inseridos no gerenciamento de tráfego aéreo.</span></p>
      </Slide>

      <Slide kicker="Arquitetura de serviços" title="O PSU converte informação distribuída em coordenação operacional" source="FAA UAM ConOps 2.0, seções 4.3 e 5; DECEA PCA 351-7, arts. 61–74." notes="Tempo sugerido: 6 minutos. Mostre que o PSU apoia o operador; não é sinônimo de ATC. Compare a rede federada FAA com a exigência brasileira de sincronização com um sistema central.">
        <div className="conops-service-map mt-7">
          <div className="service-node authority">FAA / DECEA<br /><small>autoridade e supervisão</small></div>
          <div className="service-node data">SDSP<br /><small>dados suplementares</small></div>
          <div className="service-node central">PSU<br /><small>serviços UAM</small></div>
          <div className="service-node operator">Operador / PIC<br /><small>intenção e execução</small></div>
          <div className="service-node vertiport">Vertiporto<br /><small>capacidade e condição</small></div>
          <svg viewBox="0 0 900 310" aria-hidden="true"><path d="M450 145 L450 40 M410 160 L170 85 M490 160 L730 85 M410 195 L180 260 M490 195 L720 260" /></svg>
        </div>
      </Slide>

      <Slide kicker="Cenário nominal" title="A operação é uma cadeia de decisões compartilhadas" source="FAA UAM ConOps 2.0, seção 6; DECEA PCA 351-7, arts. 70–74." notes="Tempo sugerido: 5 minutos. Use a linha para separar decisão estratégica, acompanhamento tático e registro pós-operação. Pergunte em qual etapa uma falha de informação tem maior custo.">
        <ol className="conops-journey mt-9">
          {[
            ['1', 'Planejar', 'rota, horário, veículo'], ['2', 'Validar', 'restrições e capacidade'], ['3', 'Compartilhar', 'intenção operacional'],
            ['4', 'Executar', 'saída, rota, chegada'], ['5', 'Monitorar', 'conformidade e conflitos'], ['6', 'Registrar', 'dados e ocorrências'],
          ].map(([number, title, text]) => <li key={number}><span>{number}</span><strong>{title}</strong><small>{text}</small></li>)}
        </ol>
        <p className="slide-question mt-9 !text-2xl">A autorização não é um evento isolado: é coerência mantida durante toda a operação.</p>
      </Slide>

      <Slide kicker="Estrutura do espaço aéreo" title="Corredor exclusivo ou volume compartilhado?" source="FAA UAM ConOps 2.0, seção 4.4; DECEA PCA 351-7, arts. 50–52 e 78–101." notes="Tempo sugerido: 6 minutos. Compare sem escolher um vencedor. O desenho depende de densidade, usuários existentes, performance e capacidade de coordenação.">
        <div className="conops-models mt-7">
          <div><span>FAA</span><strong>UAM Corridor</strong><svg viewBox="0 0 360 150" role="img" aria-label="Corredor definido conectando dois pontos"><path d="M35 105 C115 20 245 20 325 105" /><circle cx="35" cy="105" r="13" /><circle cx="325" cy="105" r="13" /></svg><p>estrutura definida, pontos de entrada e saída, critérios de participação e práticas cooperativas.</p></div>
          <div><span>DECEA</span><strong>Volume UAM</strong><svg viewBox="0 0 360 150" role="img" aria-label="Volume de espaço aéreo compartilhado"><path d="M55 105 L110 35 H285 L325 105 Z" /><path d="M95 85 H290 M130 60 H300" /><circle cx="160" cy="74" r="9" /><circle cx="235" cy="50" r="9" /></svg><p>volume georreferenciado, acesso por capacidade e performance, compartilhamento quando possível.</p></div>
        </div>
      </Slide>

      <Slide kicker="Capacidade" title="Planejamento estratégico não basta quando a densidade cresce" source="FAA UAM ConOps 2.0, seções 4.4.2–4.4.3; DECEA PCA 351-7, arts. 102–123 e 202–217." notes="Tempo sugerido: 5 minutos. Explique a progressão: remover conflitos no plano, acompanhar em voo e balancear demanda quando o recurso não comporta todas as intenções.">
        <div className="conops-capacity mt-9">
          <div><span>ANTES DO VOO</span><strong>desconflito estratégico</strong><p>intenções compatíveis no tempo e no espaço</p></div><Arrow />
          <div><span>EM OPERAÇÃO</span><strong>separação tática</strong><p>alertas, conformidade e resposta a mudanças</p></div><Arrow />
          <div><span>REDE</span><strong>DCB / ATFM</strong><p>demanda ajustada à capacidade de rota e vertiporto</p></div>
        </div>
        <div className="slide-takeaway mt-10"><strong>Gargalo distribuído</strong><span>capacidade pode faltar no espaço aéreo, no vertiporto ou na coordenação entre ambos.</span></div>
      </Slide>

      <Slide kicker="Serviços críticos" title="A camada digital depende de serviços aeronáuticos verificáveis" source="DECEA PCA 351-7, capítulo IV; FAA UAM ConOps 2.0, seções 4.5–5." notes="Tempo sugerido: 5 minutos. Divida a turma em cinco grupos rápidos: cada grupo explica o efeito operacional da indisponibilidade de um serviço.">
        <div className="conops-services mt-8">
          {[
            ['CNS', 'comunicar · navegar · vigiar'], ['AIS', 'publicar condição e restrição'], ['ATFM', 'equilibrar demanda e capacidade'],
            ['MET', 'observar e prever condição'], ['CARTOGRAFIA', 'representar volumes e procedimentos'], ['OBSTÁCULOS', 'proteger trajetórias e superfícies'],
          ].map(([name, purpose]) => <div key={name}><strong>{name}</strong><span>{purpose}</span></div>)}
        </div>
      </Slide>

      <Slide kicker="Maturidade" title="As duas concepções descrevem evolução, não calendário" source="FAA UAM ConOps 2.0, seção 3; DECEA PCA 351-7, capítulo V." notes="Tempo sugerido: 6 minutos. Alinhe os modelos por capacidade, não por equivalência numérica. Reforce que maturidade depende de evidência e habilitadores.">
        <div className="conops-maturity mt-7">
          <div className="maturity-track">
            <div className="maturity-label">FAA</div>
            {['Operação inicial', 'Maior frequência', 'Estado maduro'].map((item, index) => <div className={`maturity-step faa step-${index + 1}`} key={item}><span>{index + 1}</span><strong>{item}</strong></div>)}
          </div>
          <div className="maturity-track">
            <div className="maturity-label">DECEA</div>
            {['UML-1', 'UML-2', 'UML-3', 'UML-4', 'UML-5', 'UML-6'].map((item, index) => <div className={`maturity-step decea step-${index + 1}`} key={item}><span>{index + 1}</span><strong>{item}</strong></div>)}
          </div>
        </div>
        <p className="slide-transition">A pergunta correta não é “em que ano?”, mas “quais capacidades foram demonstradas?”.</p>
      </Slide>

      <Slide kicker="Transição operacional" title="UML-2 a UML-4 muda quem coordena, como comunica e como separa" source="DECEA PCA 351-7, tabelas 2–4 e arts. 407–412." notes="Tempo sugerido: 6 minutos. Percorra as colunas e peça que os alunos identifiquem dependências: datalink, DAA, PSU e regras digitais precisam evoluir em conjunto.">
        <div className="conops-level-table mt-7">
          <div className="level-head"><span>Capacidade</span><strong>UML-2</strong><strong>UML-3</strong><strong>UML-4</strong></div>
          {[
            ['Gestão', 'humanos', 'humanos', 'PSU supervisionado'],
            ['Comunicação', 'voz VHF', 'VHF / CPDLC', 'datalink + emergência VHF'],
            ['Condição', 'VFR / VMC', 'VFR; exceções IFR', 'DFR · IMC / VMC'],
            ['Separação', 'ver e evitar', 'ver e evitar', 'sistemas + PSU'],
            ['Tráfego', 'baixo', 'médio', 'médio e escalável'],
          ].map((row) => <div className="level-row" key={row[0]}>{row.map((cell, index) => <span className={index === 0 ? 'font-black text-ink' : ''} key={cell}>{cell}</span>)}</div>)}
        </div>
      </Slide>

      <Slide kicker="Fronteiras e lacunas" title="O CONOPS organiza a operação; outras decisões fecham o sistema" source="ANAC (2023); EASA PTS-VPT-DSN (2022); FAA EB 105A (2024); FAA e DECEA CONOPS." notes="Tempo sugerido: 6 minutos. Use os três níveis para mostrar por que um documento operacional não responde sozinho onde construir, como certificar ou como integrar o sítio à cidade.">
        <div className="conops-boundaries mt-7">
          <div><span>ESTRATÉGICO</span><strong>Vale habilitar?</strong><p>política · demanda · aceitação · marco regulatório</p></div>
          <div><span>TÁTICO</span><strong>Como implementar?</strong><p>certificação · espaço aéreo · sítio · geometria · energia</p></div>
          <div><span>OPERACIONAL</span><strong>Como operar?</strong><p>intenção · separação · capacidade · contingência · dados</p></div>
        </div>
        <div className="conops-gap-line mt-8"><strong>CONOPS</strong><span>conecta os níveis</span><strong>ANAC</strong><span>certifica e fiscaliza</span><strong>EASA / FAA</strong><span>detalham vertiportos</span></div>
      </Slide>

      <Slide kicker="Síntese e entregável E03" title="Complete a matriz: autoridade, objeto, instrumento e evidência" source="Atividade didática IT-214 E03, baseada nas fontes oficiais da aula." notes="Tempo sugerido: 10 minutos. Organize cinco grupos, um por instituição. Cada grupo preenche uma linha e apresenta em um minuto. Feche retomando a pergunta do slide 2.">
        <div className="conops-exercise mt-7">
          <div className="exercise-head"><span>Instituição</span><span>O que regula?</span><span>Com qual instrumento?</span><span>Que evidência exige?</span></div>
          {['ANAC', 'DECEA', 'OACI', 'FAA', 'EASA'].map((actor) => <div className="exercise-row" key={actor}><strong>{actor}</strong><span>________________</span><span>________________</span><span>________________</span></div>)}
        </div>
        <p className="slide-closing mt-6">Operação regular = aeronave habilitada + espaço aéreo aplicável + serviços coordenados + infraestrutura adequada + evidência.</p>
      </Slide>

      <Slide kicker="Para consulta" title="Referências oficiais utilizadas nesta aula" notes="Tempo sugerido: 1 minuto. Indique que os seis documentos estão na Biblioteca do portal. Encerre apontando a próxima etapa: transformar as relações institucionais em perguntas verificáveis para o projeto.">
        <div className="reference-list mt-6">
          {presentation.references.map((reference) => <div key={reference.url}><strong>{reference.shortTitle}</strong><p>{reference.citation}</p><span>{reference.purpose}</span></div>)}
        </div>
        <p className="slide-closing mt-6">Próximo passo: converter a concepção operacional em requisitos, testes e decisões de implementação.</p>
      </Slide>
    </PresentationDeck>
  );
}
