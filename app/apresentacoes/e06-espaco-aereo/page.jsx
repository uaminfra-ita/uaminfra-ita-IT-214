import PresentationDeck from '@/components/PresentationDeck';
import presentations from '@/data/presentations.json';

const presentation = presentations.find((item) => item.slug === 'e06-espaco-aereo');

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

function AirspaceStack() {
  return (
    <svg className="airspace-stack" viewBox="0 0 900 330" role="img" aria-label="Camadas conceituais ATM, UAM e UTM, com interfaces de coordenação">
      <defs><linearGradient id="e06-atm" x1="0" x2="1"><stop stopColor="#071426" /><stop offset="1" stopColor="#0e7490" /></linearGradient><linearGradient id="e06-uam" x1="0" x2="1"><stop stopColor="#0891b2" /><stop offset="1" stopColor="#22d3ee" /></linearGradient></defs>
      <rect x="45" y="32" width="810" height="76" rx="18" fill="url(#e06-atm)" />
      <rect x="130" y="126" width="640" height="76" rx="18" fill="url(#e06-uam)" />
      <rect x="230" y="220" width="440" height="76" rx="18" fill="#bae6fd" stroke="#0891b2" strokeWidth="3" />
      <text x="450" y="69" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="900">ATM · tráfego convencional</text>
      <text x="450" y="96" textAnchor="middle" fill="#cbd5e1" fontSize="15">IFR · ATC · rotas e áreas controladas</text>
      <text x="450" y="163" textAnchor="middle" fill="#071426" fontSize="24" fontWeight="900">UAM · operações urbanas</text>
      <text x="450" y="190" textAnchor="middle" fill="#164e63" fontSize="15">eVTOL · vertiportos · rotas ou volumes cooperativos</text>
      <text x="450" y="257" textAnchor="middle" fill="#071426" fontSize="24" fontWeight="900">UTM · baixa altitude</text>
      <text x="450" y="284" textAnchor="middle" fill="#164e63" fontSize="15">UAS · serviços digitais · até cerca de 400 ft AGL</text>
      <path d="M780 164h75" stroke="#22d3ee" strokeWidth="4" strokeDasharray="8 7" /><text x="818" y="150" textAnchor="middle" fill="#0e7490" fontSize="14" fontWeight="800">interface</text>
    </svg>
  );
}

function RmsPReference() {
  return (
    <svg className="rms-p-reference" viewBox="0 0 900 390" role="img" aria-label="Esquema da referência operacional na Região Metropolitana de São Paulo">
      <path d="M106 310 C170 210 182 115 330 80 S590 62 790 150 S760 325 565 340 S230 385 106 310Z" fill="#dbeafe" stroke="#94a3b8" strokeWidth="3" />
      <path d="M125 268 C235 235 267 142 420 122 S650 166 776 239" fill="none" stroke="#0e7490" strokeWidth="11" strokeLinecap="round" />
      <path d="M150 318 C245 280 325 208 434 185 S646 128 748 95" fill="none" stroke="#0891b2" strokeWidth="8" strokeDasharray="18 12" strokeLinecap="round" />
      <path d="M315 90 C410 151 470 215 555 323" fill="none" stroke="#22d3ee" strokeWidth="7" strokeDasharray="4 13" strokeLinecap="round" />
      <circle cx="435" cy="187" r="83" fill="#0f172a" opacity=".72" stroke="#22d3ee" strokeWidth="3" /><circle cx="435" cy="187" r="23" fill="#67e8f9" />
      {[[177,274,'SWAB'],[297,151,'SDMT'],[622,225,'SDEL'],[435,187,'SBSP'],[716,145,'SBGR'],[228,332,'SBMT']].map(([x,y,label]) => <g key={label}><circle cx={x} cy={y} r="8" fill="#071426" stroke="#fff" strokeWidth="3" /><text x={x + 12} y={y + 5} fill="#071426" fontSize="15" fontWeight="800">{label}</text></g>)}
      <text x="70" y="38" fill="#071426" fontSize="19" fontWeight="900">RMSP · referência para a migração</text>
      <g transform="translate(635 354)"><line x1="0" y1="0" x2="42" y2="0" stroke="#0e7490" strokeWidth="8" /><text x="51" y="5" fill="#475569" fontSize="13">REH</text><line x1="100" y1="0" x2="142" y2="0" stroke="#0891b2" strokeWidth="6" strokeDasharray="12 7" /><text x="151" y="5" fill="#475569" fontSize="13">REA</text></g>
    </svg>
  );
}

function CorridorChoice() {
  return (
    <div className="corridor-choice">
      <div className="choice-panel shared"><span>TRANSIÇÃO</span><strong>REH compartilhada</strong><p>eVTOL e helicópteros usam a estrutura existente, com requisitos de participação e coordenação.</p><div className="route-lines"><i /><i /><b /></div></div>
      <div className="choice-vs">ou</div>
      <div className="choice-panel dedicated"><span>MAIOR DENSIDADE</span><strong>Corredor UAM dedicado</strong><p>volume tridimensional com desempenho, separação e acesso definidos para a operação.</p><div className="route-lines"><i /><i /><b /></div></div>
    </div>
  );
}

function NetworkDiagram() {
  const nodes = [[110, 150, 'A'], [285, 74, 'B'], [285, 232, 'C'], [510, 74, 'D'], [510, 232, 'E'], [748, 150, 'F']];
  const links = [[0,1],[0,2],[1,3],[1,4],[2,4],[3,5],[4,5]];
  return (
    <svg className="network-diagram" viewBox="0 0 860 300" role="img" aria-label="Rede de vertiportos conectada por rotas e pontos de fusão">
      {links.map(([a,b]) => <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#0891b2" strokeWidth="8" strokeLinecap="round" />)}
      {nodes.map(([x,y,label], index) => <g key={label}><circle cx={x} cy={y} r="31" fill={index === 0 || index === 5 ? '#071426' : '#fff'} stroke="#22d3ee" strokeWidth="5" /><text x={x} y={y + 8} textAnchor="middle" fill={index === 0 || index === 5 ? '#fff' : '#071426'} fontSize="23" fontWeight="900">{label}</text><text x={x} y={y + 58} textAnchor="middle" fill="#475569" fontSize="14" fontWeight="800">{index === 0 || index === 5 ? 'vertiporto' : 'waypoint'}</text></g>)}
      <text x="430" y="24" textAnchor="middle" fill="#071426" fontSize="18" fontWeight="900">rota é uma sequência; corredor é um volume</text>
    </svg>
  );
}

function TrafficLadder() {
  return (
    <div className="traffic-ladder">
      {[['01', 'Planejar', 'intenção de voo, janela e recursos'], ['02', 'Balancear', 'demanda contra capacidade disponível'], ['03', 'Desconflitar', 'trajetórias 4D e horários de partida'], ['04', 'Executar', 'conformidade, vigilância e ajustes táticos']].map(([number, title, copy]) => <div key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></div>)}
    </div>
  );
}

function ScenarioTable() {
  const rows = [
    ['C1', 'REH compartilhada', 'sem gestão', 'nominal'],
    ['C2', 'corredores dedicados', 'sem gestão', 'nominal'],
    ['C3', 'corredores dedicados', 'balanceamento', 'nominal'],
    ['C4', 'corredores dedicados', 'desconflito', 'nominal'],
    ['C5', 'corredores dedicados', 'balanceamento', 'off-nominal'],
    ['C6', 'corredores dedicados', 'desconflito', 'off-nominal'],
    ['C7–C10', 'REH compartilhada', 'serviços avançados', 'transição / sensibilidade'],
  ];
  return <div className="scenario-table"><div className="scenario-head"><span>cenário</span><span>espaço aéreo</span><span>gestão</span><span>condição</span></div>{rows.map((row) => <div className="scenario-row" key={row[0]}>{row.map((cell, index) => <span className={index === 0 ? 'font-black text-ink' : ''} key={cell}>{cell}</span>)}</div>)}</div>;
}

export default function E06PresentationPage() {
  return (
    <PresentationDeck title={presentation.title}>
      <Slide className="slide-cover !text-white" notes="Tempo sugerido: 4 minutos. Apresente o problema da aula: o espaço aéreo urbano já tem usuários, regras e infraestrutura. A pergunta é como migrar uma operação conhecida para uma rede UAM com evidência e controle.">
        <div className="slide-kicker !text-cyan-300">IT-214 · E06 · 08 de setembro de 2026</div>
        <h1 className="mt-8 max-w-5xl !font-black !text-white">Espaço aéreo: <span className="text-cyan-300">da REH à UAM</span></h1>
        <p className="mt-7 max-w-3xl !text-xl !leading-8 !text-slate-300">Rotas, corredores, camadas, coordenação e os primeiros cenários de integração na RMSP.</p>
        <div className="e06-cover-line mt-12"><span>helicóptero</span><i>→</i><span>eVTOL</span><i>→</i><span>rede cooperativa</span></div>
      </Slide>

      <Slide kicker="Pergunta da aula" title="Como colocar uma nova operação em um espaço aéreo que já funciona?" source="Síntese didática a partir do SIGMA-Sky, Produto 1, seção 3, e Produto 2, capítulos 2 e 5." notes="Tempo sugerido: 6 minutos. Peça que a turma liste usuários, estruturas e restrições que já existem antes de falar em corredores novos.">
        <p className="slide-question mt-8">A migração começa com o inventário do sistema existente.</p>
        <div className="e06-four-cards mt-8">{[['01', 'Usuários', 'helicópteros, asa fixa, UAS e eVTOL'], ['02', 'Estruturas', 'REH, REA, CTR/ATZ, vertiportos e waypoints'], ['03', 'Serviços', 'ATM, UTM, PSU, autorização e informação'], ['04', 'Desempenho', 'separação, navegação, comunicação e contingência']].map(([n,t,c]) => <div className="slide-card" key={n}><span>{n}</span><strong>{t}</strong><p>{c}</p></div>)}</div>
      </Slide>

      <Slide kicker="O que o SIGMA-Sky acrescenta" title="Dois produtos conectam revisão da literatura a cenários simuláveis" source="SIGMA-Sky, Produto 1 (Revisão da Literatura) e Produto 2 (Definição de Cenários Operacionais para Simulação), documentos fornecidos para esta aula." notes="Tempo sugerido: 8 minutos. Mostre a passagem de conceitos para hipóteses. O Produto 1 compara propostas; o Produto 2 transforma escolhas em cenários para o BlueSky.">
        <div className="e06-product-bridge mt-8"><div><span>PRODUTO 1</span><strong>Estado da arte</strong><p>sete eixos: espaço aéreo, tráfego, governança, regras, tecnologia, casos de uso e desempenho.</p></div><div className="bridge-arrow">→</div><div className="active"><span>PRODUTO 2</span><strong>Experimento</strong><p>RMSP, REH, CTR, vertiportos, rede de rotas, demanda OD e cenários de integração.</p></div></div>
        <p className="slide-takeaway mt-8"><strong>Regra de ouro</strong><span>cada decisão de desenho precisa virar hipótese, parâmetro e métrica.</span></p>
      </Slide>

      <Slide kicker="Vocabulário operacional" title="ATM, UAM e UTM são ambientes relacionados, com responsabilidades diferentes" source="DECEA PCA 351-7 (2024); FAA UAM ConOps 2.0 (2023); SIGMA-Sky Produto 1, seção 3.2." notes="Tempo sugerido: 8 minutos. UAM não substitui ATM nem é sinônimo de UTM. Destaque a interface: informação e coordenação precisam atravessar os ambientes.">
        <AirspaceStack />
        <div className="e06-tag-row"><span>ATM · tráfego convencional</span><span>UAM · mobilidade urbana</span><span>UTM · baixa altitude</span></div>
      </Slide>

      <Slide kicker="Referência operacional" title="A RMSP não é uma folha em branco" source="SIGMA-Sky Produto 2, capítulo 2: helipontos, REH, CTR/ATZ e dados BIMTRA/Helicontrol." notes="Tempo sugerido: 7 minutos. Explique que o mapa é conceitual e não substitui publicação aeronáutica. O valor didático está em mostrar a coexistência de estruturas e fluxos.">
        <RmsPReference />
        <div className="e06-legend-cards"><div><strong>REH / REA</strong><span>rotas visuais existentes</span></div><div><strong>CTR / ATZ</strong><span>interfaces controladas</span></div><div><strong>Helipontos</strong><span>nós de origem e destino</span></div></div>
      </Slide>

      <Slide kicker="Camadas" title="A altitude é uma interface de desempenho, não uma solução isolada" source="SIGMA-Sky Produto 1, seção 3.2; DECEA PCA 351-7 (2024). Altitudes ilustrativas, não prescritivas." notes="Tempo sugerido: 9 minutos. Compare a lógica de camadas do DECEA com a referência de até 400 ft AGL para UTM e com a circulação IFR. Evite transformar valores de estudos em regra operacional.">
        <div className="e06-layer-diagram mt-7"><div className="top"><b>ATM / IFR</b><span>circulação tradicional e áreas controladas</span></div><div className="middle"><b>UAM</b><span>rotas, volumes cooperativos e acesso por desempenho</span></div><div className="bottom"><b>UTM / UAS</b><span>operações de baixa altitude e serviços digitais</span></div></div>
        <p className="slide-transition">A pergunta de projeto é: que requisito permite cruzar uma interface com segurança?</p>
      </Slide>

      <Slide kicker="Rota x corredor" title="Uma rota orienta a navegação; um corredor organiza um volume" source="FAA UAM ConOps 2.0 (2023); SIGMA-Sky Produto 1, seção 3.1." notes="Tempo sugerido: 8 minutos. Use a distinção para interpretar todos os desenhos seguintes. Rota pode ser compartilhada; corredor acrescenta limites, acesso e requisitos de desempenho.">
        <div className="route-corridor-compare mt-8"><div><span>ROTA</span><strong>linha ou sequência de waypoints</strong><svg viewBox="0 0 360 140" aria-hidden="true"><path d="M25 105 C110 20 180 120 335 35" fill="none" stroke="#0891b2" strokeWidth="8" strokeDasharray="16 10" /></svg><p>publica referência de navegação e pode conviver com outros usuários.</p></div><div><span>CORREDOR</span><strong>volume tridimensional</strong><svg viewBox="0 0 360 140" aria-hidden="true"><path d="M25 93 L75 44 L320 44 L270 93Z" fill="#cffafe" stroke="#0891b2" strokeWidth="4" /><path d="M75 44 L75 102 L270 102 L270 93" fill="none" stroke="#0891b2" strokeWidth="4" /><path d="M270 44 L320 10 L320 44" fill="none" stroke="#0891b2" strokeWidth="4" /></svg><p>associa limites, acesso, separação e práticas cooperativas.</p></div></div>
      </Slide>

      <Slide kicker="Escolha de integração" title="Compartilhar ou segregar? A resposta depende da fase e da capacidade" source="SIGMA-Sky Produto 1, seção 3.4; Produto 2, seção 5.1; FAA UAM ConOps 2.0; DECEA PCA 351-7." notes="Tempo sugerido: 8 minutos. Apresente segregação como ferramenta de transição ou de mitigação, e integração como objetivo de escala. O Produto 2 testa as duas configurações.">
        <CorridorChoice />
        <p className="slide-question mt-7 !text-xl">Não há corredor que elimine governança, coordenação e conformidade.</p>
      </Slide>

      <Slide kicker="Cenário-base" title="O primeiro experimento começa com aquilo que a RMSP já conhece" source="SIGMA-Sky Produto 2, capítulos 2 e 3: dados BIMTRA/Helicontrol e simulador BlueSky." notes="Tempo sugerido: 9 minutos. Explique o valor de um cenário de referência: sem ele, não sabemos se uma alternativa melhorou ou piorou a operação.">
        <div className="e06-baseline mt-8"><div className="baseline-step"><span>1</span><strong>Observar</strong><p>tráfego real de helicópteros e infraestrutura publicada</p></div><div className="baseline-step"><span>2</span><strong>Representar</strong><p>waypoints, REH, REA, CTR/ATZ e aeroportos</p></div><div className="baseline-step"><span>3</span><strong>Comparar</strong><p>impacto de eVTOL em segurança, capacidade e eficiência</p></div></div>
        <div className="slide-card e06-callout mt-8"><strong>BlueSky</strong><p>é o ambiente de simulação desta etapa; o resultado depende da qualidade das hipóteses e dos parâmetros.</p></div>
      </Slide>

      <Slide kicker="Migração" title="A rede UAM cresce sobre uma rede de nós e conexões" source="SIGMA-Sky Produto 2, seção 4: rede de vertiportos, rede de rotas e matriz OD." notes="Tempo sugerido: 9 minutos. Mostre que a rede é mais do que o desenho do corredor: vertiportos, demanda, conexões aeroportuárias e capacidade formam um único problema.">
        <NetworkDiagram />
        <div className="e06-network-points"><span>vertiportos = nós físicos</span><span>waypoints = pontos de navegação</span><span>rotas = pares OD conectados</span><span>capacidade = recurso compartilhado</span></div>
      </Slide>

      <Slide kicker="Demanda" title="Uma rota só faz sentido quando existe uma relação origem–destino" source="SIGMA-Sky Produto 2, seção 4.3. A matriz OD é uma hipótese de simulação, não uma previsão de mercado." notes="Tempo sugerido: 8 minutos. Explique os estágios de 6 e 12 vertiportos e a combinação entre city taxi e airport shuttle. A localização da demanda muda o desenho da rede.">
        <div className="od-visual mt-8"><div className="od-node left"><b>origens</b><span>residência · emprego · polo</span></div><div className="od-flow"><i /><strong>demanda OD</strong><i /></div><div className="od-node right"><b>destinos</b><span>centro · aeroporto · conexão</span></div></div>
        <div className="e06-metrics mt-8"><div><span>estágio inicial</span><strong>6</strong><small>vertiportos candidatos</small></div><div><span>estágio intermediário</span><strong>12</strong><small>maior capilaridade e densidade</small></div><div><span>pergunta</span><strong>OD</strong><small>quem viaja, entre quais nós e quando?</small></div></div>
      </Slide>

      <Slide kicker="Geometria" title="O corredor precisa respeitar interfaces que já têm prioridade operacional" source="SIGMA-Sky Produto 2, seção 5.1: REH, REA, CTR/ATZ e superfícies de chegada e saída." notes="Tempo sugerido: 10 minutos. Apresente a geometria como compatibilização: altitude, largura, deslocamento lateral, cruzamentos e superfícies de proteção precisam ser verificados em conjunto.">
        <div className="geometry-check mt-8"><div><span>01</span><strong>Sobrepor</strong><p>REH, REA, CTR/ATZ e trajetórias aeroportuárias.</p></div><div><span>02</span><strong>Encontrar</strong><p>cruzamentos, convergências e pontos de conflito.</p></div><div><span>03</span><strong>Deslocar</strong><p>altitude, eixo ou trecho para obter separação.</p></div><div><span>04</span><strong>Testar</strong><p>desempenho, capacidade e contingência.</p></div></div>
        <p className="slide-question mt-8 !text-xl">Um corredor desenhado no mapa ainda não é um corredor operável.</p>
      </Slide>

      <Slide kicker="Serviços de tráfego" title="Coordenação aumenta em camadas, conforme aumentam demanda e incerteza" source="SIGMA-Sky Produto 1, seção 4; Produto 2, seção 5.2; FAA UAM ConOps 2.0 e NASA Provider Services for UAM." notes="Tempo sugerido: 8 minutos. Diferencie planejamento estratégico, balanceamento, desconflito e execução. A camada digital só ajuda se houver participação, dados e conformidade.">
        <TrafficLadder />
      </Slide>

      <Slide kicker="Balanceamento" title="Quando a demanda excede a capacidade, a primeira decisão acontece no solo" source="SIGMA-Sky Produto 2, seção 5.2.2.1: capacidade por recurso e janela de tempo." notes="Tempo sugerido: 8 minutos. Dê um exemplo: um waypoint ou vertiporto saturado. Reter a aeronave antes da decolagem pode preservar capacidade e previsibilidade na rede.">
        <div className="capacity-visual mt-8"><div><span>demanda planejada</span><strong>12 voos</strong><small>na janela de 10 minutos</small></div><b>›</b><div className="capacity-limit"><span>capacidade segura</span><strong>8 voos</strong><small>recurso compartilhado</small></div><b>›</b><div><span>ação</span><strong>4 esperas</strong><small>sequenciamento no solo</small></div></div>
        <p className="slide-transition">Balancear não é cancelar a demanda: é compatibilizar demanda, capacidade e tempo.</p>
      </Slide>

      <Slide kicker="Desconflito" title="O plano de voo vira uma trajetória 4D que pode ser comparada" source="SIGMA-Sky Produto 1, seção 4.1; Produto 2, seção 5.2.2.1." notes="Tempo sugerido: 8 minutos. Explique a diferença entre reduzir fluxo agregado e resolver conflitos entre trajetórias. O Produto 2 testa os mecanismos separadamente para identificar seus efeitos.">
        <div className="deconflict-visual mt-8"><svg viewBox="0 0 820 250" role="img" aria-label="Trajetórias nominais convergentes e trajetória replanejada"><path d="M50 205 C280 188 380 38 760 43" fill="none" stroke="#94a3b8" strokeWidth="7" strokeDasharray="13 10" /><path d="M50 43 C300 54 382 208 760 205" fill="none" stroke="#94a3b8" strokeWidth="7" strokeDasharray="13 10" /><path d="M50 205 C250 190 330 160 425 126 C520 92 620 80 760 43" fill="none" stroke="#0891b2" strokeWidth="9" /><circle cx="425" cy="126" r="16" fill="#fff" stroke="#ef4444" strokeWidth="6" /><text x="425" y="167" textAnchor="middle" fill="#b91c1c" fontSize="15" fontWeight="900">conflito previsto</text><text x="405" y="25" fill="#475569" fontSize="15">planos nominais</text><text x="520" y="230" fill="#0e7490" fontSize="15" fontWeight="900">trajetória replanejada</text></svg></div>
      </Slide>

      <Slide kicker="Separação" title="O mínimo de separação é uma hipótese ligada ao desempenho" source="SIGMA-Sky Produto 2, seção 5.2.2.2. Valores para análise de sensibilidade: 1 NM, 0,6 NM e 0,3 NM entre eVTOL; 1 NM em relação ao convencional." notes="Tempo sugerido: 7 minutos. Não apresente esses valores como regra brasileira. Eles servem para comparar maturidade, previsibilidade, CNS e automação na simulação.">
        <div className="separation-scale mt-9"><div><strong>1,0 NM</strong><span>eVTOL ↔ convencional</span><small>referência de coexistência</small></div><div><strong>0,6 NM</strong><span>eVTOL ↔ eVTOL</span><small>maturidade intermediária</small></div><div className="advanced"><strong>0,3 NM</strong><span>eVTOL ↔ eVTOL</span><small>maior desempenho e previsibilidade</small></div></div>
        <p className="slide-question mt-8 !text-xl">Menor separação exige mais evidência, não apenas mais confiança.</p>
      </Slide>

      <Slide kicker="Off-nominal" title="A rede precisa continuar segura quando o plano falha" source="SIGMA-Sky Produto 2, seção 5.3; FAA UAM ConOps 2.0 (2023)." notes="Tempo sugerido: 8 minutos. Mostre que contingência faz parte do conceito operacional. Bloqueio espacial e incerteza de execução testam resiliência de rotas e serviços.">
        <div className="offnominal-grid mt-8"><div className="offnominal-card"><span>EVENTO A</span><strong>Área bloqueada</strong><p>meteorologia, emergência ou restrição temporária.</p><div className="mini-route"><i /><b /><i /></div><small>resposta: replanejar ou esperar</small></div><div className="offnominal-card"><span>EVENTO B</span><strong>Incerteza operacional</strong><p>partida, tempo de voo, vento ou trajetória.</p><div className="uncertainty-bars"><i /><i /><i /><i /><i /></div><small>resposta: atualizar previsão e sequência</small></div></div>
      </Slide>

      <Slide kicker="Matriz de experimentos" title="O Produto 2 transforma escolhas em cenários comparáveis" source="SIGMA-Sky Produto 2, tabelas 5.1 e 5.2. C7–C10 são cenários complementares de transição e sensibilidade." notes="Tempo sugerido: 10 minutos. Leia a matriz por dimensões: espaço aéreo, gestão de tráfego e condição operacional. O objetivo é comparar causas, não produzir um ranking sem contexto.">
        <ScenarioTable />
      </Slide>

      <Slide kicker="Leitura crítica dos CONOPS" title="Os documentos convergem em princípios, mas divergem na forma de chegar lá" source="SIGMA-Sky Produto 1, seções 3 e 4; FAA, DECEA, Eurocontrol, Boeing, NASA, Japão e Coreia." notes="Tempo sugerido: 8 minutos. Organize a discussão em três contrastes: integração versus segregação; rotas fixas versus volumes dinâmicos; ATC centralizado versus serviços cooperativos.">
        <div className="conops-contrast mt-8"><div><span>CONVERGÊNCIA</span><strong>desempenho e informação compartilhada</strong><p>Todos precisam de identificação, comunicação, navegação, vigilância e regras claras.</p></div><div><span>ESCOLHA</span><strong>estrutura de transição</strong><p>REH, rotas, corredores e volumes podem combinar-se conforme densidade e maturidade.</p></div><div><span>CRITÉRIO</span><strong>evidência operacional</strong><p>O desenho só avança quando segurança, capacidade e resiliência são demonstradas.</p></div></div>
      </Slide>

      <Slide kicker="Oficina E06" title="Desenhe uma hipótese de corredor para a RMSP" source="Entregável da E06: esboço conceitual de corredores e diagrama simples de rede." notes="Tempo sugerido: 5 minutos para briefing. Reserve 20 minutos para o trabalho em grupo e 7 minutos para compartilhamento. Forme grupos de 3–4 pessoas.">
        <div className="workshop-brief mt-8"><div><span>ENTRADA</span><strong>um par origem–destino</strong><p>Escolha dois nós entre vertiportos, aeroportos ou polos urbanos.</p></div><div><span>DECISÃO</span><strong>REH ou corredor?</strong><p>Declare a estrutura, camada e interface com tráfego existente.</p></div><div><span>SAÍDA</span><strong>um desenho + três hipóteses</strong><p>Capacidade, separação e contingência precisam aparecer.</p></div></div>
        <p className="slide-question mt-8 !text-xl">Pergunta-guia: o que precisa ser verdade para esse corredor operar?</p>
      </Slide>

      <Slide kicker="Critério de revisão" title="Um bom esboço explicita decisões e incertezas" source="Checklist didático baseado no SIGMA-Sky Produto 2 e nos CONOPS usados na aula." notes="Tempo sugerido: 7 minutos. Use este slide durante a revisão dos grupos. Peça que marquem o que é dado conhecido, hipótese e questão em aberto.">
        <div className="review-checklist mt-8">{[['01', 'Traçado', 'onde passa e por quê?'], ['02', 'Interfaces', 'com quais REH, REA, CTR/ATZ ou aeroportos cruza?'], ['03', 'Acesso', 'quem pode entrar e com qual desempenho?'], ['04', 'Capacidade', 'qual recurso pode saturar?'], ['05', 'Contingência', 'o que acontece com bloqueio ou atraso?']].map(([n,t,c]) => <div key={n}><span>{n}</span><strong>{t}</strong><p>{c}</p></div>)}</div>
      </Slide>

      <Slide kicker="Debrief" title="Compare os desenhos pela pergunta que eles permitem responder" source="Discussão em sala: 7 minutos para apresentações rápidas e perguntas cruzadas." notes="Tempo sugerido: 7 minutos. Cada grupo tem um minuto para mostrar seu desenho e uma hipótese. A turma deve fazer uma pergunta sobre capacidade ou contingência.">
        <div className="debrief-grid mt-9"><div><span>SEGURANÇA</span><strong>quais conflitos aparecem?</strong><p>eVTOL × eVTOL, helicóptero e asa fixa VFR.</p></div><div><span>EFICIÊNCIA</span><strong>qual desvio foi criado?</strong><p>distância, espera, conexão e tempo de solo.</p></div><div><span>ESCALA</span><strong>o que muda com 12 nós?</strong><p>densidade, capacidade e necessidade de serviço.</p></div></div>
        <p className="slide-closing mt-9">O desenho é uma pergunta de pesquisa em forma espacial.</p>
      </Slide>

      <Slide kicker="Síntese" title="A migração para UAM é uma sequência de decisões verificáveis" source="Síntese: SIGMA-Sky Produtos 1 e 2; FAA UAM ConOps 2.0; DECEA PCA 351-7; NASA Provider Services for UAM." notes="Tempo sugerido: 3 minutos. Retome a sequência em voz alta: inventariar, modelar, escolher, coordenar e testar. Conecte o entregável da E06 às próximas aulas de vertiportos e superfícies de proteção.">
        <ol className="migration-line mt-10"><li><span>1</span><strong>Inventariar</strong><small>usuários e estruturas existentes</small></li><li><span>2</span><strong>Modelar</strong><small>nós, rotas, demanda e desempenho</small></li><li><span>3</span><strong>Integrar</strong><small>camadas, interfaces e serviços</small></li><li><span>4</span><strong>Testar</strong><small>nominal, capacidade e contingência</small></li></ol>
        <p className="slide-question mt-10 !text-2xl">O próximo voo só é possível quando a rede inteira consegue explicá-lo.</p>
      </Slide>

      <Slide kicker="Para consulta" title="Referências centrais da aula" notes="Deixe este slide disponível para consulta. Os PDFs públicos do FAA, NASA e DECEA estão na Biblioteca do portal. Os Produtos 1 e 2 do SIGMA-Sky foram usados como material de preparação fornecido pela equipe.">
        <div className="reference-list mt-7">{presentation.references.map((reference) => <div key={reference.url}><strong>{reference.shortTitle}</strong><p>{reference.citation}</p></div>)}</div>
        <p className="slide-closing mt-6">Entregável E06: esboço conceitual de corredores + diagrama simples de rede.</p>
      </Slide>
    </PresentationDeck>
  );
}
